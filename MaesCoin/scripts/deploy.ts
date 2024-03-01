import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Maes", ["0x68a76bc6499E4255EbAC719969068F3a84e4f268"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});