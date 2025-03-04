# Keyring.network smart contracts deployment actions

Contains the Github Actions to deploy the Core smart contract of Keyring.network, triggered through issue creations.

## 1. Quick actions

[![Create Deployment action](https://img.shields.io/badge/Trigger_Deployment_Action-0052CC?style=for-the-badge&logo=github)](https://github.com/keyring-smart-contracts-deployment/issues/new?template=deployment.yml)

## 2. Main principles

**TLDR**: The github action `deployment.yml` loads the configuration items (from json files) and the private key (from secrets), checkout the smart contracts and perform the deployment or upgrade.

**Note 1**: This repository only handles github actions, to call Foundry scripts for deployment, at a given tag. This repository is not about developing the deployment scripts, to prevent developers from wandering in this repo, which has access to sensitive informations.

**Note 2**: There is no need to checkout this repository. Everything is to be done through the Github UI:

- Trigger a deployment/upgrade: create a [new Deployment Issue](https://github.com/fdemiramon/contracts-deployment/issues/new?template=deployment.yml)
- Add/Amend a network: add/edit the configuration file within the Github UI
- ...

**Note 3**: The list of available networks in the [Deployment Issue](https://github.com/fdemiramon/contracts-deployment/issues/new?template=deployment.yml) is updated with the workflow `refresh.yml` everytime a configuration item is added/amended. If needed, this workflow can be ran manually

**Note 4**: Always do a simulation (see the checkbox in the [Deployment Issue](https://github.com/fdemiramon/contracts-deployment/issues/new?template=deployment.yml)) before a deployment/upgrade

**Note 5**: As of now, the private keys are stored in Github secrets. There is a dedicated step for that in the `deployment.yml` workflow called "Get the privateKey from the Github secrets". It is easy to replace it by a connection to a KMS.

## 3. Runbooks

**1/ How to deploy an upgrade**
// Florian todo

**2/ How to deploy to a new network**
// Florian todo

## 4. Decision Records

- **Github actions**: Currently, the deployement process is manual and lacks automation. Plus it obliges the person in charge of the deployment to handle the private keys and other sensitive secrets. Github actions can solve these two pains
- **Github UI only**: This repo should not be cloned, as it is intended to be used uniquely through the Github UI.
- **Repository separation**: this repository is separated from the codebase to:
  - Manage a limited list of users allowing to perform the actions, and CRUD the secrets.
  - Hide from the community the way the deployments are actually performed, assuming that the repo of the SC codebase is public
  - KISS, with a very limited number of files, not mixed with SC codebase
  - Separate the lifecycles of the repos: both repositories do not share the same lifecycles, as different former versions of the SC can be used (git tags) and bringing enhancements to this repo must be possible
- **Tag release approach**: Currently, each version of the smart contracts are kept at the HEAD of the branch. Instead, we can rely on git to get the former versions to prevent to keep at the HEAD billions of useless files. Moreover, tagged versions allow a clear understanding of which version of code has been deployed
- **One unique centralised json for all secrets**: to ease the manipulation, and let opportunities for having the secrets managed somewhere else. eg: KMS

## 5. Understand the configuration files and secrets management

The deployment and upgrade processes need configuration items. Some of them are not sensitive or not highly sensitive, hence are stored and versioned in the `/networks` folder. But the private key is highly sensitive and must never be versioned.
Hence, for each networkName (eg: `ETHEREUM_SEPOLIA`), we can find:

- in the `/networks` folder, a json (eg: `/networks/ETHEREUM_SEPOLIA.json`), containing the RPCUrl, the address of the proxy if already deployed, ...
- in the Github secrets, a secret storing the private key of the deployer/owner of the smart contracts (eg: `secrets.ETHEREUM_SEPOLIA_PRIVATE_KEY`)

## 6. Understand the json data structure

For a given network called `FOO_SEPOLIA`, a file called `FOO_SEPOLIA.json` must exist in the folder `/networks`.
In this file, the following properties must be set. Please refer to the deployment script in the smart contracts repository to understand each configuration item:

- `RPC_URL`
- `ETHERSCAN_API_KEY`
- `ETHERSCAN_BASE_API_URL`
- `SIGNATURE_CHECKER_NAME`
- `PROXY_ADDRESS`

Json boilerplate:

```json
{
    "RPC_URL": "",
    "ETHERSCAN_API_KEY": "",
    "ETHERSCAN_BASE_API_URL": "",
    "SIGNATURE_CHECKER_NAME": "AlwaysValidSignatureChecker",
    "PROXY_ADDRESS": "0x"
},
```

## 7. Enhancements discussions

- Move the secret json to a KMS
- Trigger an action from Linear
- Have the possibility to (re)-deploy all the networks
- Have a GH action to change all the owners on all the contracts
