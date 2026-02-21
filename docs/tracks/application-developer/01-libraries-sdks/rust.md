---
sidebar_position: 4
title: Rust
description: Building Bitcoin applications with Rust - BDK, LDK, and rust-bitcoin
---

# Rust

Rust is rapidly becoming the language of choice for new Bitcoin projects. Its memory safety guarantees, performance, and strong type system make it ideal for financial software where correctness is critical.

## rust-bitcoin

[rust-bitcoin](https://github.com/rust-bitcoin/rust-bitcoin) provides fundamental Bitcoin data structures and serialization. It's the foundation that BDK and other Rust libraries build on.

```bash
cargo add bitcoin
```

```rust
use bitcoin::{Address, Network, PublicKey, CompressedPublicKey};
use bitcoin::secp256k1::{Secp256k1, rand};

fn main() {
    let secp = Secp256k1::new();

    // Generate a random key pair
    let (secret_key, public_key) = secp.generate_keypair(&mut rand::thread_rng());

    // Create a SegWit address
    let compressed = CompressedPublicKey::from(public_key);
    let address = Address::p2wpkh(compressed, Network::Regtest);

    println!("Address: {}", address);
    println!("Secret key: {}", secret_key.display_secret());
}
```

## BDK (Bitcoin Dev Kit)

[BDK](https://bitcoindevkit.org/) is the recommended library for building wallets in Rust. It handles descriptors, coin selection, fee estimation, and PSBT construction.

```bash
cargo add bdk_wallet bdk_esplora bdk_file_store
```

```rust
use bdk_wallet::{Wallet, KeychainKind};
use bitcoin::Network;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a wallet with descriptor
    let descriptor = "wpkh(tprv8ZgxMBicQKsPd.../84'/1'/0'/0/*)";
    let change_descriptor = "wpkh(tprv8ZgxMBicQKsPd.../84'/1'/0'/1/*)";

    let mut wallet = Wallet::create(descriptor, change_descriptor)
        .network(Network::Regtest)
        .create_wallet_no_persist()?;

    // Get a new address
    let address = wallet.reveal_next_address(KeychainKind::External);
    println!("Address: {}", address.address);

    Ok(())
}
```

## LDK (Lightning Dev Kit)

[LDK](https://lightningdevkit.org/) lets you build custom Lightning implementations. Unlike running a full Lightning node (LND, CLN), LDK gives you components you can assemble as needed.

```bash
cargo add lightning lightning-invoice lightning-net-tokio
```

LDK's key components:

| Component | Purpose |
|-----------|---------|
| `ChannelManager` | Manage payment channels |
| `PeerManager` | Handle P2P connections |
| `Router` | Find payment routes |
| `KeysManager` | Key derivation and signing |
| `ChainMonitor` | Watch for on-chain channel events |

## rust-miniscript

[Miniscript](https://github.com/rust-bitcoin/rust-miniscript) is a structured representation of Bitcoin Script that enables composable spending policies:

```rust
use miniscript::policy::Concrete;
use miniscript::Descriptor;

// A 2-of-3 multisig policy
let policy_str = "thresh(2,pk(Alice),pk(Bob),pk(Carol))";
let policy = Concrete::<String>::from_str(policy_str)?;

// Compile to a descriptor
let descriptor = policy.compile::<miniscript::Segwitv0>()?;
println!("Descriptor: {}", descriptor);
```

## Ecosystem Overview

| Crate | Purpose |
|-------|---------|
| `bitcoin` | Core data structures, serialization |
| `bdk_wallet` | High-level wallet operations |
| `lightning` | Lightning Network protocol |
| `miniscript` | Composable spending policies |
| `secp256k1` | Elliptic curve operations |
| `bip39` | Mnemonic seed phrases |

## Recommended Reading

- [rust-bitcoin GitHub](https://github.com/rust-bitcoin/rust-bitcoin)
- [BDK Documentation](https://bitcoindevkit.org/)
- [LDK Documentation](https://lightningdevkit.org/)
- [Rust Bitcoin Tutorials](https://github.com/nicohman/rust-bitcoin-tutorial)
