---
sidebar_position: 3
title: Bitcoin Architecture
description: Understanding the UTXO model, transactions, and Bitcoin Script
---

# Bitcoin Architecture

This section covers Bitcoin's core data structures: how value is represented, how transactions work, and how Bitcoin's scripting language enables programmable money.

## The UTXO Model

Bitcoin doesn't use accounts and balances like a bank. Instead, it uses **UTXOs** (Unspent Transaction Outputs).

### How It Works

Think of UTXOs like physical coins and bills. When you "have" 1.5 BTC, you don't have an account with a 1.5 BTC balance — you have one or more UTXOs that add up to 1.5 BTC. For example:

- UTXO A: 1.0 BTC (from a payment you received)
- UTXO B: 0.5 BTC (change from a previous transaction)

When you spend Bitcoin, you **consume** entire UTXOs as inputs and create new UTXOs as outputs:

```
Inputs (consumed):          Outputs (created):
  UTXO A: 1.0 BTC    →       0.7 BTC to recipient
                              0.2999 BTC back to you (change)
                              0.0001 BTC fee (implicit)
```

The input UTXO is destroyed. Two new UTXOs are created: one for the recipient, one as change back to you. The difference between inputs and outputs is the **transaction fee** paid to miners.

### Why UTXOs Matter for Developers

- **Privacy** — Each UTXO is independent; no single "balance" is exposed
- **Parallelism** — UTXOs can be spent independently, enabling parallel validation
- **Coin selection** — Wallets must choose which UTXOs to spend (a non-trivial algorithm)
- **Dust** — Very small UTXOs cost more in fees to spend than they're worth

## Transactions

A Bitcoin transaction is a data structure with:

### Inputs

Each input references a previous transaction output (by txid and output index) and provides a **script** that satisfies the spending conditions:

```
{
  "txid": "abc123...",
  "vout": 0,
  "scriptSig": "<signature> <pubkey>"
}
```

### Outputs

Each output specifies an amount and a **locking script** (the conditions that must be met to spend it):

```
{
  "value": 0.5,
  "scriptPubKey": "OP_DUP OP_HASH160 <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG"
}
```

### Transaction Types

| Type | Description | Common Use |
|------|-------------|------------|
| **P2PKH** | Pay to Public Key Hash | Legacy addresses (1...) |
| **P2SH** | Pay to Script Hash | Multisig, wrapped SegWit (3...) |
| **P2WPKH** | Pay to Witness Public Key Hash | Native SegWit (bc1q...) |
| **P2WSH** | Pay to Witness Script Hash | SegWit multisig |
| **P2TR** | Pay to Taproot | Taproot addresses (bc1p...) |

### SegWit and Taproot

**Segregated Witness (SegWit)**, activated in 2017, moved signature data to a separate "witness" structure. This fixed transaction malleability and effectively increased block capacity.

**Taproot**, activated in 2021, introduced Schnorr signatures and MAST (Merkelized Alternative Script Trees). This improves privacy (complex scripts look like simple payments) and efficiency.

## Bitcoin Script

Bitcoin has its own scripting language — a simple, stack-based, intentionally non-Turing-complete language for defining spending conditions.

### How Script Works

When a transaction is validated, the **unlocking script** (scriptSig/witness) is combined with the **locking script** (scriptPubKey) and executed on a stack machine. If the execution succeeds (leaves `true` on the stack), the spend is valid.

### Common Opcodes

| Opcode | Description |
|--------|-------------|
| `OP_DUP` | Duplicate the top stack item |
| `OP_HASH160` | Hash the top item with SHA-256 then RIPEMD-160 |
| `OP_EQUALVERIFY` | Check equality, fail if not equal |
| `OP_CHECKSIG` | Verify a signature against a public key |
| `OP_CHECKMULTISIG` | Verify M-of-N multisig |
| `OP_CHECKLOCKTIMEVERIFY` | Time-lock: output can't be spent before a time/block |
| `OP_CHECKSEQUENCEVERIFY` | Relative time-lock |
| `OP_IF / OP_ELSE / OP_ENDIF` | Conditional execution |

### Example: P2PKH Script Execution

Locking script: `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`

Unlocking script: `<sig> <pubKey>`

```
Stack execution:
1. Push <sig>           → [sig]
2. Push <pubKey>        → [sig, pubKey]
3. OP_DUP               → [sig, pubKey, pubKey]
4. OP_HASH160            → [sig, pubKey, hash(pubKey)]
5. Push <pubKeyHash>    → [sig, pubKey, hash(pubKey), pubKeyHash]
6. OP_EQUALVERIFY        → [sig, pubKey]  (hashes match ✓)
7. OP_CHECKSIG           → [true]         (signature valid ✓)
```

## Recommended Reading

- [Learn Me a Bitcoin](https://learnmeabitcoin.com/) — Visual explanations of transactions and script
- [Bitcoin Script Wiki](https://en.bitcoin.it/wiki/Script) — Complete opcode reference
- [BIP-141 (SegWit)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) — Segregated Witness specification
- [BIP-341 (Taproot)](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) — Taproot specification
