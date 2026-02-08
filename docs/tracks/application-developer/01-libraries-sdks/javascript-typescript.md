---
sidebar_position: 2
title: JavaScript / TypeScript
description: Building Bitcoin applications with bitcoinjs-lib and BDK bindings for JavaScript
---

# JavaScript / TypeScript

JavaScript is the most popular language for Bitcoin application development, especially for web wallets, browser extensions, and Node.js backend services.

## bitcoinjs-lib

[bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) is the most established Bitcoin library for JavaScript. It handles transaction construction, signing, address generation, and script operations.

### Installation

```bash
npm install bitcoinjs-lib ecpair @bitcoinerlab/secp256k1
```

### Generate a SegWit Address

```javascript
const bitcoin = require('bitcoinjs-lib');
const ecpair = require('ecpair');
const ecc = require('@bitcoinerlab/secp256k1');

const ECPair = ecpair.ECPairFactory(ecc);

// Generate a random key pair
const keyPair = ECPair.makeRandom();

// Create a P2WPKH (native SegWit) address
const { address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: bitcoin.networks.testnet,
});

console.log('Address:', address);        // tb1q...
console.log('Private key (WIF):', keyPair.toWIF());
```

### Create and Sign a Transaction

```javascript
const bitcoin = require('bitcoinjs-lib');
const ecpair = require('ecpair');
const ecc = require('@bitcoinerlab/secp256k1');

const ECPair = ecpair.ECPairFactory(ecc);
const network = bitcoin.networks.regtest;

// Your key pair (from WIF or generated)
const keyPair = ECPair.fromWIF('your-private-key-wif', network);

const psbt = new bitcoin.Psbt({ network });

// Add input (reference a UTXO you own)
psbt.addInput({
  hash: 'previous-txid-hex',
  index: 0,
  witnessUtxo: {
    script: bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network,
    }).output,
    value: 100000, // satoshis
  },
});

// Add output (where to send)
psbt.addOutput({
  address: 'recipient-address',
  value: 90000, // satoshis (difference is fee)
});

// Sign and finalize
psbt.signInput(0, keyPair);
psbt.finalizeAllInputs();

// Get the raw transaction hex
const rawTx = psbt.extractTransaction().toHex();
console.log('Raw transaction:', rawTx);
```

### HD Wallet with BIP-32/39

```javascript
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('@bitcoinerlab/secp256k1');

const bip32 = BIP32Factory(ecc);

// Generate mnemonic
const mnemonic = bip39.generateMnemonic(256); // 24 words
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Derive keys (BIP-84 for native SegWit)
const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
const account = root.derivePath("m/84'/1'/0'");
const firstAddress = account.derive(0).derive(0);

const { address } = bitcoin.payments.p2wpkh({
  pubkey: firstAddress.publicKey,
  network: bitcoin.networks.testnet,
});

console.log('Mnemonic:', mnemonic);
console.log('First address:', address);
```

## BDK for JavaScript

[BDK](https://bitcoindevkit.org/) provides JavaScript/TypeScript bindings via WebAssembly:

```bash
npm install @bitcoindevkit/bdk-wasm
```

BDK handles coin selection, fee estimation, and PSBT construction automatically, making it ideal for production wallet development.

## Ecosystem Libraries

| Package | Purpose |
|---------|---------|
| `bitcoinjs-lib` | Core transaction/address operations |
| `ecpair` | Elliptic curve key pairs |
| `bip32` | HD key derivation (BIP-32) |
| `bip39` | Mnemonic seed phrases (BIP-39) |
| `bolt11` | Lightning invoice encoding/decoding |
| `@scure/btc-signer` | Modern, audited alternative to bitcoinjs-lib |

## Recommended Reading

- [bitcoinjs-lib GitHub](https://github.com/bitcoinjs/bitcoinjs-lib)
- [BDK Documentation](https://bitcoindevkit.org/)
- [Learning Bitcoin from the Command Line - JavaScript](https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line/blob/master/18_4_Accessing_Bitcoind_with_Node_JS.md)
