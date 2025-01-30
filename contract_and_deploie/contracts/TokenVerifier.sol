// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoyaltyPointsERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

//0x5c884875fad6a9e699d679e22d088c9cdd79260e

contract TokenVerifier is ERC1155Holder, Ownable {
    LoyaltyPointsERC1155 public loyaltyContract;

    string[] public tokenTypeList = ["Electronics", "Clothes"];


    constructor() Ownable(msg.sender) {}
    

    function useToken(address user, uint256 tokenId, uint256 amount, string memory requiredType) public {
        require (amount > 0, "Cannot use 0 or less tokens");
        if (verifyToken(user, tokenId, amount, requiredType)) {
            loyaltyContract.safeTransferFrom(user, address(this), tokenId, amount, "");
        }
    }

    function verifyToken(address user, uint256 tokenId, uint256 amount, string memory requiredType) public view returns (bool) {
        require(address(loyaltyContract) != address(0), "Loyalty contract not set");
        require(loyaltyContract.balanceOf(user, tokenId) >= amount, "User does not own enough tokens");
        require(keccak256(abi.encodePacked(loyaltyContract.getPurchaseTypeByTokenId(tokenId))) == keccak256(abi.encodePacked(requiredType)), "Invalid token type");

        return true;
    }

    function setLoyaltyContract(address _loyaltyContract) public onlyOwner {
        loyaltyContract = LoyaltyPointsERC1155(_loyaltyContract);
    }

    function getPurchaseType(uint256 tokenId) public view returns (string memory) {
        return loyaltyContract.getPurchaseTypeByTokenId(tokenId);
    }
}
