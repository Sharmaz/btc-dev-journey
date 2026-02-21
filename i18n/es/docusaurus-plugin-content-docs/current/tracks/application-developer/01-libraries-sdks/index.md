---
sidebar_position: 1
title: Librerías y SDKs
description: Panorama de librerías y SDKs de desarrollo Bitcoin en diferentes lenguajes de programación
---

# Librerías y SDKs

No necesitas implementar el protocolo Bitcoin desde cero. Existen librerías maduras para cada lenguaje de programación importante, que manejan generación de claves, construcción de transacciones, firmado y comunicación con la red.

## Eligiendo una Librería

| Lenguaje | Librería | Mejor Para |
|----------|----------|------------|
| JavaScript/TypeScript | bitcoinjs-lib, BDK-JS | Web wallets, extensiones de navegador, apps Node.js |
| Python | python-bitcoinlib, BDK-Python | Scripting, prototipado, servicios backend |
| Rust | BDK, LDK, rust-bitcoin | Wallets de alto rendimiento, Lightning, sistemas en producción |
| Go | btcd/btcutil, btcwallet | Infraestructura, servicios backend |

## El Ecosistema BDK

El [Bitcoin Dev Kit (BDK)](https://bitcoindevkit.org/) merece mención especial. Es una librería modular en Rust con bindings para múltiples lenguajes, diseñada para ser la forma "correcta" de construir wallets Bitcoin:

- **bdk_wallet** — Wallet de alto nivel con soporte de descriptores
- **bdk_esplora** — Datos de blockchain vía API Esplora
- **bdk_electrum** — Datos de blockchain vía servidores Electrum
- **bdk_file_store** — Almacenamiento persistente de wallet

BDK maneja las partes difíciles (selección de monedas, estimación de comisiones, construcción de PSBT) para que puedas enfocarte en la lógica de tu aplicación.

## El Ecosistema LDK

[Lightning Dev Kit (LDK)](https://lightningdevkit.org/) es una librería flexible para Lightning Network:

- Construye wallets y nodos Lightning personalizados
- Integra Lightning en aplicaciones existentes
- Disponible en Rust con bindings para otros lenguajes

## Guías por Lenguaje

- [JavaScript / TypeScript](/docs/tracks/application-developer/libraries-sdks/javascript-typescript) — bitcoinjs-lib, BDK-JS
- [Python](/docs/tracks/application-developer/libraries-sdks/python) — python-bitcoinlib, BDK-Python
- [Rust](/docs/tracks/application-developer/libraries-sdks/rust) — BDK, LDK, rust-bitcoin
- [Go](/docs/tracks/application-developer/libraries-sdks/go) — btcd, btcutil

## Patrones Comunes Entre Librerías

Sin importar el lenguaje, las librerías Bitcoin típicamente siguen patrones similares:

### 1. Generación de Claves

```
Generar entropía → Derivar mnemónico → Derivar clave maestra → Derivar claves hijas
```

### 2. Creación de Direcciones

```
Clave privada → Clave pública → Hash → Codificar (bech32/base58) → Dirección
```

### 3. Construcción de Transacciones

```
Seleccionar UTXOs → Construir inputs/outputs → Calcular comisión → Firmar → Transmitir
```

### 4. Flujo PSBT

[PSBT (BIP-174)](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki) es el formato estándar para transacciones parcialmente firmadas, habilitando firmado multi-parte:

```
Creator → Updater → Signer(s) → Combiner → Finalizer → Extractor
```

Esta es la forma moderna de manejar transacciones que requieren múltiples firmas o interacción con hardware wallets.
