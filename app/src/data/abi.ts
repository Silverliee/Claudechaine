export const abi = [
  {
    type: "function",
    name: "saveLoyaltyPoints",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "typeOfPurchase", type: "string" },
    ],
    outputs: [{ type: "event" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "nonpayable",
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "useToken",
    stateMutability: "nonpayable",
    inputs: [
      { name: "tokenId", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "requiredType", type: "string" },
    ],
  },
] as const;
