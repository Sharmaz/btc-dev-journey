---
sidebar_position: 4
title: Rust
description: Construyendo aplicaciones Bitcoin con Rust - BDK, LDK y rust-bitcoin
---

# Rust

Rust se está convirtiendo rápidamente en el lenguaje preferido para nuevos proyectos Bitcoin. Sus garantías de seguridad de memoria, rendimiento y sistema de tipos fuerte lo hacen ideal para software financiero donde la corrección es crítica.

## rust-bitcoin

[rust-bitcoin](https://github.com/rust-bitcoin/rust-bitcoin) proporciona estructuras de datos fundamentales de Bitcoin y serialización. Es la base sobre la que BDK y otras librerías Rust se construyen.

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

[BDK](https://bitcoindevkit.org/) es la librería recomendada para construir wallets en Rust. Maneja descriptores, selección de monedas, estimación de comisiones y construcción de PSBT.

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

[LDK](https://lightningdevkit.org/) te permite construir implementaciones Lightning personalizadas. A diferencia de ejecutar un nodo Lightning completo (LND, CLN), LDK te da componentes que puedes ensamblar según necesites.

```bash
cargo add lightning lightning-invoice lightning-net-tokio
```

Componentes clave de LDK:

| Componente | Propósito |
|-----------|-----------|
| `ChannelManager` | Gestionar canales de pago |
| `PeerManager` | Manejar conexiones P2P |
| `Router` | Encontrar rutas de pago |
| `KeysManager` | Derivación de claves y firmado |
| `ChainMonitor` | Vigilar eventos on-chain de canales |

## rust-miniscript

[Miniscript](https://github.com/rust-bitcoin/rust-miniscript) es una representación estructurada de Bitcoin Script que permite políticas de gasto componibles:

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

## Panorama del Ecosistema

| Crate | Propósito |
|-------|-----------|
| `bitcoin` | Estructuras de datos core, serialización |
| `bdk_wallet` | Operaciones de wallet de alto nivel |
| `lightning` | Protocolo Lightning Network |
| `miniscript` | Políticas de gasto componibles |
| `secp256k1` | Operaciones de curva elíptica |
| `bip39` | Frases semilla mnemónicas |

## Lectura Recomendada

- [rust-bitcoin GitHub](https://github.com/rust-bitcoin/rust-bitcoin)
- [BDK Documentation](https://bitcoindevkit.org/)
- [LDK Documentation](https://lightningdevkit.org/)
- [Rust Bitcoin Tutorials](https://github.com/nicohman/rust-bitcoin-tutorial)
