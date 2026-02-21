---
sidebar_position: 5
title: Specialization Areas
description: Deep-dive into Bitcoin Core subsystems - P2P, mempool, wallet, and mining
---

# Specialization Areas

Bitcoin Core is a large project. Most contributors eventually specialize in one or two subsystems. This section provides an overview of the main areas you can focus on.

## P2P Networking

The peer-to-peer layer handles all communication between nodes.

**What you'd work on:**
- Connection management and peer selection
- Message relay policies (transaction, block, address)
- Eclipse attack mitigations
- Network privacy (BIP-324 encrypted transport)
- Tor, I2P, and CNET support

**Key files:** `src/net.cpp`, `src/net_processing.cpp`, `src/addrman.cpp`

**Current topics:**
- Erlay (BIP-330) — Bandwidth-efficient transaction relay
- Package relay — Relay related transactions as packages
- Encrypted P2P (BIP-324) — Opportunistic encryption

## Mempool Policy

The mempool manages unconfirmed transactions and decides which to relay and mine.

**What you'd work on:**
- Fee estimation algorithms
- Transaction relay policy (standardness rules)
- Replace-By-Fee (RBF) logic
- Package acceptance and CPFP (Child-Pays-For-Parent)
- Mempool eviction policies

**Key files:** `src/txmempool.cpp`, `src/policy/`, `src/validation.cpp`

**Current topics:**
- Package relay and package RBF
- Cluster mempool — Restructuring for better fee-based ordering
- Ephemeral anchors — Zero-fee anchor outputs for Lightning

## Wallet

The wallet subsystem manages keys, constructs transactions, and tracks balances.

**What you'd work on:**
- Descriptor wallets (modern key management)
- Coin selection algorithms
- Transaction construction and signing
- PSBT (Partially Signed Bitcoin Transactions)
- Hardware wallet integration (HWI)

**Key files:** `src/wallet/`

**Current topics:**
- Miniscript integration — Composable spending policies
- Silent Payments (BIP-352) — Reusable stealth addresses
- Coin selection improvements

## Mining Interface

The mining subsystem constructs block templates and interfaces with mining software.

**What you'd work on:**
- Block template construction (`getblocktemplate`)
- Transaction selection for blocks
- Stratum V2 integration
- Mining pool interfaces

**Key files:** `src/node/miner.cpp`, `src/rpc/mining.cpp`

## Script & Consensus

The script interpreter and consensus engine are the most critical parts of Bitcoin.

**What you'd work on:**
- Script opcode implementation
- Signature verification (ECDSA, Schnorr)
- Taproot/Tapscript execution
- Potential future opcodes (OP_CTV, OP_CAT)

**Key files:** `src/script/`, `src/consensus/`

**Current topics:**
- OP_CHECKTEMPLATEVERIFY (BIP-119) — Covenant primitive
- OP_CAT — Concatenation opcode re-enablement
- Great Script Restoration — Re-enabling disabled opcodes

## How to Choose

| If you enjoy... | Consider... |
|----------------|-------------|
| Networking and distributed systems | P2P Networking |
| Algorithm design and optimization | Mempool Policy |
| User-facing features and UX | Wallet |
| Performance and low-level optimization | Mining Interface |
| Cryptography and formal reasoning | Script & Consensus |

Most contributors start by reviewing PRs in their area of interest before writing their own code. Review is the best way to learn a subsystem deeply.

## Recommended Reading

- [Bitcoin Core PR Review Club](https://bitcoincore.reviews/) — Weekly review of a PR
- [Bitcoin Optech](https://bitcoinops.org/) — Stay current on protocol development
- [Delving Bitcoin](https://delvingbitcoin.org/) — Technical discussion forum
