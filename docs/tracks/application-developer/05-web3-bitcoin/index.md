---
sidebar_position: 5
title: Web3 on Bitcoin
description: An overview of programmability attempts on Bitcoin — including protocols that are widely considered spam — covered for awareness, not endorsement.
---

# Web3 on Bitcoin

:::danger Not Recommended
Protocols like Ordinals, BRC-20, Runes, and Stamps embed arbitrary data in Bitcoin block space. This is widely considered **spam**: it bloats the blockchain, raises fees for everyone, and undermines Bitcoin's purpose as sound, censorship-resistant money. The Bitcoin standard is clear — Bitcoin is money, not a general-purpose data layer.

This page is included for **awareness only**. Understanding these protocols does not mean endorsing them.
:::

Bitcoin is designed as a monetary system — a decentralized, censorship-resistant form of sound money. Some developers have built programmability layers on top of Bitcoin, ranging from legitimate off-chain contract protocols (DLCs, RGB) that respect Bitcoin's design, to data-inscription schemes (Ordinals, BRC-20) that abuse block space and are opposed by a significant portion of the Bitcoin community.

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

## Ordinals, Inscriptions & BRC-20

:::warning Spam — Not Recommended
Ordinals, BRC-20, Runes, and Stamps exploit Bitcoin's witness data to embed arbitrary content (images, text, token data) on-chain. This drives up transaction fees, bloats the UTXO set, and crowds out legitimate financial transactions. They serve no monetary purpose and are broadly considered an attack on Bitcoin's block space.
:::

- **Ordinal theory** — Assigns serial numbers to individual satoshis to simulate NFT-like ownership
- **Inscriptions** — Embeds arbitrary data (images, text, code) into witness data
- **BRC-20** — A fungible token experiment built on inscriptions
- **Runes** — A newer token protocol also using Bitcoin block space for non-monetary data

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
