---
sidebar_position: 5
title: Web3 on Bitcoin
description: Exploring smart contract capabilities on Bitcoin - DLCs, Stacks, RGB, and more
---

# Web3 on Bitcoin

Bitcoin is often seen as "just money," but there's a growing ecosystem of smart contract and programmable functionality being built on top of it. Unlike Ethereum's approach, Bitcoin's smart contracts tend to emphasize security, minimalism, and off-chain computation.

## Discreet Log Contracts (DLCs)

DLCs enable conditional payments based on real-world events (oracle-based contracts) without revealing the contract details on-chain.

**How it works:**
1. Two parties lock funds in a 2-of-2 multisig
2. An oracle publishes a signed attestation of an outcome
3. The winning party uses the oracle's signature to claim funds
4. The oracle never learns about the contract's existence

**Use cases:** Betting, derivatives, insurance, prediction markets

**Libraries:**
- [rust-dlc](https://github.com/p2pderivatives/rust-dlc)
- [dlcdevkit](https://github.com/bennyhodl/dlcdevkit)

## Stacks

[Stacks](https://www.stacks.co/) is a Layer 1 blockchain anchored to Bitcoin. It uses "Proof of Transfer" (PoX) consensus, where Stacks miners spend BTC to mine STX blocks.

**Key features:**
- **Clarity** — A decidable smart contract language (non-Turing-complete by design)
- **sBTC** — Programmable, trust-minimized Bitcoin peg
- **Bitcoin finality** — Stacks transactions settle on Bitcoin

```clarity
;; Simple Clarity contract
(define-public (transfer (amount uint) (recipient principal))
  (stx-transfer? amount tx-sender recipient))
```

## RGB Protocol

[RGB](https://rgb.tech/) enables smart contracts and token issuance on Bitcoin using client-side validation:

- **Off-chain computation** — Contract state lives with the users, not on-chain
- **Bitcoin as settlement** — Only commitments are anchored on Bitcoin
- **Privacy** — Contract details are not visible on the blockchain
- **Assets** — Issue fungible tokens, NFTs, and more

## Ordinals & Inscriptions

Ordinals assign a serial number to individual satoshis, enabling NFT-like functionality:

- **Ordinal theory** — Tracks individual sats through transactions
- **Inscriptions** — Embed data (images, text) into witness data
- **BRC-20** — Fungible token standard using inscriptions

This is controversial in the Bitcoin community — some see it as innovation, others as blockchain bloat.

## Other Approaches

| Protocol | Approach | Status |
|----------|----------|--------|
| **Liquid** | Federated sidechain (Blockstream) | Production |
| **RSK** | Merge-mined sidechain with EVM | Production |
| **Ark** | Off-chain UTXO sharing protocol | Development |
| **BitVM** | Optimistic computation on Bitcoin | Research |

## Recommended Reading

- [DLC Specification](https://github.com/discreetlogcontracts/dlcspecs)
- [Stacks Documentation](https://docs.stacks.co/)
- [RGB Documentation](https://rgb.tech/)
- [BitVM Whitepaper](https://bitvm.org/bitvm.pdf)
