---
sidebar_position: 4
title: P2P Network
description: How Bitcoin's peer-to-peer network and node communication works
---

# P2P Network

Bitcoin operates as a peer-to-peer network where nodes communicate directly with each other — no central server, no hierarchy. Understanding this network layer is essential for any Bitcoin developer.

## Network Protocol

### How Nodes Find Each Other

When a Bitcoin node starts, it needs to discover other nodes to connect to:

1. **DNS Seeds** — Hardcoded DNS addresses that return IP addresses of known active nodes
2. **Seed Nodes** — Fallback hardcoded IP addresses if DNS seeds fail
3. **Addr Messages** — Once connected, nodes share addresses of other known nodes
4. **Manual Peers** — Operators can manually specify peers to connect to

### Message Types

Nodes communicate using a binary protocol over TCP (default port 8333 for mainnet). Key message types:

| Message | Purpose |
|---------|---------|
| `version` / `verack` | Handshake — exchange version info and capabilities |
| `inv` | Announce new transactions or blocks (inventory) |
| `getdata` | Request the full data for announced items |
| `tx` | Send a full transaction |
| `block` | Send a full block |
| `headers` | Send block headers (for SPV and initial sync) |
| `getblocks` / `getheaders` | Request block hashes or headers |
| `ping` / `pong` | Keep connection alive and measure latency |
| `addr` / `addrv2` | Share known node addresses |
| `feefilter` | Tell peers your minimum fee rate for relay |

### Transaction Propagation

When a user broadcasts a transaction:

1. The transaction is sent to connected peers
2. Each peer validates the transaction independently
3. Valid transactions are added to the **mempool** (memory pool of unconfirmed transactions)
4. Peers relay the transaction to their own peers
5. The transaction propagates across the entire network in seconds

### Block Propagation

When a miner finds a valid block:

1. The miner sends a **compact block** announcement to peers
2. Peers request any transactions they don't already have
3. Each node independently validates the block (all transactions, proof of work, consensus rules)
4. Valid blocks are added to the local blockchain
5. The block propagates to the full network

**Compact Blocks** (BIP-152) significantly reduced block propagation time by sending short transaction IDs instead of full transactions — nodes usually already have the transactions in their mempool.

## Types of Nodes

### Full Node

A **full node** downloads and validates every block and transaction since the genesis block. It enforces all consensus rules independently.

- **Stores:** The full blockchain (600+ GB as of 2025)
- **Validates:** Every transaction and block
- **Serves:** Blocks and transactions to other nodes
- **Trust model:** Trustless — verifies everything independently

Running a full node is the gold standard for Bitcoin security. It's the only way to be certain your transactions are valid without trusting anyone else.

### Pruned Node

A **pruned node** is a full node that validates everything but **discards old block data** to save disk space. It keeps only the UTXO set and recent blocks.

- **Stores:** Only recent blocks + UTXO set (configurable, minimum ~550 MB)
- **Validates:** Everything (same as full node)
- **Cannot serve:** Historical blocks to other nodes
- **Good for:** Developers and users with limited disk space

```bash
# bitcoin.conf for a pruned node
prune=1000  # Keep only ~1 GB of block data
```

### SPV Node (Simplified Payment Verification)

An **SPV node** only downloads block headers and verifies transactions using Merkle proofs. It relies on full nodes for transaction data.

- **Stores:** Only block headers (~60 MB)
- **Validates:** Block headers and Merkle proofs (not full transactions)
- **Trust model:** Assumes the longest chain with valid headers contains valid transactions
- **Used by:** Most mobile wallets

SPV nodes trade security for efficiency — they can't independently verify all consensus rules.

### Mining Node

A **mining node** is a full node that also participates in block creation:

- Selects transactions from the mempool
- Constructs candidate blocks
- Performs proof-of-work computation
- Broadcasts discovered blocks to the network

### Lightning Network Node

A **Lightning node** runs alongside a Bitcoin full node and manages payment channels:

- Opens and closes channels (on-chain transactions)
- Routes payments through the Lightning network
- Maintains channel state and balances

Popular implementations: LND, CLN (Core Lightning), Eclair, LDK.

## Network Parameters

| Parameter | Mainnet | Testnet | Regtest |
|-----------|---------|---------|---------|
| Default port | 8333 | 18333 | 18444 |
| Address prefix | 1, 3, bc1 | m, n, tb1 | bcrt1 |
| Magic bytes | 0xD9B4BEF9 | 0x0709110B | 0xDAB5BFFA |

## Recommended Reading

- [Bitcoin Developer Guide: P2P Network](https://developer.bitcoin.org/devguide/p2p_network.html)
- [BIP-152 (Compact Blocks)](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)
- [Bitcoin Protocol Documentation](https://en.bitcoin.it/wiki/Protocol_documentation)
