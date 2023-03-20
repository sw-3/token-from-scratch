async function main() {
  // fetch contract
  const Token = await ethers.getContractFactory("Token")

  // deploy contract
  const token = await Token.deploy()
  await token.deployed()
  console.log(`Token deployed to: ${token.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
