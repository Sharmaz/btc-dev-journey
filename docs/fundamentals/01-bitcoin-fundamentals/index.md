---
sidebar_position: 2
title: Bitcoin Fundamentals
description: History, philosophy, and core concepts of Bitcoin
---

# Bitcoin Fundamentals

Understanding Bitcoin means understanding the problems it solves, the principles behind its design, and the cryptographic building blocks that make it work.

## History and Philosophy

### The Problem

Before Bitcoin, digital money had a fundamental issue: the **double-spend problem**. Digital information can be copied freely, so how do you prevent someone from spending the same digital money twice? Previous attempts (DigiCash, e-gold, b-money, Bit Gold) all required a trusted third party to keep track of balances.

### The Breakthrough

In October 2008, Satoshi Nakamoto published the [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf): *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. The key innovation was combining several existing technologies into a system that solves double-spending without a trusted intermediary:

- **Proof of Work** — From Adam Back's Hashcash (1997)
- **Distributed timestamps** — From prior work on timestamping services
- **Merkle trees** — From Ralph Merkle's work (1979)
- **Public-key cryptography** — From Diffie-Hellman and subsequent work

The Bitcoin network launched on **January 3, 2009**, when Satoshi mined the genesis block.

### Core Principles

- **Decentralization** — No single entity controls the network
- **Permissionless** — Anyone can participate without approval
- **Censorship resistance** — No one can prevent valid transactions from being confirmed
- **Fixed supply** — 21 million BTC maximum, enforced by consensus rules
- **Pseudonymity** — Addresses are not tied to real-world identities by default
- **Verifiability** — Anyone can run a node and verify every transaction

## Basic Cryptography

### Hash Functions

Bitcoin uses cryptographic hash functions extensively. A hash function takes arbitrary input and produces a fixed-size output (the "hash" or "digest").

**SHA-256** (Secure Hash Algorithm, 256-bit) is Bitcoin's primary hash function:

```
Input: "Hello"
SHA-256: 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
```

Properties that make hash functions useful in Bitcoin:
- **Deterministic** — Same input always produces the same output
- **One-way** — You can't reverse a hash to find the input
- **Avalanche effect** — A tiny change in input completely changes the output
- **Collision resistant** — It's computationally infeasible to find two inputs with the same hash

Bitcoin also uses **RIPEMD-160** (combined with SHA-256 as HASH160) for generating shorter addresses.

### Elliptic Curve Cryptography

Bitcoin uses the **secp256k1** elliptic curve for key pairs and signatures:

1. **Private key** — A random 256-bit number (your secret)
2. **Public key** — Derived from the private key via elliptic curve multiplication (shareable)
3. **Address** — Derived from the public key via hashing (what you share with others)

The math ensures you can go from private key → public key → address, but **never in reverse**.

### Digital Signatures

When you send Bitcoin, you create a **digital signature** using your private key. This proves you own the funds without revealing your private key. Bitcoin originally used **ECDSA** (Elliptic Curve Digital Signature Algorithm) and now also supports **Schnorr signatures** (added in Taproot, 2021).

## Blockchain Concepts

### Blocks

A block is a data structure containing:
- **Block header** — Version, previous block hash, Merkle root, timestamp, difficulty target, nonce
- **Transactions** — The list of transactions included in this block

Blocks are chained together by including the hash of the previous block in each new block header — forming the **blockchain**.

### Proof of Work

Miners compete to find a nonce that, when combined with the block header, produces a hash below the current difficulty target. This process:
- Requires significant computational work to find a valid nonce
- Is trivial to verify (just hash the header and check)
- Adjusts difficulty every 2,016 blocks (~2 weeks) to maintain ~10 minute block intervals

### Consensus

Bitcoin's consensus rules define what makes a block and transaction valid. Every full node independently verifies every block and transaction against these rules. No block is accepted on trust — the motto is **"Don't trust, verify."**

## Recommended Reading

- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf) — The original 9-page paper by Satoshi Nakamoto
- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) by Andreas Antonopoulos — Comprehensive technical guide
- [The Bitcoin Standard](https://saifedean.com/thebitcoinstandard/) by Saifedean Ammous — Economic and historical context
- [Bitcoin Wiki](https://en.bitcoin.it/wiki/Main_Page) — Community-maintained technical reference
