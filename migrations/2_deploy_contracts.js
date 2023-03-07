var staking = artifacts.require("staking");

module.exports = function(deployer) {
  deployer.deploy(staking);
};