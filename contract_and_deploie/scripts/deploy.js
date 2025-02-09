async function main() {
	//InteractiveToken is the name of the contract in the solidity file
	const LoyaltyPointsERC1155 = await ethers.getContractFactory(
		"LoyaltyPointsERC1155"
	);
	const TransactionManager = await ethers.getContractFactory("TransactionManager");
	const TokenVerifier = await ethers.getContractFactory("TokenVerifier");

	//no argument in the contract constructor, so nothing to provide in deploy()
	const interactiveToken = await LoyaltyPointsERC1155.deploy();
	console.log(
		"Contract LoyaltyPointsERC1155 Deployed to Address:",
		interactiveToken.address
	);
	const transactionManager = await TransactionManager.deploy();
	console.log(
		"Contract TransactionManager Deployed to Address:",
		transactionManager.address
	);

	const tokenVerifier = await TokenVerifier.deploy();
	console.log(
		"Contract TokenVerifier Deployed to Address:",
		tokenVerifier.address
	);
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
