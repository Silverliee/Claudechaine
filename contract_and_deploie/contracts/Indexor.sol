// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Indexor is Ownable {
    event LoyaltyPointsSaved(
        address indexed user,
        uint256 amount,
        string purchaseType,
        uint256 timestamp
    );

    event TokenMinted(
        address indexed user,
        uint256 tokenId,
        uint256 amount,
        uint256 timestamp
    );

    event TokenUsed(
        address indexed user,
        uint256 tokenId,
        uint256 amount,
        uint256 timestamp
    );

    event UserRegistered(
        address indexed user,
        uint256 timestamp
    );

    mapping(address => bool) public registeredUsers;
    uint256 public totalUsers;
    uint256 public totalPoints;
    uint256 public totalTokens;

    constructor() Ownable(msg.sender) {}

    function registerUser() external {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        totalUsers++;
        emit UserRegistered(msg.sender, block.timestamp);
    }

    function recordLoyaltyPoints(uint256 amount, string memory purchaseType) external {
        require(registeredUsers[msg.sender], "User not registered");
        totalPoints += amount;
        emit LoyaltyPointsSaved(msg.sender, amount, purchaseType, block.timestamp);
    }

    function recordTokenMint(uint256 tokenId, uint256 amount) external {
        require(registeredUsers[msg.sender], "User not registered");
        totalTokens += amount;
        emit TokenMinted(msg.sender, tokenId, amount, block.timestamp);
    }

    function recordTokenUsage(uint256 tokenId, uint256 amount) external {
        require(registeredUsers[msg.sender], "User not registered");
        totalTokens -= amount;
        emit TokenUsed(msg.sender, tokenId, amount, block.timestamp);
    }

    function getTotalUsers() external view returns (uint256) {
        return totalUsers;
    }

    function getTotalPoints() external view returns (uint256) {
        return totalPoints;
    }

    function getTotalTokens() external view returns (uint256) {
        return totalTokens;
    }
}
