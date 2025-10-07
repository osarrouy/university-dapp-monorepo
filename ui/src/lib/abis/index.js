export const IERC20_ABI = [
	{
		type: "function",
		name: "allowance",
		inputs: [
			{ name: "owner", type: "address", internalType: "address" },
			{ name: "spender", type: "address", internalType: "address" },
		],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "approve",
		inputs: [
			{ name: "spender", type: "address", internalType: "address" },
			{ name: "amount", type: "uint256", internalType: "uint256" },
		],
		outputs: [{ name: "", type: "bool", internalType: "bool" }],
	},
	{
		type: "function",
		name: "balanceOf",
		inputs: [{ name: "account", type: "address", internalType: "address" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
];

export const BROKER_ABI = [
	{
		type: "function",
		name: "redeem",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
];
