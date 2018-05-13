var HDWalletProvider = require("truffle-hdwallet-provider");
var passphrase = "<secret passphrase of the deployment wallet>";

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 7545, //Remember to pick the one you're using (Ganache is 7454)
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(passphrase, "https://rinkeby.infura.io/x8SDVAzSoKmnTAA7Wwnt"),
      network_id: "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
