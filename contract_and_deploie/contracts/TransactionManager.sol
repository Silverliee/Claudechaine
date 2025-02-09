// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract TransactionManager {
    struct Transaction {
        uint256 timestamp;
        string transactionType;
        uint256 amount;
        string purchaseType;
    }

    mapping(address => Transaction[]) private transactionHistory;

    event TransactionSaved(
        address indexed user,
        string transactionType,
        uint256 amount,
        string purchaseType
    );

    function saveTransaction(
        address user,
        string memory transactionType,
        uint256 amount,
        string memory purchaseType
    ) internal {
        Transaction memory newTransaction = Transaction({
            timestamp: block.timestamp,
            transactionType: transactionType,
            amount: amount,
            purchaseType: purchaseType
        });

        transactionHistory[user].push(newTransaction);

        emit TransactionSaved(user, transactionType, amount, purchaseType);
    }

    function getTransactionHistory(address user) public view returns (Transaction[] memory) {
        return transactionHistory[user];
    }
}
