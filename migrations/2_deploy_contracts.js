var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TutorialToken = artifacts.require("./TutorialToken.sol");
var ComplexStorage = artifacts.require("./ComplexStorage.sol");
var PeonyCertificate = artifacts.require("./PeonyCertificate.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);  //Since we are not using those contracts remove from deploy script to avoid wasting ETHs on deploying those to test ent
  //deployer.deploy(TutorialToken);
  //deployer.deploy(ComplexStorage);
  deployer.deploy(PeonyCertificate);
};
