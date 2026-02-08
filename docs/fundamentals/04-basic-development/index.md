---
sidebar_position: 5
title: Basic Development
description: Getting hands-on with Bitcoin Core, networks, and wallet operations
---

# Basic Development

Time to get your hands dirty. This section covers the practical foundations every Bitcoin developer needs: running a node, understanding networks, and performing basic wallet operations.

## Bitcoin Node

### Installation

Refer to our environment setup guides for detailed installation instructions:

- [macOS Setup](/docs/environment-setup/macos)
- [Ubuntu Setup](/docs/environment-setup/ubuntu)

### bitcoin-cli Basics

`bitcoin-cli` is the command-line interface for interacting with your Bitcoin node:

```bash
# Check node status
bitcoin-cli getblockchaininfo

# Get network info
bitcoin-cli getnetworkinfo

# Get peer info
bitcoin-cli getpeerinfo

# Get mempool info
bitcoin-cli getmempoolinfo
```

### bitcoin.conf

The configuration file controls your node's behavior. Key options:

```ini
# Network (uncomment one)
#testnet=1
#regtest=1

# RPC settings
rpcuser=youruser
rpcpassword=yourpassword
server=1

# Performance
dbcache=450
maxmempool=300

# Pruning (save disk space)
#prune=1000
```

## Networks

Bitcoin has three networks, each serving a different purpose:

### Mainnet

The real Bitcoin network where transactions have actual monetary value.

- **Use for:** Production applications, real payments
- **Never use for:** Testing or experiments
- **Port:** 8333

### Testnet

A public test network with worthless test coins. Behaves like mainnet but with free coins from faucets.

- **Use for:** Integration testing, testing with other developers
- **Coins:** Free from faucets (no monetary value)
- **Port:** 18333
- **Current version:** Testnet4

```bash
# Start node on testnet
bitcoind -testnet
bitcoin-cli -testnet getblockchaininfo
```

### Regtest (Regression Testing)

A local, private network where you control everything. You can mine blocks instantly and create transactions at will.

- **Use for:** Local development, unit testing, rapid iteration
- **Coins:** Mine your own instantly
- **Port:** 18444

```bash
# Start regtest node
bitcoind -regtest

# Create a wallet
bitcoin-cli -regtest createwallet "dev"

# Generate an address
bitcoin-cli -regtest getnewaddress

# Mine 101 blocks (first 100 are immature, block 101 makes first coinbase spendable)
bitcoin-cli -regtest generatetoaddress 101 <your-address>

# Check balance
bitcoin-cli -regtest getbalance
```

**Regtest is your best friend as a developer.** Use it for all local experimentation.

## Basic Wallet Operations

### Creating and Managing Wallets

```bash
# Create a new wallet
bitcoin-cli -regtest createwallet "mywallet"

# List wallets
bitcoin-cli -regtest listwallets

# Get wallet info
bitcoin-cli -regtest getwalletinfo
```

### Addresses

```bash
# Generate a new receiving address
bitcoin-cli -regtest getnewaddress

# Generate a specific address type
bitcoin-cli -regtest getnewaddress "" "bech32"    # bc1q... (SegWit)
bitcoin-cli -regtest getnewaddress "" "bech32m"   # bc1p... (Taproot)
bitcoin-cli -regtest getnewaddress "" "legacy"    # 1...    (P2PKH)
```

### Sending Transactions

```bash
# Send to an address
bitcoin-cli -regtest sendtoaddress <address> 0.5

# Send with specific fee rate (sat/vB)
bitcoin-cli -regtest -named sendtoaddress address=<address> amount=0.5 fee_rate=10

# Get transaction details
bitcoin-cli -regtest gettransaction <txid>

# Decode a raw transaction
bitcoin-cli -regtest decoderawtransaction <hex>
```

### Exploring Transactions

```bash
# List recent transactions
bitcoin-cli -regtest listtransactions

# List unspent outputs (UTXOs)
bitcoin-cli -regtest listunspent

# Get raw transaction data
bitcoin-cli -regtest getrawtransaction <txid> true
```

## What's Next?

With these fundamentals under your belt, you're ready to choose a specialization track:

- [Protocol Developer](/docs/tracks/protocol-developer) — Dive into Bitcoin Core internals
- [Application Developer](/docs/tracks/application-developer) — Build wallets and apps
- **Infrastructure Developer** — Create explorers and APIs (coming soon)
- **Mining Developer** — Develop mining software (coming soon)

Check the [Types of Developers](/docs/roadmap/developer-types) page to help you decide.
