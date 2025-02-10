import { ethers } from 'ethers';
import { db } from '@/db/migrations/001_initial';
import { abi } from '@/data/abi';

export class IndexerService {
    private readonly provider: ethers.Provider;
    private contract: ethers.Contract;
    private isIndexing: boolean = false;
    private lastIndexedBlock: number = 0;
    private readonly DEPLOYMENT_BLOCK = 7679111;

    constructor() {
        const contractAddress ="0xF056cc05Ad6bacC750eF8ED6a788bB0A7a76Db8A";
        if (!contractAddress) {
            throw new Error('Contract address not found in environment variables');
        }
        try {
            this.provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/P4rx5WGs9PjyJUQJmpxB3HUBkKLSWCgw");
            console.log('Using WebSocket provider');

            this.contract = new ethers.Contract(contractAddress, abi, this.provider);
            console.log('Contract initialized successfully');
        } catch (error) {
            console.error('Error initializing contract:', error);
            throw error;
        }
    }

    async startIndexing() {
        if (this.isIndexing) return;
        this.isIndexing = true;

        try {
            // Récupérer le dernier bloc indexé
            this.lastIndexedBlock = await this.getLastIndexedBlock();
            const currentBlock = await this.provider.getBlockNumber();

            console.log(`Current block: ${currentBlock}, Last indexed block: ${this.lastIndexedBlock}`);

            // Indexer les blocs manqués
            if (this.lastIndexedBlock < currentBlock) {
                await this.indexMissedBlocks(this.lastIndexedBlock, currentBlock);
            }

            // Configurer l'écoute des événements en temps réel
            this.setupEventListeners();

            console.log("Indexer started successfully");
        } catch (error) {
            console.error("Error starting indexer:", error);
            this.isIndexing = false;
            throw error;
        }
    }

    private async getLastIndexedBlock(): Promise<number> {
        return new Promise((resolve) => {
            db.get(
                "SELECT MAX(block_number) as last_block FROM transactions",
                (err, row: any) => {
                    // Si pas de bloc indexé, commencer depuis le bloc de déploiement
                    if (err || !row?.last_block) {
                        resolve(this.DEPLOYMENT_BLOCK);
                    } else {
                        resolve(row.last_block);
                    }
                }
            );
        });
    }

    private async indexMissedBlocks(fromBlock: number, toBlock: number) {
        console.log(`Indexing missed blocks from ${fromBlock} to ${toBlock}`);

        // Augmenter la taille du lot pour accélérer l'indexation
        const batchSize = 5000;
        let processedEvents = 0;

        for (let i = fromBlock; i < toBlock; i += batchSize) {
            const endBlock = Math.min(i + batchSize, toBlock);

            try {
                const eventFilter = {
                    address: this.contract.getAddress(),
                    fromBlock: i,
                    toBlock: endBlock
                };

                const events = await this.provider.getLogs(eventFilter);
                processedEvents += events.length;

                // Afficher la progression
                const progress = ((endBlock - fromBlock) / (toBlock - fromBlock) * 100).toFixed(2);
                console.log(`Progress: ${progress}% - Found ${events.length} events (Total: ${processedEvents})`);

                await Promise.all(events.map(async (event) => {
                    try {
                        const parsedLog = this.contract.interface.parseLog({
                            topics: event.topics,
                            data: event.data
                        });

                        if (parsedLog) {
                            await this.handleEvent({
                                ...event,
                                args: parsedLog.args,
                                eventName: parsedLog.name
                            });
                        }
                    } catch (error) {
                        console.error('Error parsing event:', error);
                    }
                }));
            } catch (error) {
                console.error(`Error fetching events for blocks ${i} to ${endBlock}:`, error);
            }
        }
        console.log(`Indexing complete. Processed ${processedEvents} total events`);
    }

    private setupEventListeners() {
        // Écouter TransactionSaved
        this.contract.on("TransactionSaved", async (user, transactionType, amount, purchaseType, event) => {
            console.log('TransactionSaved event received:', { user, transactionType, amount, purchaseType });
            await this.handleEvent({ ...event, args: [user, transactionType, amount, purchaseType], eventName: "TransactionSaved" });
        });

        // Écouter LoyaltyPointsSaved
        this.contract.on("LoyaltyPointsSaved", async (user, amount, purchaseType, event) => {
            console.log('LoyaltyPointsSaved event received:', { user, amount, purchaseType });
            await this.handleEvent({ ...event, args: [user, amount, purchaseType], eventName: "LoyaltyPointsSaved" });
        });

        // Surveiller les nouveaux blocs
        this.provider.on("block", (blockNumber) => {
            this.lastIndexedBlock = blockNumber;
            console.log('New block:', blockNumber);
        });
    }


    private async handleEvent(event: any) {
        if (!event.args) return;

        const txHash = event.transactionHash;
        const blockNumber = event.blockNumber;
        const eventName = event.eventName;

        if (eventName === "TransactionSaved") {
            const [user, transactionType, amount, purchaseType] = event.args;
            await this.indexTransaction(
                txHash,
                blockNumber,
                user,
                transactionType,
                amount,
                purchaseType
            );
        } else if (eventName === "LoyaltyPointsSaved") {
            const [user, amount, purchaseType] = event.args;
            await this.indexTransaction(
                txHash,
                blockNumber,
                user,
                "EARN",
                amount,
                purchaseType
            );
        }
    }

    private async indexTransaction(
        txHash: string,
        blockNumber: number,
        userAddress: string,
        transactionType: string,
        amount: bigint,
        purchaseType: string
    ) {
        return new Promise((resolve, reject) => {
            const stmt = db.prepare(`
        INSERT INTO transactions (
          transaction_hash,
          block_number,
          user_address,
          transaction_type,
          amount,
          purchase_type
        ) VALUES (?, ?, ?, ?, ?, ?)
      `);

            stmt.run(
                txHash,
                blockNumber,
                userAddress,
                transactionType,
                amount.toString(),
                purchaseType,
                (err: { message: string | string[]; }) => {
                    if (err) {
                        if (!err.message.includes('UNIQUE constraint failed')) {
                            reject(err);
                        }
                    } else {
                        resolve(true);
                    }
                }
            );
            this.updateDailyStats(userAddress, transactionType, amount, purchaseType);
        });
    }

    private async updateDailyStats(
        userAddress: string,
        transactionType: string,
        amount: bigint,
        purchaseType: string
    ) {
        const today = new Date().toISOString().split('T')[0];

        db.run(`
      INSERT INTO stats_daily (date, purchase_type, total_earned, total_used, unique_users)
      VALUES (?, ?, ?, ?, 1)
      ON CONFLICT(date, purchase_type) DO UPDATE SET
        total_earned = total_earned + CASE WHEN ? = 'EARN' THEN ? ELSE 0 END,
        total_used = total_used + CASE WHEN ? = 'USE' THEN ? ELSE 0 END,
        unique_users = (
          SELECT COUNT(DISTINCT user_address)
          FROM transactions
          WHERE DATE(timestamp) = ?
          AND purchase_type = ?
        )
    `,
            [
                today,
                purchaseType,
                transactionType === 'EARN' ? amount.toString() : 0,
                transactionType === 'USE' ? amount.toString() : 0,
                transactionType,
                amount.toString(),
                transactionType,
                amount.toString(),
                today,
                purchaseType
            ]
        );
    }

    async stop() {
        this.isIndexing = false;
        await this.provider.removeAllListeners();
        if ('destroy' in this.provider) {
            await (this.provider as ethers.WebSocketProvider).destroy();
        }
    }
}