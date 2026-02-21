---
sidebar_position: 4
title: Tools
description: Essential tools for Bitcoin development, testing, and analysis
---

# Tools

A curated list of tools that Bitcoin developers use daily for development, testing, debugging, and analysis.

## Node & Network

| Tool | Description | Link |
|------|-------------|------|
| **Bitcoin Core** | Reference full node implementation | [github.com/bitcoin/bitcoin](https://github.com/bitcoin/bitcoin) |
| **btcd** | Alternative full node in Go | [github.com/btcsuite/btcd](https://github.com/btcsuite/btcd) |
| **Nigiri** | Docker-based Bitcoin/Lightning/Liquid dev environment | [github.com/vulpemventures/nigiri](https://github.com/vulpemventures/nigiri) |
| **Polar** | One-click Lightning Network dev environment | [lightningpolar.com](https://lightningpolar.com/) |
| **Bitcoin Signet** | Centralized test network (more reliable than testnet) | Built into Bitcoin Core |

## Block Explorers

| Tool | Description | Link |
|------|-------------|------|
| **Mempool.space** | Open-source explorer with mempool visualization | [mempool.space](https://mempool.space/) / [GitHub](https://github.com/mempool/mempool) |
| **Blockstream Explorer** | Clean explorer with Liquid support | [blockstream.info](https://blockstream.info/) |
| **OXT** | Privacy-focused chain analysis | [oxt.me](https://oxt.me/) |
| **Esplora** | Blockstream's open-source explorer backend | [github.com/Blockstream/esplora](https://github.com/Blockstream/esplora) |

## Libraries & SDKs

| Tool | Language | Focus | Link |
|------|----------|-------|------|
| **BDK** | Rust (+ bindings) | Wallet development | [bitcoindevkit.org](https://bitcoindevkit.org/) |
| **LDK** | Rust (+ bindings) | Lightning integration | [lightningdevkit.org](https://lightningdevkit.org/) |
| **bitcoinjs-lib** | JavaScript | Transaction construction | [github.com/bitcoinjs/bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) |
| **python-bitcoinlib** | Python | Protocol operations | [github.com/petertodd/python-bitcoinlib](https://github.com/petertodd/python-bitcoinlib) |
| **rust-bitcoin** | Rust | Core data structures | [github.com/rust-bitcoin/rust-bitcoin](https://github.com/rust-bitcoin/rust-bitcoin) |
| **rust-miniscript** | Rust | Spending policies | [github.com/rust-bitcoin/rust-miniscript](https://github.com/rust-bitcoin/rust-miniscript) |

## Wallet Tools

| Tool | Description | Link |
|------|-------------|------|
| **Sparrow Wallet** | Desktop wallet with advanced features (coin control, PSBT) | [sparrowwallet.com](https://sparrowwallet.com/) |
| **HWI** | Hardware Wallet Interface for Bitcoin Core | [github.com/bitcoin-core/HWI](https://github.com/bitcoin-core/HWI) |
| **Specter Desktop** | Multisig coordination with hardware wallets | [github.com/cryptoadvance/specter-desktop](https://github.com/cryptoadvance/specter-desktop) |

## Payment Processing

| Tool | Description | Link |
|------|-------------|------|
| **BTCPay Server** | Self-hosted payment processor | [btcpayserver.org](https://btcpayserver.org/) |
| **LNbits** | Lightning-based accounting and extensions | [lnbits.com](https://lnbits.com/) |
| **Boltz** | Non-custodial submarine swap service | [boltz.exchange](https://boltz.exchange/) |

## Testing & Debugging

| Tool | Description | Link |
|------|-------------|------|
| **Bitcoin Core test framework** | Python functional tests | Included in Bitcoin Core |
| **bitcoin-cli** | Command-line RPC interface | Included in Bitcoin Core |
| **Miniscript Playground** | Test Miniscript policies in browser | [bitcoin.sipa.be/miniscript](https://bitcoin.sipa.be/miniscript/) |
| **Script Debugger** | Step through Bitcoin Script execution | [siminchen.github.io/bitcoinIDE](https://siminchen.github.io/bitcoinIDE/build/editor.html) |
| **Brink Faucet** | Testnet/Signet faucet | [faucet.brink.dev](https://faucet.brink.dev/) |

## Analysis & Monitoring

| Tool | Description | Link |
|------|-------------|------|
| **Clark Moody Dashboard** | Real-time Bitcoin network stats | [bitcoin.clarkmoody.com](https://bitcoin.clarkmoody.com/dashboard/) |
| **Grafana + Prometheus** | Node monitoring dashboards | Various setups |
| **Fork Monitor** | Detects chain forks and stale blocks | [forkmonitor.info](https://forkmonitor.info/) |
| **Transactionfee.info** | Fee estimation and analysis | [transactionfee.info](https://transactionfee.info/) |

## Development Environment

### Quick Setup with Nigiri

```bash
# Install Nigiri (Docker required)
curl https://getnigiri.vulpemventures.com | bash

# Start a regtest environment (Bitcoin + Electrs + Esplora)
nigiri start

# Mine blocks
nigiri rpc generatetoaddress 1 $(nigiri rpc getnewaddress)

# Stop
nigiri stop
```

### Quick Setup with Polar

Download from [lightningpolar.com](https://lightningpolar.com/) and create a network with a few clicks — includes Bitcoin Core nodes, LND, CLN, and Eclair with a visual graph interface.
