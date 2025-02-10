import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  LoyaltyPointsSaved,
  OwnershipTransferred,
  TokenMinted,
  TokenUsed,
  UserRegistered
} from "../generated/Indexor/Indexor"

export function createLoyaltyPointsSavedEvent(
  user: Address,
  amount: BigInt,
  purchaseType: string,
  timestamp: BigInt
): LoyaltyPointsSaved {
  let loyaltyPointsSavedEvent = changetype<LoyaltyPointsSaved>(newMockEvent())

  loyaltyPointsSavedEvent.parameters = new Array()

  loyaltyPointsSavedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  loyaltyPointsSavedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  loyaltyPointsSavedEvent.parameters.push(
    new ethereum.EventParam(
      "purchaseType",
      ethereum.Value.fromString(purchaseType)
    )
  )
  loyaltyPointsSavedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return loyaltyPointsSavedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokenMintedEvent(
  user: Address,
  tokenId: BigInt,
  amount: BigInt,
  timestamp: BigInt
): TokenMinted {
  let tokenMintedEvent = changetype<TokenMinted>(newMockEvent())

  tokenMintedEvent.parameters = new Array()

  tokenMintedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokenMintedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return tokenMintedEvent
}

export function createTokenUsedEvent(
  user: Address,
  tokenId: BigInt,
  amount: BigInt,
  timestamp: BigInt
): TokenUsed {
  let tokenUsedEvent = changetype<TokenUsed>(newMockEvent())

  tokenUsedEvent.parameters = new Array()

  tokenUsedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  tokenUsedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenUsedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokenUsedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return tokenUsedEvent
}

export function createUserRegisteredEvent(
  user: Address,
  timestamp: BigInt
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return userRegisteredEvent
}
