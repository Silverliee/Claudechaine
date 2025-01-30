// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//0xacfa310ca524ca956921705b2e9d639b52f56661

contract LoyaltyPointsERC1155 is ERC1155, Ownable {
    using Strings for uint256;

    struct LoyaltyData {
        uint256 balance;
        string tokenType;
    }

    mapping(address => mapping(string => LoyaltyData)) public usersWallet;

    mapping(string => uint256) private tokenIdByPurchaseType;
    mapping(uint256 => string) private purchaseTypeByTokenId;


    uint256 nextTokenId = 4;

    /*
        Token JSON example:
        {
            "name": "Loyalty Token - Electronics",
            "description": "This token provides a discount on all electronics purchases.",
            "discount_amount_euros": 5,
            "purchase_category": "Electronics"
        }
    */

    constructor() ERC1155("https://raw.githubusercontent.com/BadPioche/BlockchainJsonProvider/main/{id}.json") Ownable(msg.sender) {
        tokenIdByPurchaseType["Electronics"] = 1;
        tokenIdByPurchaseType["Clothes"] = 2;
        tokenIdByPurchaseType["Hospitality"] = 3;

        purchaseTypeByTokenId[1] = "Electronics";
        purchaseTypeByTokenId[2] = "Clothes";
        purchaseTypeByTokenId[3] = "Hospitality";
    }

    function saveLoyaltyPoints(address user, uint256 amount, string memory typeOfPurchases) public onlyOwner {
        require (contains(typeOfPurchases), "This type of purchase is not allowed");
            LoyaltyData storage data = usersWallet[user][typeOfPurchases];
            data.balance += amount;
            data.tokenType = typeOfPurchases;

            if (data.balance >= 100) {
                uint256 numberOfToken = data.balance / 100;
                uint256 tokenId = tokenIdByPurchaseType[typeOfPurchases];

                if (tokenId > 0) {
                    _mint(user, tokenId, numberOfToken, "");
                    data.balance -= numberOfToken * 100;
                }
            }
        
    }

    function setTypeOfPurchases(string memory typeOfPurchases) public onlyOwner {
        require (!contains(typeOfPurchases), "This type of purchase already exists");

        tokenIdByPurchaseType[typeOfPurchases] = nextTokenId;
        purchaseTypeByTokenId[nextTokenId] = typeOfPurchases;

        nextTokenId++;
    }

    function contains(string memory typeOfPurchases) public view returns (bool){
        return tokenIdByPurchaseType[typeOfPurchases] != 0;
    }

    function getPurchaseTypeByTokenId(uint256 tokenId) public view returns (string memory) {
        require(bytes(purchaseTypeByTokenId[tokenId]).length > 0, "Token ID does not exist");
        return purchaseTypeByTokenId[tokenId];
    }
    
}