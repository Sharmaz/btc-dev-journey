---
sidebar_position: 3
title: Consensus Rules
description: Understanding Bitcoin's consensus rules, validation logic, and soft fork activation
---

# Consensus Rules

Consensus rules are the most critical part of Bitcoin. They define what makes a block and transaction valid. Every full node on the network independently enforces these rules — if a block violates any rule, it is rejected regardless of how much proof-of-work backs it.

## What Are Consensus Rules?

Consensus rules are the set of conditions that every block and transaction must satisfy to be considered valid. They include:

### Block-Level Rules

- Block size must not exceed the weight limit (4M weight units)
- Block header hash must be below the current difficulty target
- Timestamp must be greater than the median of the last 11 blocks
- First transaction must be a coinbase (and only the first)
- Coinbase reward must not exceed the block subsidy + fees
- Merkle root must match the transactions in the block

### Transaction-Level Rules

- Inputs must reference existing, unspent outputs (UTXOs)
- Input scripts must satisfy the corresponding output scripts
- Total input value must be >= total output value (difference is the fee)
- No double-spending within the same block
- Transaction must not be a duplicate of an existing unconfirmed transaction
- Signature operations must not exceed limits

### Script Validation

Script validation is where spending conditions are checked:

```
For each input:
  1. Retrieve the UTXO being spent
  2. Execute the unlocking script (scriptSig / witness)
  3. Execute the locking script (scriptPubKey)
  4. If execution succeeds → input is valid
  5. If execution fails → entire transaction is invalid
```

## Soft Forks

Soft forks tighten the consensus rules — blocks that were previously valid become invalid. Old nodes still accept the new blocks (they don't violate any old rules), so the network doesn't split.

### Notable Soft Forks

| Soft Fork | Year | BIP(s) | What Changed |
|-----------|------|--------|-------------|
| P2SH | 2012 | BIP-16 | Pay-to-Script-Hash support |
| CLTV | 2015 | BIP-65 | Absolute timelocks |
| CSV | 2016 | BIP-68, 112, 113 | Relative timelocks |
| SegWit | 2017 | BIP-141, 143, 144 | Witness data separation, malleability fix |
| Taproot | 2021 | BIP-340, 341, 342 | Schnorr signatures, MAST |

### Activation Mechanisms

How soft forks get activated on the network:

- **BIP-9 (Version Bits)** — Miners signal readiness; activates after threshold
- **BIP-8 (Mandatory Activation)** — Similar to BIP-9 but with forced activation option
- **Speedy Trial** — Used for Taproot; short signaling window, delayed activation
- **UASF (User Activated Soft Fork)** — Nodes enforce rules regardless of miner signaling

## Validation in Code

The key validation functions in Bitcoin Core:

```
CheckBlock()          → Basic block structure checks
ContextualCheckBlock() → Checks that depend on chain state
ConnectBlock()        → Full validation + UTXO set update
CheckTransaction()    → Individual transaction validation
```

The validation code lives primarily in `src/validation.cpp`, with consensus-specific checks in `src/consensus/`.

## Why Consensus Bugs Are Critical

A consensus bug can cause:

- **Chain split** — Nodes disagree on which chain is valid
- **Inflation** — More coins created than the 21M limit
- **Theft** — Funds spent without valid signatures
- **Network halt** — Nodes reject all new blocks

This is why consensus code changes require the most rigorous review process in all of open source software.

## Recommended Reading

- [Bitcoin's consensus rules (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Protocol_rules)
- [BIP-9: Version Bits](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [Chaincode Labs: Bitcoin Protocol Development Curriculum](https://chaincode.com/)
