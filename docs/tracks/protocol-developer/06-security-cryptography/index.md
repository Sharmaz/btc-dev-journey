---
sidebar_position: 6
title: Security & Cryptography
description: Threat models, cryptographic primitives, and security practices in Bitcoin development
---

# Security & Cryptography

Security isn't a feature in Bitcoin — it's the foundation. Protocol developers must think adversarially at every level, from cryptographic primitives to network-level attacks.

## Threat Model

Bitcoin's security model assumes:

- **Miners can be adversarial** — The system must remain secure even if a minority of miners are malicious
- **Network can be unreliable** — Nodes may lose connectivity, receive delayed messages, or be partitioned
- **Peers can lie** — Never trust data from a peer without independent verification
- **Hardware can fail** — Software must handle crashes and corruption gracefully

### Common Attack Vectors

| Attack | Description | Mitigation |
|--------|-------------|------------|
| **51% attack** | Majority hashpower rewrites history | Economic cost, social consensus |
| **Eclipse attack** | Isolate a node from the real network | Multiple peer connections, diverse sources |
| **Sybil attack** | Create many fake peers | Connection limits, address management |
| **Transaction malleability** | Modify txid without invalidating | SegWit (witness separation) |
| **Time-warp attack** | Manipulate timestamps to lower difficulty | Median-time-past rules |
| **Selfish mining** | Withhold blocks to gain advantage | Protocol improvements, monitoring |

## Cryptographic Primitives

### Hash Functions

| Function | Use in Bitcoin | Output Size |
|----------|---------------|-------------|
| SHA-256 | Block hashing, txid, proof-of-work | 256 bits |
| RIPEMD-160 | Address generation (HASH160 = SHA256 + RIPEMD160) | 160 bits |
| SHA-256d | Double SHA-256 for most internal hashing | 256 bits |
| SipHash | Mempool short txid, hash table protection | 64 bits |
| SHA-512 | HMAC for BIP-32 key derivation | 512 bits |

### Elliptic Curve Cryptography

Bitcoin uses the **secp256k1** curve:

- **Field**: 256-bit prime field
- **Key generation**: Private key (random 256-bit integer) → Public key (curve point multiplication)
- **Core property**: Easy to compute `pubkey = privkey * G`, computationally infeasible to reverse

### Signature Schemes

**ECDSA** (original):
- Used for legacy and SegWit v0 transactions
- Signatures are ~72 bytes (DER encoded)
- Not natively aggregatable

**Schnorr** (Taproot, BIP-340):
- Simpler mathematical structure
- Fixed 64-byte signatures
- Supports key aggregation (MuSig2) — multiple signers produce a single signature
- Batch verification is more efficient

### Tagged Hashes

Taproot introduced **tagged hashes** to prevent cross-protocol attacks:

```
tagged_hash(tag, msg) = SHA256(SHA256(tag) || SHA256(tag) || msg)
```

Each context uses a different tag (`TapLeaf`, `TapBranch`, `TapTweak`, etc.), ensuring a hash from one context can't be reinterpreted in another.

## Security Practices in Bitcoin Core

### Responsible Disclosure

Bitcoin Core has a [security policy](https://github.com/bitcoin/bitcoin/blob/master/SECURITY.md):

- Critical bugs are reported privately to security@bitcoincore.org
- Fixes are coordinated before public disclosure
- CVEs are assigned for tracked vulnerabilities

### Defensive Programming

- **No dynamic memory allocation in consensus code** where avoidable
- **Overflow checks** on all arithmetic operations
- **Constant-time operations** for cryptographic code (prevent timing attacks)
- **Minimal dependencies** — fewer external libraries = smaller attack surface
- **Deterministic builds** (Guix) — verify that binaries match source code

## Recommended Reading

- [Bitcoin Security Model (Lopp)](https://blog.lopp.net/bitcoin-security-model/)
- [Mastering Bitcoin, Ch. 4: Keys and Addresses](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04_keys.adoc)
- [BIP-340: Schnorr Signatures](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [Elliptic Curve Cryptography (Andrea Corbellini)](https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/)
