require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: {
    version: "0.8.20", // Update this to match the version in OpenZeppelin contracts
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
  },
};
