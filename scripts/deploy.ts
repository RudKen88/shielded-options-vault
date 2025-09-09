import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ShieldedOptionsVault...");

  // Get the contract factory
  const ShieldedOptionsVault = await ethers.getContractFactory("ShieldedOptionsVault");
  
  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  const vault = await ShieldedOptionsVault.deploy(verifierAddress);
  
  await vault.waitForDeployment();
  
  const contractAddress = await vault.getAddress();
  
  console.log("ShieldedOptionsVault deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    deployer: await vault.runner?.getAddress(),
    network: await vault.runner?.provider?.getNetwork(),
    timestamp: new Date().toISOString(),
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
