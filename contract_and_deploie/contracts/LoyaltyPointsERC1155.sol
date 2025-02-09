// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TransactionManager.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LoyaltyPointsERC1155 is ERC1155, Ownable, TransactionManager {
    using Strings for uint256;
    event LoyaltyPointsSaved(address indexed user, uint256 amount, string purchaseType);


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

    //Fires TransferSingle event (mint)
    //Fires LoyaltyPointsSaved event for the points added
    //function saveLoyaltyPoints(address user, uint256 amount, string memory typeOfPurchases) public onlyOwner {
    function saveLoyaltyPoints(address user, uint256 amount, string memory typeOfPurchases) public {
        require (contains(typeOfPurchases), "This type of purchase is not allowed");
        LoyaltyData storage data = usersWallet[user][typeOfPurchases];
        data.balance += amount;
        data.tokenType = typeOfPurchases;

        saveTransaction(user, "EARN", amount, typeOfPurchases);

        if (data.balance >= 100) {
            uint256 numberOfToken = data.balance / 100;
            uint256 tokenId = tokenIdByPurchaseType[typeOfPurchases];
            if (tokenId > 0) {
                _mint(user, tokenId, numberOfToken, "");
                data.balance -= numberOfToken * 100;
            }
        }
        emit LoyaltyPointsSaved(user, amount, typeOfPurchases);

    }

    //To add a Type of purchases and create a new kind of token linked to it
    //Reminder: The JSON file defining the URI of this new token needs to be provided in the URL (see ERC155 constructor parameter)
    function setTypeOfPurchases(string memory typeOfPurchases) public onlyOwner {
        require (!contains(typeOfPurchases), "This type of purchase already exists");

        tokenIdByPurchaseType[typeOfPurchases] = nextTokenId;
        purchaseTypeByTokenId[nextTokenId] = typeOfPurchases;

        nextTokenId++;
    }

    //Check if this type of purchase is suported
    function contains(string memory typeOfPurchases) public view returns (bool){
        return tokenIdByPurchaseType[typeOfPurchases] != 0;
    }

    //Identifying the type of purchase a token is specific too.
    function getPurchaseTypeByTokenId(uint256 tokenId) public view returns (string memory) {
        require(bytes(purchaseTypeByTokenId[tokenId]).length > 0, "Token ID does not exist");
        return purchaseTypeByTokenId[tokenId];
    }

    function getTokenIdByPurchaseType(string memory purchaseType) public view returns (uint256) {
        require(tokenIdByPurchaseType[purchaseType] != 0, "Purchase type does not exist");
        return tokenIdByPurchaseType[purchaseType];
    }

    //Fire TransferSingle event
    function transferToken(address from, uint256 tokenId, uint256 amount) public {
        string memory purchaseType = purchaseTypeByTokenId[tokenId];
        saveTransaction(from, "USE", amount, purchaseType);
        // require (isApprovedForAll(from,address(this)), "this address did not approve the contract to manage its tokens");
        _safeTransferFrom(from, msg.sender, tokenId, amount, "");
    }
    
}