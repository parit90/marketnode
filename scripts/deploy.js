const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("ERC20Token");
  const token = await Token.deploy("MyToken", "MTK", deployer.address);

  console.log("Token deployed to:", token.address);

  // Update .env file with the new contract address
  const envPath = path.resolve(__dirname, '../.env');
  let envFile = fs.readFileSync(envPath, 'utf8');
  envFile = envFile.replace(/^CONTRACT_ADDRESS=.*/m, `CONTRACT_ADDRESS=${token.address}`);
  fs.writeFileSync(envPath, envFile);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
