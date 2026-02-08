---
sidebar_position: 4
title: Smart Contracts
description: Smart contract capabilities on Bitcoin - Script, Miniscript, Tapscript, DLCs, and covenants
---

# Smart Contracts on Bitcoin

Bitcoin has always had smart contracts — they're just different from what you might expect. Bitcoin's approach prioritizes security, predictability, and minimalism over expressiveness. Every Bitcoin transaction is a smart contract.

For related topics, see [Web3 on Bitcoin](/docs/tracks/application-developer/web3-bitcoin) and [Advanced Protocols](/docs/tracks/application-developer/advanced-protocols).

## Bitcoin Script

Bitcoin's native scripting language is **stack-based and intentionally non-Turing-complete**. This is a feature, not a limitation:

- **Predictable execution** — No infinite loops, bounded resource usage
- **Simple verification** — Easy to reason about what a script does
- **Security** — Smaller attack surface than general-purpose VMs

### What You Can Do Today

| Capability | Mechanism | Example Use |
|-----------|-----------|-------------|
| **Multi-party signing** | OP_CHECKMULTISIG, MuSig2 | Shared wallets, escrow |
| **Time-locked payments** | OP_CLTV, OP_CSV | Inheritance, scheduled releases |
| **Hash-locked payments** | OP_HASH160 + OP_EQUAL | HTLCs (Lightning, atomic swaps) |
| **Conditional execution** | OP_IF / OP_ELSE | Multiple spending paths |
| **Signature verification** | OP_CHECKSIG, OP_CHECKSIGADD | Authorization |

## Miniscript

[Miniscript](https://bitcoin.sipa.be/miniscript/) is a structured subset of Bitcoin Script that enables **composable spending policies**:

```
Policy: thresh(2, pk(Alice), pk(Bob), pk(Carol))
Result: 2-of-3 multisig

Policy: or(pk(Alice), and(pk(Bob), after(144)))
Result: Alice can spend anytime, OR Bob can spend after 144 blocks
```

### Why Miniscript Matters

- **Composability** — Combine conditions with AND, OR, THRESHOLD
- **Analysis** — Automatically determine witness size, spending conditions
- **Compilation** — Policy → optimized Bitcoin Script automatically
- **Interoperability** — Wallets can understand arbitrary spending policies

Miniscript is integrated into Bitcoin Core's wallet and is the foundation of descriptor-based wallets.

## Taproot & Tapscript

Taproot (BIP-341/342) significantly expanded Bitcoin's smart contract capabilities:

### MAST (Merkelized Alternative Script Trees)

Multiple spending conditions organized in a Merkle tree. Only the used condition is revealed on-chain:

```
                    [Taproot Key]
                    /           \
            [Branch A]       [Branch B]
            /        \           |
    [2-of-3 multisig] [Timelock] [Emergency recovery]
```

- **Privacy** — Unused branches are never revealed
- **Efficiency** — Only the executed branch goes on-chain
- **Key path spending** — The most common case (simple key spend) looks like any other Taproot payment

### Tapscript

Tapscript is the script version used inside Taproot, with improvements:

- `OP_CHECKSIGADD` replaces `OP_CHECKMULTISIG` (more efficient)
- Signature validation uses Schnorr
- Future opcodes can be added via `OP_SUCCESSx`

## Discreet Log Contracts (DLCs)

DLCs enable oracle-based conditional payments without revealing the contract on-chain:

```
1. Alice and Bob agree on a contract (e.g., BTC price > $100k on date X)
2. They lock funds in a 2-of-2 multisig
3. Oracle publishes a signed attestation of the outcome
4. Winner uses the attestation to claim funds
```

The oracle never learns about the contract. Multiple oracles can be used for trust minimization.

**Libraries:** [rust-dlc](https://github.com/p2pderivatives/rust-dlc), [dlcdevkit](https://github.com/bennyhodl/dlcdevkit)

## Covenants (Proposed)

Covenants would restrict **how** a UTXO can be spent, not just **who** can spend it. They're the most active area of Bitcoin smart contract research.

### OP_CHECKTEMPLATEVERIFY (CTV) — BIP-119

Commits to the exact transaction that will spend an output:

**Use cases:**
- **Vaults** — Withdrawal delays with emergency clawback
- **Congestion control** — Batch payouts that expand later
- **Payment pools** — Shared UTXOs for multiple users

### OP_CAT

Re-enables the concatenation opcode (disabled by Satoshi in 2010). Combined with Schnorr signatures, enables surprisingly powerful contract logic:

- Vault constructions
- Arbitrary transaction introspection
- Merkle proof verification in script

### BitVM

An **optimistic computation** model for Bitcoin — arbitrary programs can be verified on Bitcoin without a soft fork:

- Prover commits to computation result
- Verifier can challenge via on-chain dispute
- Only incorrect results require on-chain resolution

Still in research/early development, but potentially transformative.

## The Bitcoin Smart Contract Philosophy

Bitcoin's approach is fundamentally different from Ethereum:

| Bitcoin | Ethereum |
|---------|----------|
| Verify, don't compute | Compute on-chain |
| Non-Turing-complete | Turing-complete |
| UTXO model | Account model |
| Off-chain execution preferred | On-chain execution standard |
| Minimal, secure | Expressive, larger attack surface |

The Bitcoin philosophy: **move complexity off-chain, use the blockchain only for settlement and dispute resolution.**

## Recommended Reading

- [Miniscript (Pieter Wuille)](https://bitcoin.sipa.be/miniscript/)
- [BIP-341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [BIP-119: OP_CTV](https://github.com/bitcoin/bips/blob/master/bip-0119.mediawiki)
- [BitVM Whitepaper](https://bitvm.org/bitvm.pdf)
- [DLC Specification](https://github.com/discreetlogcontracts/dlcspecs)
