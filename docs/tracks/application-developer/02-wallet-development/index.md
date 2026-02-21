---
sidebar_position: 2
title: Wallet Development
description: Building Bitcoin wallets - HD key derivation, coin selection, and key management
---

# Wallet Development

A Bitcoin wallet is much more than a balance display. It manages keys, constructs transactions, selects which UTXOs to spend, estimates fees, and keeps track of your transaction history. Building a secure wallet is one of the most important (and challenging) tasks in Bitcoin development.

## HD Wallets (Hierarchical Deterministic)

Modern wallets use a tree structure to derive all keys from a single seed:

### BIP-32: HD Key Derivation

A master seed generates a tree of key pairs:

```
Master Seed
  └── m (master key)
       ├── m/0  (child 0)
       │    ├── m/0/0
       │    └── m/0/1
       └── m/1  (child 1)
            ├── m/1/0
            └── m/1/1
```

**Hardened vs. normal derivation:**
- Normal (`m/0/1`): Child public keys can be derived from the parent public key
- Hardened (`m/0'/1'`): Requires the parent private key — more secure

### BIP-39: Mnemonic Seed Phrases

The 12 or 24-word phrases that back up a wallet:

```
abandon abandon abandon ... about  →  Entropy  →  Seed  →  Master Key
```

The mnemonic encodes entropy (128 or 256 bits) with a checksum. Combined with an optional passphrase, it produces the master seed.

### BIP-44/49/84/86: Derivation Paths

Standard paths define where keys live in the HD tree:

| BIP | Path | Address Type |
|-----|------|-------------|
| BIP-44 | `m/44'/0'/0'/0/i` | Legacy P2PKH (1...) |
| BIP-49 | `m/49'/0'/0'/0/i` | Wrapped SegWit P2SH-P2WPKH (3...) |
| BIP-84 | `m/84'/0'/0'/0/i` | Native SegWit P2WPKH (bc1q...) |
| BIP-86 | `m/86'/0'/0'/0/i` | Taproot P2TR (bc1p...) |

Path components: `purpose' / coin_type' / account' / change / address_index`

## Descriptors

Output descriptors are a modern way to describe what a wallet can spend:

```
# Native SegWit wallet
wpkh([fingerprint/84'/0'/0']xpub.../0/*)

# 2-of-3 multisig
wsh(sortedmulti(2, [fp1/48'/0'/0'/2']xpub1/0/*, [fp2/...]xpub2/0/*, [fp3/...]xpub3/0/*))

# Taproot
tr([fingerprint/86'/0'/0']xpub.../0/*)
```

Descriptors are the preferred approach for new wallet implementations. BDK is built entirely around descriptors.

## Coin Selection

When spending Bitcoin, the wallet must choose which UTXOs to use as inputs. This is non-trivial:

### Strategies

| Strategy | Description | Trade-off |
|----------|-------------|-----------|
| **Largest first** | Use biggest UTXOs first | Simple, but creates many small change outputs |
| **Smallest first** | Use smallest UTXOs first | Consolidates dust, but higher fees |
| **Branch and Bound** | Find exact match (no change) | Optimal when possible, computationally expensive |
| **Random** | Random selection with target | Good privacy, unpredictable |
| **Knapsack** | Approximate target with minimal waste | Bitcoin Core's historical approach |

### Considerations

- **Fee minimization** — Fewer inputs = lower fee
- **Privacy** — Avoid linking UTXOs from different sources
- **Change output** — Extra output costs ~34 bytes; avoid if possible
- **Dust avoidance** — Don't create change below dust threshold (~546 sats)

## PSBT (Partially Signed Bitcoin Transactions)

[BIP-174](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki) defines a standard format for unsigned/partially signed transactions. This enables:

- **Hardware wallet signing** — Create transaction on computer, sign on device
- **Multisig workflows** — Each signer adds their signature independently
- **CoinJoin** — Multiple parties contribute inputs and sign separately

```
Creator → Updater → Signer → Combiner → Finalizer → Extractor
```

## Security Considerations

- **Never store private keys in plaintext** — Encrypt at rest
- **Use hardware wallets for significant funds** — Keys never leave the device
- **Implement address verification** — Display addresses on hardware device
- **Test on regtest/testnet first** — Always test before mainnet
- **Backup the seed phrase securely** — Metal backup, multiple locations

## Recommended Reading

- [BIP-32: HD Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP-39: Mnemonic Code](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Output Descriptors (Bitcoin Core)](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [BIP-174: PSBT](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki)
- [Bitcoin Design Guide: Wallet](https://bitcoin.design/guide/designing-products/personal-finance/)
