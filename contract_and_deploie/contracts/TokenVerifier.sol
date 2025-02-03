// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoyaltyPointsERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract TokenVerifier is ERC1155Holder, Ownable {
    LoyaltyPointsERC1155 private loyaltyContract;

    string[] private tokenTypeList = ["Electronics", "Clothes"];


    constructor() Ownable(msg.sender) {}
    

    //Fire TransferSingle event
    function useToken(uint256 tokenId, uint256 amount, string memory requiredType) public {
        require (amount > 0, "Cannot use 0 or less tokens");
        require(verifyToken(msg.sender, tokenId, amount, requiredType), "Token verification failed");
        loyaltyContract.transferToken(msg.sender, tokenId, amount);
        
    }

    //Check token validity and the balance capacity for this specific token
    function verifyToken(address user, uint256 tokenId, uint256 amount, string memory requiredType) public view returns (bool) {
        require(address(loyaltyContract) != address(0), "Loyalty contract not set");
        require(loyaltyContract.balanceOf(user, tokenId) >= amount, "User does not own enough tokens");
        require(keccak256(abi.encodePacked(loyaltyContract.getPurchaseTypeByTokenId(tokenId))) == keccak256(abi.encodePacked(requiredType)), "Invalid token type");

        return true;
    }

    //To link the Loyalty contract
    function setLoyaltyContract(address _loyaltyContract) public onlyOwner {
        loyaltyContract = LoyaltyPointsERC1155(_loyaltyContract);
    }

    //To get the purchase type linked to a specific token
    function getPurchaseType(uint256 tokenId) public view returns (string memory) {
        return loyaltyContract.getPurchaseTypeByTokenId(tokenId);
    }
    

}
