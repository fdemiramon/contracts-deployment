# Keyring.network smart contracts deployment actions
Contains the Github Actions for deployment of the Core smart contract, to be triggered through issue creations.
This repository is a companion of the 

## Main principles and motivations (aka Decision Records)
* Github actions: Currently, the deployement process is manual and lacks automation. Plus it obliges the person in charge of the deployment to handle the private keys and other sensitive secrets. Github actions can solve these two pains
* Github UI only: This repo should not be cloned, as it is intended to be used uniquely through the Github UI.
* Repository separation: this repository is separated from the codebase to:
    - Manage a limited list of users allowing to perform the actions, and CRUD the secrets.
    - Hide from the community the way the deployments are actually performed, assuming that the repo of the SC codebase is public
    - KISS, with a very limited number of files, not mixed with SC codebase
    - Separate the lifecycles of the repos: both repositories do not share the same lifecycles, as different former versions of the SC can be used (git tags) and bringing enhancements to this repo must be possible
* Tag release approach: Currently, each version of the smart contracts are kept at the HEAD of the branch. Instead, we can rely on git to get the former versions to prevent to keep at the HEAD billions of useless files. Moreover, tagged versions allow a clear understanding of which version of code has been deployed
* One unique centralised json for all secrets, to ease the manipulation, and let opportunities for having the secrets managed somewhere else. eg: KMS

## Guidelines:
1/ How to perform an upgrade
2/ How to deploy to a new network
3/ Understand the secrets management and json data structure
4/ Enhancements discussions
	- Bring the deployment solidity file in this repo
	- Move the secret json to a KMS
	- Trigger an action from Linear
	- Have the possibility to (re)-deploy all the networks
	- Have a GH action to change all the owners on all the contracts
	- Alternative ways to manage 




## Deployment repo for Keyring.network smart contracts

### Template for the Github secret

```
{
  "ETHEREUM_SEPOLIA": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "AlwaysValidSignatureChecker"
  },
  "STAGING": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "UAT": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_MAINNET": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_ARBITRUM": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_BASE": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_OPTIMISM": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_AVALANCHE": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  },
  "PROD_ZKSYNC": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "EIP191SignatureChecker"
  },
  "PROD_POLYGON": {
    "RPC_URL": "",
    "PRIVATE_KEY": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "RSASignatureChecker"
  }
}
```




