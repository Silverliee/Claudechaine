import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LoyaltyPointsSaved } from "../generated/schema"
import { LoyaltyPointsSaved as LoyaltyPointsSavedEvent } from "../generated/Indexor/Indexor"
import { handleLoyaltyPointsSaved } from "../src/indexor"
import { createLoyaltyPointsSavedEvent } from "./indexor-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let purchaseType = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let newLoyaltyPointsSavedEvent = createLoyaltyPointsSavedEvent(
      user,
      amount,
      purchaseType,
      timestamp
    )
    handleLoyaltyPointsSaved(newLoyaltyPointsSavedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LoyaltyPointsSaved created and stored", () => {
    assert.entityCount("LoyaltyPointsSaved", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LoyaltyPointsSaved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LoyaltyPointsSaved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "LoyaltyPointsSaved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "purchaseType",
      "Example string value"
    )
    assert.fieldEquals(
      "LoyaltyPointsSaved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
