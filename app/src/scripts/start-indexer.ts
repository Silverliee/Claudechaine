import { createTables } from '@/db/migrations/001_initial';
import { IndexerService } from '@/services/indexer';

async function main() {
    createTables();

    const indexer = new IndexerService();
    await indexer.startIndexing();

    process.on('SIGINT', async () => {
        console.log('Stopping indexer...');
        await indexer.stop();
        process.exit(0);
    });
}

main().catch(console.error);