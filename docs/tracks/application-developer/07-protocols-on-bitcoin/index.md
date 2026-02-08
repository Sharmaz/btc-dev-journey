---
sidebar_position: 7
title: Protocols on Bitcoin
description: Lightning Network, sidechains, Nostr, and other protocols built on top of Bitcoin
---

# Protocols on Bitcoin

Bitcoin's base layer prioritizes security and decentralization. Higher layers and adjacent protocols add speed, programmability, and new capabilities while anchoring to Bitcoin's security.

## Lightning Network

The Lightning Network is Bitcoin's primary Layer 2 solution for instant, low-fee payments.

### How It Works

1. Two parties open a **payment channel** by locking BTC in a 2-of-2 multisig on-chain
2. They exchange signed transactions off-chain to update the channel balance
3. Payments are **routed** through a network of channels using HTLCs
4. Either party can close the channel at any time, settling the final balance on-chain

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Payment channel** | Two-party balance sheet secured by Bitcoin |
| **HTLC** | Hash Time-Locked Contract for routing payments |
| **Invoice** | BOLT-11 encoded payment request |
| **Routing** | Finding a path through the channel graph |
| **Capacity** | Maximum amount a channel can route |
| **Liquidity** | Available balance on each side of a channel |

### Implementations

| Implementation | Language | Focus |
|---------------|---------|-------|
| **LND** | Go | Most popular, feature-rich |
| **Core Lightning (CLN)** | C | Modular, plugin-based |
| **Eclair** | Scala | Mobile-friendly (Phoenix wallet) |
| **LDK** | Rust | Library for custom implementations |

### Building on Lightning

```bash
# Create an invoice (LND)
lncli addinvoice --amt 1000 --memo "Test payment"

# Pay an invoice
lncli payinvoice <bolt11_invoice>

# Check channel balances
lncli listchannels
```

For custom applications, use the gRPC/REST APIs or build with LDK.

## Sidechains

Sidechains are separate blockchains pegged to Bitcoin, enabling features Bitcoin doesn't natively support.

### Liquid Network

[Liquid](https://liquid.net/) is a federated sidechain by Blockstream:

- **Confidential Transactions** — Amounts and asset types are hidden
- **Issued Assets** — Create tokens on the Liquid chain
- **Faster blocks** — 1-minute block time
- **Federation** — Managed by a set of functionaries

### Fedimint

[Fedimint](https://fedimint.org/) is a federated custody protocol using Chaumian e-cash:

- **Community custody** — Trusted federation holds Bitcoin
- **Privacy** — E-cash tokens are unlinkable
- **Lightning integration** — Gateway for Lightning payments
- **Open source** — Build your own federation

## Nostr

[Nostr](https://nostr.com/) (Notes and Other Stuff Transmitted by Relays) is a decentralized social protocol that uses Bitcoin-style cryptography (secp256k1 keys):

- **Identity** — Your Nostr key pair is your identity
- **Zaps** — Lightning payments integrated into social interactions
- **Decentralized** — No central server, messages relay through multiple servers

### Nostr + Bitcoin Integration

```
NIP-57 (Zaps): Lightning payments via Nostr
NIP-47 (Nostr Wallet Connect): Control wallets via Nostr
```

## Comparison

| Protocol | Layer | Speed | Trust Model |
|----------|-------|-------|-------------|
| **Lightning** | L2 | Instant | Trustless (channel partners) |
| **Liquid** | Sidechain | ~1 min | Federated (functionaries) |
| **Fedimint** | Custodial L2 | Instant | Federated (guardians) |
| **Stacks** | L1 (anchored) | ~10 min | PoX consensus |
| **RGB** | Client-side | Varies | Trustless (client validation) |

## Recommended Reading

- [Mastering the Lightning Network](https://github.com/lnbook/lnbook) — Comprehensive LN guide
- [BOLT Specifications](https://github.com/lightning/bolts) — Lightning protocol specs
- [Liquid Developer Docs](https://docs.liquid.net/)
- [Fedimint GitHub](https://github.com/fedimint/fedimint)
- [Nostr Protocol](https://github.com/nostr-protocol/nostr)
