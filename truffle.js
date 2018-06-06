var HDWalletProvider = require("truffle-hdwallet-provider"); //Use for passphrases
var HDWalletProviderPrivateKey = require("truffle-hdwallet-provider-privkey"); //use for private key
var passphrase = "<passphrase>";
var privateKey = "<private key>";
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
