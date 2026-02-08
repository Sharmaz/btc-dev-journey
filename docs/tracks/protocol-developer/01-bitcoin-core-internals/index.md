---
sidebar_position: 1
title: Bitcoin Core Internals
description: Understanding the architecture and key modules of Bitcoin Core
---

# Bitcoin Core Internals

Bitcoin Core is the reference implementation of the Bitcoin protocol. Understanding its internals is the foundation of protocol development.

## Overview

Bitcoin Core is a C++ application that has evolved since Satoshi's original codebase. Over the years, it has been significantly refactored for modularity, security, and performance. The project maintains extremely high standards for code quality — changes are reviewed by multiple experienced developers before merging.

## Key Subsystems

| Subsystem | Responsibility | Key Files |
|-----------|---------------|-----------|
| **Validation** | Block and transaction validation | `src/validation.cpp` |
| **Net/Net Processing** | P2P networking and message handling | `src/net.cpp`, `src/net_processing.cpp` |
| **Wallet** | Key management, coin selection, signing | `src/wallet/` |
| **Mempool** | Unconfirmed transaction management | `src/txmempool.cpp` |
| **RPC/REST** | External API interfaces | `src/rpc/` |
| **Script** | Script interpreter and verification | `src/script/` |
| **Consensus** | Consensus-critical code | `src/consensus/` |
| **Index** | Optional indexes (txindex, blockfilter) | `src/index/` |

## How It All Fits Together

When a new block arrives:

1. **Net** receives the block from a peer
2. **Net Processing** deserializes and routes it
3. **Validation** checks proof-of-work, transactions, and consensus rules
4. **UTXO Set** (chainstate) is updated
5. **Mempool** removes confirmed transactions
6. **Wallet** scans for relevant transactions
7. **Indexes** are updated if enabled

## Getting Started

```bash
# Clone the repository
git clone https://github.com/bitcoin/bitcoin.git
cd bitcoin

# Read the build instructions
cat doc/build-unix.md  # or doc/build-osx.md

# Build
cmake -B build
cmake --build build

# Run tests
ctest --test-dir build
```

## Topics in This Section

- [Code Architecture](/docs/tracks/protocol-developer/bitcoin-core-internals/code-architecture) — Source tree layout, build system, module boundaries
- [Consensus](/docs/tracks/protocol-developer/bitcoin-core-internals/consensus) — Consensus rules, validation logic, soft fork activation
