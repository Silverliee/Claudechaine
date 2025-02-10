import { LoyaltyPointsSaved, TokenMinted, TokenUsed } from '../generated/Indexor/Indexor';
import { User, LoyaltyPointsSaved as LoyaltyPointsSavedEntity, TokenMinted as TokenMintedEntity, TokenUsed as TokenUsedEntity } from '../generated/schema';
import {BigInt} from "@graphprotocol/graph-ts";

export function handleLoyaltyPointsSaved(event: LoyaltyPointsSaved): void {
  let user = User.load(event.params.user.toHexString());
  if (!user) {
    user = new User(event.params.user.toHexString());
    user.totalPointsEarned = BigInt.fromI32(0);
    user.totalTokensMinted = BigInt.fromI32(0);
    user.totalTokensUsed = BigInt.fromI32(0);
  }
  user.totalPointsEarned = user.totalPointsEarned.plus(event.params.amount);
  user.save();

  let loyaltyPoints = new LoyaltyPointsSavedEntity(event.transaction.hash.toHexString());
  loyaltyPoints.user = user.id;
  loyaltyPoints.amount = event.params.amount;
  loyaltyPoints.purchaseType = event.params.purchaseType;
  loyaltyPoints.timestamp = event.params.timestamp;
  loyaltyPoints.blockNumber = event.block.number;
  loyaltyPoints.blockTimestamp = event.block.timestamp;
  loyaltyPoints.transactionHash = event.transaction.hash;
  loyaltyPoints.save();
}

export function handleTokenMinted(event: TokenMinted): void {
  let user = User.load(event.params.user.toHexString());
  if (!user) {
    user = new User(event.params.user.toHexString());
    user.totalPointsEarned = BigInt.fromI32(0);
    user.totalTokensMinted = BigInt.fromI32(0);
    user.totalTokensUsed = BigInt.fromI32(0);
  }
  user.totalTokensMinted = user.totalTokensMinted.plus(event.params.amount);
  user.save();

  let tokenMinted = new TokenMintedEntity(event.transaction.hash.toHexString());
  tokenMinted.user = user.id;
  tokenMinted.tokenId = event.params.tokenId;
  tokenMinted.amount = event.params.amount;
  tokenMinted.timestamp = event.params.timestamp;
  tokenMinted.blockNumber = event.block.number;
  tokenMinted.blockTimestamp = event.block.timestamp;
  tokenMinted.transactionHash = event.transaction.hash;
  tokenMinted.save();
}

export function handleTokenUsed(event: TokenUsed): void {
  let user = User.load(event.params.user.toHexString());
  if (!user) {
    user = new User(event.params.user.toHexString());
    user.totalPointsEarned = BigInt.fromI32(0);
    user.totalTokensMinted = BigInt.fromI32(0);
    user.totalTokensUsed = BigInt.fromI32(0);
  }
  user.totalTokensUsed = user.totalTokensUsed.plus(event.params.amount);
  user.save();

  let tokenUsed = new TokenUsedEntity(event.transaction.hash.toHexString());
  tokenUsed.user = user.id;
  tokenUsed.tokenId = event.params.tokenId;
  tokenUsed.amount = event.params.amount;
  tokenUsed.timestamp = event.params.timestamp;
  tokenUsed.blockNumber = event.block.number;
  tokenUsed.blockTimestamp = event.block.timestamp;
  tokenUsed.transactionHash = event.transaction.hash;
  tokenUsed.save();
}