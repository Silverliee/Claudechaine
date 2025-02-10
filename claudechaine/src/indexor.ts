import {
  LoyaltyPointsSaved as LoyaltyPointsSavedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokenMinted as TokenMintedEvent,
  TokenUsed as TokenUsedEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/Indexor/Indexor"
import {
  LoyaltyPointsSaved,
  OwnershipTransferred,
  TokenMinted,
  TokenUsed,
  UserRegistered
} from "../generated/schema"

export function handleLoyaltyPointsSaved(event: LoyaltyPointsSavedEvent): void {
  let entity = new LoyaltyPointsSaved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.purchaseType = event.params.purchaseType
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenMinted(event: TokenMintedEvent): void {
  let entity = new TokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.tokenId = event.params.tokenId
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenUsed(event: TokenUsedEvent): void {
  let entity = new TokenUsed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.tokenId = event.params.tokenId
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
