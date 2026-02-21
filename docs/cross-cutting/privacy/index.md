---
sidebar_position: 2
title: Privacy
description: Bitcoin privacy techniques - coin control, CoinJoin, Tor, and chain analysis countermeasures
---

# Privacy

Bitcoin is pseudonymous, not anonymous. Every transaction is publicly recorded on the blockchain. Without deliberate privacy practices, it's often possible to link transactions to real-world identities. Understanding privacy is essential for every Bitcoin developer.

## Why Privacy Matters

- **Fungibility** — If coins can be traced and "tainted," Bitcoin loses fungibility (all coins should be equal)
- **Personal safety** — Public balances can make users targets for theft
- **Business confidentiality** — Companies don't want competitors seeing their transactions
- **Financial freedom** — Surveillance-resistant money is a core Bitcoin value

## On-Chain Privacy Threats

### Common Heuristics Used in Chain Analysis

| Heuristic | How It Works | Countermeasure |
|-----------|-------------|----------------|
| **Address reuse** | Same address used multiple times links transactions | Generate a new address for every receive |
| **Common input ownership** | Inputs in the same transaction likely belong to the same wallet | CoinJoin, PayJoin |
| **Change detection** | Identify which output is change vs. payment | Avoid round amounts, use same address type |
| **Timing analysis** | Transaction timing correlates with user activity | Delayed broadcasting |
| **Amount correlation** | Match input/output amounts across transactions | Break amounts with CoinJoin |
| **Dust attacks** | Small UTXOs sent to track spending | Coin control, ignore dust |

## Privacy Techniques

### Coin Control

Coin control lets users choose which UTXOs to spend in a transaction, preventing unwanted linkage:

```bash
# List UTXOs with labels
bitcoin-cli listunspent

# Send using specific UTXOs
bitcoin-cli -named send outputs='{"bc1q...": 0.5}' \
  options='{"inputs": [{"txid": "abc...", "vout": 0}]}'
```

Every wallet that handles privacy should implement coin control. Users need to decide which coins to combine in a transaction.

### CoinJoin

CoinJoin combines multiple users' transactions into one, breaking the link between inputs and outputs:

```
Traditional transaction:
  Alice (1 BTC) → Bob (0.8 BTC) + Alice change (0.2 BTC)

CoinJoin:
  Alice (1 BTC)  ┐     ┌ ? (0.5 BTC)
  Bob (0.5 BTC)  ├─tx─→├ ? (0.5 BTC)
  Carol (0.5 BTC)┘     ├ ? (0.5 BTC)
                        └ ? (0.5 BTC)
```

With equal-sized outputs, an observer can't determine which input funded which output.

**Implementations:**
- [Joinmarket](https://github.com/JoinMarket-Org/joinmarket-clientserver) — Maker/taker model, decentralized
- [Wasabi Wallet](https://wasabiwallet.io/) — Integrated CoinJoin with WabiSabi protocol

### PayJoin (BIP-78)

PayJoin involves the receiver contributing an input to the transaction, breaking the common-input-ownership heuristic:

```
Normal payment:
  Sender input → Receiver output + Sender change

PayJoin:
  Sender input + Receiver input → Receiver output + Sender change
```

To an observer, it looks like all inputs belong to the sender — which they don't. This improves privacy for both parties.

### Network-Level Privacy

#### Tor

Running Bitcoin Core over Tor hides your IP address from peers:

```ini
# bitcoin.conf
proxy=127.0.0.1:9050
listen=1
onlynet=onion
```

#### Dandelion++ (BIP-156)

Dandelion++ changes how transactions propagate to prevent linking a transaction to the originating IP:

1. **Stem phase** — Transaction is relayed through a random path of nodes (one at a time)
2. **Fluff phase** — Transaction is broadcast normally to the full network

This makes it difficult for spy nodes to determine which node originated a transaction.

### Silent Payments (BIP-352)

Silent Payments allow receiving to a static public identifier without address reuse:

- Receiver publishes a **silent payment address** (static, reusable)
- Sender derives a unique on-chain address using ECDH
- Each payment goes to a different address on-chain
- No interaction between sender and receiver required

This solves the address reuse problem without requiring a server or interaction.

## Privacy for Developers

When building Bitcoin applications:

- **Default to privacy** — Generate new addresses by default, never reuse
- **Implement coin control** — Let users choose which UTXOs to spend
- **Avoid unnecessary data collection** — Don't log IP addresses with transactions
- **Use your own node** — Don't leak user addresses to third-party APIs
- **Support Tor** — Allow users to connect via Tor
- **Label UTXOs** — Help users understand the provenance of their coins
- **Consider PayJoin** — Implement BIP-78 for receiving payments

## Recommended Reading

- [Bitcoin Privacy Wiki](https://en.bitcoin.it/wiki/Privacy)
- [BIP-78: PayJoin](https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki)
- [BIP-352: Silent Payments](https://github.com/bitcoin/bips/blob/master/bip-0352.mediawiki)
- [Bitcoin Design Guide: Privacy](https://bitcoin.design/guide/how-it-works/privacy/)
- [OXT Research](https://oxt.me/) — Chain analysis and privacy research
