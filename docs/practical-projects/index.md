---
sidebar_position: 1
title: Practical Projects
description: Hands-on Bitcoin development projects organized by difficulty level
---

# Practical Projects

The best way to learn is by building. These projects are organized by difficulty level, each designed to reinforce specific concepts from the roadmap.

**All projects should be built and tested on regtest.** Never use mainnet for development experiments.

---

## Beginner

### 1. Address Generator

**Build a tool that generates Bitcoin addresses of different types.**

- **Skills practiced:** Key generation, hashing, address encoding
- **Suggested stack:** Python + python-bitcoinlib, or JavaScript + bitcoinjs-lib
- **Related sections:** [Prerequisites](/docs/fundamentals/prerequisites), [Bitcoin Fundamentals](/docs/fundamentals/bitcoin-fundamentals)

**Steps:**
1. Generate a random private key
2. Derive the public key (secp256k1)
3. Generate a Legacy address (P2PKH — `1...`)
4. Generate a SegWit address (P2WPKH — `bc1q...`)
5. Generate a Taproot address (P2TR — `bc1p...`)
6. Display the private key in WIF format
7. Verify the addresses using `bitcoin-cli validateaddress`

---

### 2. Transaction Parser

**Build a tool that decodes and displays raw Bitcoin transactions.**

- **Skills practiced:** Transaction structure, serialization, Script opcodes
- **Suggested stack:** Python or Rust
- **Related sections:** [Bitcoin Architecture](/docs/fundamentals/bitcoin-architecture)

**Steps:**
1. Accept a raw transaction hex as input
2. Parse the version, inputs, outputs, and locktime
3. For each input: display txid, vout, scriptSig
4. For each output: display value, scriptPubKey, address type
5. Calculate and display the txid (double SHA-256 of serialized tx)
6. Handle both legacy and SegWit transaction formats
7. Test with transactions from `bitcoin-cli getrawtransaction`

---

### 3. CLI Wallet

**Build a simple command-line wallet that manages keys and sends transactions.**

- **Skills practiced:** HD key derivation, wallet management, RPC interaction
- **Suggested stack:** JavaScript + bitcoinjs-lib + bip32/bip39, or Rust + BDK
- **Related sections:** [Wallet Development](/docs/tracks/application-developer/wallet-development), [Basic Development](/docs/fundamentals/basic-development)

**Steps:**
1. Generate a mnemonic seed phrase (BIP-39)
2. Derive HD keys using BIP-84 path (`m/84'/1'/0'/0/i` for testnet)
3. Generate receiving addresses
4. Display balance by querying the node
5. Build and sign a transaction to send funds
6. Broadcast the transaction
7. Save/load wallet state to a file (encrypted)

---

## Intermediate

### 4. Block Explorer

**Build a web-based block explorer for your local regtest network.**

- **Skills practiced:** RPC integration, data modeling, web development
- **Suggested stack:** Node.js + Express + any frontend, or Python + Flask
- **Related sections:** [Libraries & SDKs](/docs/tracks/application-developer/libraries-sdks)

**Steps:**
1. Connect to Bitcoin Core via RPC
2. Display the latest blocks with hash, height, timestamp, tx count
3. Click a block to see its transactions
4. Click a transaction to see inputs, outputs, and amounts
5. Search by block hash, txid, or address
6. Display mempool stats (unconfirmed transactions, total fees)
7. Add auto-refresh or WebSocket updates

---

### 5. Payment Processor

**Build a simple payment processing system that generates invoices and tracks payments.**

- **Skills practiced:** Address generation, payment detection, webhook patterns
- **Suggested stack:** Node.js or Python + Bitcoin Core RPC
- **Related sections:** [Payment Processing](/docs/tracks/application-developer/payment-processing)

**Steps:**
1. Generate a unique address per invoice (HD derivation)
2. Create an invoice endpoint: `POST /invoice` → returns address + amount
3. Monitor the blockchain for incoming payments
4. Track confirmation count for each payment
5. Mark invoices as paid after N confirmations
6. Add a webhook callback when payment is confirmed
7. Build a simple dashboard showing invoice status

---

### 6. Mempool Monitor

**Build a tool that monitors the mempool and provides fee estimation.**

- **Skills practiced:** Mempool analysis, fee estimation, data visualization
- **Suggested stack:** Python or JavaScript + Bitcoin Core RPC
- **Related sections:** [P2P Network](/docs/fundamentals/p2p-network), [Bitcoin Architecture](/docs/fundamentals/bitcoin-architecture)

**Steps:**
1. Poll `getmempoolinfo` and `getrawmempool` periodically
2. Group transactions by fee rate (sat/vB)
3. Display a fee rate distribution histogram
4. Track mempool size over time
5. Estimate confirmation time for different fee rates
6. Alert when mempool exceeds a threshold
7. Visualize with a web dashboard or terminal chart

---

## Advanced

### 7. Multisig Wallet

**Build a 2-of-3 multisig wallet with PSBT signing workflow.**

- **Skills practiced:** Multisig, PSBT, descriptor wallets, collaborative signing
- **Suggested stack:** Rust + BDK, or JavaScript + bitcoinjs-lib
- **Related sections:** [Advanced Protocols](/docs/tracks/application-developer/advanced-protocols), [Wallet Development](/docs/tracks/application-developer/wallet-development)

**Steps:**
1. Generate 3 independent key pairs (simulating 3 signers)
2. Create a 2-of-3 multisig descriptor (`wsh(sortedmulti(2,...))`)
3. Derive receiving addresses from the descriptor
4. Receive funds to a multisig address
5. Create an unsigned PSBT for a spending transaction
6. Sign with key 1 → partially signed PSBT
7. Sign with key 2 → fully signed PSBT
8. Finalize and broadcast

---

### 8. Lightning Payment Gateway

**Build a payment gateway that accepts Lightning payments.**

- **Skills practiced:** Lightning integration, invoice management, webhook systems
- **Suggested stack:** Node.js + LND gRPC, or Rust + LDK
- **Related sections:** [Payment Processing](/docs/tracks/application-developer/payment-processing), [Protocols on Bitcoin](/docs/tracks/application-developer/protocols-on-bitcoin)

**Steps:**
1. Connect to an LND node via gRPC (or build with LDK)
2. Create BOLT-11 invoices with amount and description
3. Monitor for invoice settlement (streaming RPC or polling)
4. Generate a QR code for the invoice
5. Build a REST API: create invoice, check status, list payments
6. Add webhook notifications on payment settlement
7. Display a simple checkout page

---

### 9. Custom Indexer

**Build a blockchain indexer that tracks address balances and transaction history.**

- **Skills practiced:** Blockchain parsing, database design, UTXO tracking
- **Suggested stack:** Rust or Go + PostgreSQL/SQLite
- **Related sections:** [Bitcoin Architecture](/docs/fundamentals/bitcoin-architecture), [P2P Network](/docs/fundamentals/p2p-network)

**Steps:**
1. Connect to Bitcoin Core and subscribe to new blocks
2. Parse each block's transactions
3. Extract inputs and outputs with addresses
4. Maintain a UTXO set in a database
5. Track address balances (sum of unspent outputs)
6. Build an API: get balance, get transaction history, get UTXOs
7. Handle reorgs (rollback when a block is disconnected)
8. Index from genesis or from a specific height

---

## Tips for All Projects

- **Start on regtest** — Instant blocks, free coins, full control
- **Use `bitcoin-cli` first** — Understand the RPC calls before coding
- **Read the source** — When stuck, look at how existing tools solve the problem
- **Keep it simple** — Get the basic flow working before adding features
- **Share your work** — Open-source your projects, get feedback from the community
