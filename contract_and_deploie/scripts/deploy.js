async function main() {
	//InteractiveToken is the name of the contract in the solidity file
	const LoyaltyPointsERC1155 = await ethers.getContractFactory(
		"LoyaltyPointsERC1155"
	);
	const TokenVerifier = await ethers.getContractFactory("TokenVerifier");

	//no argument in the contract constructor, so nothing to provide in deploy()
	const interactiveToken = await LoyaltyPointsERC1155.deploy();
	console.log(
		"Contract LoyaltyPointsERC1155 Deployed to Address:",
		interactiveToken.address
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
