---
sidebar_position: 1
title: Libraries & SDKs
description: Overview of Bitcoin development libraries and SDKs across programming languages
---

# Libraries & SDKs

You don't need to implement the Bitcoin protocol from scratch. Mature libraries exist for every major programming language, handling key generation, transaction construction, signing, and network communication.

## Choosing a Library

| Language | Library | Best For |
|----------|---------|----------|
| JavaScript/TypeScript | bitcoinjs-lib, BDK-JS | Web wallets, browser extensions, Node.js apps |
| Python | python-bitcoinlib, BDK-Python | Scripting, prototyping, backend services |
| Rust | BDK, LDK, rust-bitcoin | High-performance wallets, Lightning, production systems |
| Go | btcd/btcutil, btcwallet | Infrastructure, backend services |

## The BDK Ecosystem

The [Bitcoin Dev Kit (BDK)](https://bitcoindevkit.org/) deserves special mention. It's a modular Rust library with bindings for multiple languages, designed to be the "right way" to build Bitcoin wallets:

- **bdk_wallet** — High-level wallet with descriptor support
- **bdk_esplora** — Blockchain data via Esplora API
- **bdk_electrum** — Blockchain data via Electrum servers
- **bdk_file_store** — Persistent wallet storage

BDK handles the hard parts (coin selection, fee estimation, PSBT construction) so you can focus on your application logic.

## The LDK Ecosystem

[Lightning Dev Kit (LDK)](https://lightningdevkit.org/) is a flexible Lightning Network library:

- Build custom Lightning wallets and nodes
- Integrate Lightning into existing applications
- Available in Rust with bindings for other languages

## Language-Specific Guides

- [JavaScript / TypeScript](/docs/tracks/application-developer/libraries-sdks/javascript-typescript) — bitcoinjs-lib, BDK-JS
- [Python](/docs/tracks/application-developer/libraries-sdks/python) — python-bitcoinlib, BDK-Python
- [Rust](/docs/tracks/application-developer/libraries-sdks/rust) — BDK, LDK, rust-bitcoin
- [Go](/docs/tracks/application-developer/libraries-sdks/go) — btcd, btcutil

## Common Patterns Across Libraries

Regardless of language, Bitcoin libraries typically follow similar patterns:

### 1. Key Generation

```
Generate entropy → Derive mnemonic → Derive master key → Derive child keys
```

### 2. Address Creation

```
Private key → Public key → Hash → Encode (bech32/base58) → Address
```

### 3. Transaction Construction

```
Select UTXOs → Build inputs/outputs → Calculate fee → Sign → Broadcast
```

### 4. PSBT Workflow

[PSBT (BIP-174)](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki) is the standard format for partially signed transactions, enabling multi-party signing:

```
Creator → Updater → Signer(s) → Combiner → Finalizer → Extractor
```

This is the modern way to handle transactions that require multiple signatures or hardware wallet interaction.
