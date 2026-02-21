---
sidebar_position: 1
title: Security
description: Security practices for Bitcoin development - key management, threat modeling, and secure coding
---

# Security

Security in Bitcoin development is non-negotiable. You're building software that handles real money — a single vulnerability can mean irreversible loss of funds. This section covers security principles that apply across all specialization tracks.

For cryptographic primitives specific to Bitcoin Core, see [Security & Cryptography](/docs/tracks/protocol-developer/security-cryptography).

## Key Management

The most critical security challenge in any Bitcoin application.

### Principles

- **Never store private keys in plaintext** — Encrypt at rest using strong encryption (AES-256-GCM)
- **Minimize key exposure** — Keys should only be decrypted in memory, for the shortest time possible
- **Use hardware security modules (HSMs)** or hardware wallets for signing when possible
- **Implement key rotation** — Have a plan for rotating compromised keys
- **Separate hot and cold keys** — Only keep the minimum necessary funds in hot wallets

### Backup Strategies

| Strategy | Pros | Cons |
|----------|------|------|
| **Mnemonic seed (BIP-39)** | Human-readable, portable | Single point of failure if not split |
| **Shamir's Secret Sharing** | Threshold recovery (e.g., 3-of-5) | More complex setup |
| **Metal backup** | Fire/water resistant | Physical security required |
| **Multi-location** | Resilient to local disaster | Coordination overhead |

### Common Mistakes

- Logging private keys or mnemonics
- Storing keys in environment variables or config files in version control
- Using weak randomness for key generation
- Not encrypting wallet files on disk
- Reusing keys across different applications

## Threat Modeling

Before writing code, understand what you're defending against.

### STRIDE Model Applied to Bitcoin

| Threat | Bitcoin Example | Mitigation |
|--------|----------------|------------|
| **Spoofing** | Fake node serving false data | Verify against full node |
| **Tampering** | Modified transaction before broadcast | Sign transactions client-side |
| **Repudiation** | Denying a payment was made | Blockchain is the proof |
| **Information Disclosure** | Address reuse reveals balance | New address per transaction |
| **Denial of Service** | Node overwhelmed with requests | Rate limiting, connection limits |
| **Elevation of Privilege** | RPC access without authentication | Strong RPC credentials, firewall |

### Application-Specific Threats

- **Address substitution** — Malware replaces displayed addresses (verify on hardware device)
- **Fee sniping** — Attacker re-mines blocks to steal transactions (use `nLockTime`)
- **Dust attacks** — Small UTXOs sent to track spending patterns (coin control)
- **Supply chain attacks** — Compromised dependencies (verify signatures, minimize deps)

## Secure Coding Practices

### Input Validation

```
✓ Validate all addresses before sending (checksum, network)
✓ Validate transaction amounts (positive, within range)
✓ Validate fee rates (sane bounds, not absurdly high)
✓ Sanitize all user input before RPC calls
✗ Never construct RPC commands via string concatenation
```

### Dependency Management

- Pin dependency versions
- Verify package integrity (checksums, signatures)
- Audit dependencies for known vulnerabilities
- Prefer well-audited Bitcoin-specific libraries over general-purpose crypto
- Minimize total dependency count

### Testing for Security

- **Fuzz test** parsing and deserialization code
- **Test with invalid inputs** — Malformed transactions, addresses, scripts
- **Test fee edge cases** — Zero fee, maximum fee, dust amounts
- **Test concurrent access** — Race conditions in wallet operations
- **Review error handling** — Ensure failures don't leak sensitive data

## Operational Security

### Node Security

- Run your own full node (don't trust third-party nodes for validation)
- Keep Bitcoin Core updated to latest stable release
- Firewall RPC port (8332/18332/18443) — never expose to the internet
- Use strong, unique RPC credentials
- Enable Tor for network privacy

### Production Deployment

- Separate signing from broadcasting (air-gapped signing)
- Implement rate limits on withdrawal APIs
- Use multi-signature for organizational funds
- Monitor for unusual transaction patterns
- Have an incident response plan for key compromise

## Recommended Reading

- [Bitcoin Security Model (Lopp)](https://blog.lopp.net/bitcoin-security-model/)
- [Cryptocurrency Security Standard (CCSS)](https://cryptoconsortium.org/certification/ccss/)
- [Bitcoin Design Guide: Security](https://bitcoin.design/guide/how-it-works/private-key-management/)
- [OWASP for Bitcoin](https://owasp.org/) — Apply web security principles to Bitcoin apps
