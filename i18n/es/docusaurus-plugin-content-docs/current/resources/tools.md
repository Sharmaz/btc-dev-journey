---
sidebar_position: 4
title: Herramientas
description: Herramientas esenciales para desarrollo, testing y análisis de Bitcoin
---

# Herramientas

Una lista curada de herramientas que los desarrolladores Bitcoin usan diariamente para desarrollo, testing, debugging y análisis.

## Nodo y Red

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **Bitcoin Core** | Implementación de referencia de nodo completo | [github.com/bitcoin/bitcoin](https://github.com/bitcoin/bitcoin) |
| **btcd** | Nodo completo alternativo en Go | [github.com/btcsuite/btcd](https://github.com/btcsuite/btcd) |
| **Nigiri** | Entorno de desarrollo Bitcoin/Lightning/Liquid basado en Docker | [github.com/vulpemventures/nigiri](https://github.com/vulpemventures/nigiri) |
| **Polar** | Entorno de desarrollo Lightning Network con un clic | [lightningpolar.com](https://lightningpolar.com/) |
| **Bitcoin Signet** | Red de prueba centralizada (más confiable que testnet) | Integrado en Bitcoin Core |

## Exploradores de Bloques

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **Mempool.space** | Explorador open-source con visualización de mempool | [mempool.space](https://mempool.space/) / [GitHub](https://github.com/mempool/mempool) |
| **Blockstream Explorer** | Explorador limpio con soporte Liquid | [blockstream.info](https://blockstream.info/) |
| **OXT** | Análisis de cadena enfocado en privacidad | [oxt.me](https://oxt.me/) |
| **Esplora** | Backend de explorador open-source de Blockstream | [github.com/Blockstream/esplora](https://github.com/Blockstream/esplora) |

## Librerías y SDKs

| Herramienta | Lenguaje | Enfoque | Link |
|-------------|----------|---------|------|
| **BDK** | Rust (+ bindings) | Desarrollo de wallets | [bitcoindevkit.org](https://bitcoindevkit.org/) |
| **LDK** | Rust (+ bindings) | Integración Lightning | [lightningdevkit.org](https://lightningdevkit.org/) |
| **bitcoinjs-lib** | JavaScript | Construcción de transacciones | [github.com/bitcoinjs/bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) |
| **python-bitcoinlib** | Python | Operaciones de protocolo | [github.com/petertodd/python-bitcoinlib](https://github.com/petertodd/python-bitcoinlib) |
| **rust-bitcoin** | Rust | Estructuras de datos core | [github.com/rust-bitcoin/rust-bitcoin](https://github.com/rust-bitcoin/rust-bitcoin) |
| **rust-miniscript** | Rust | Políticas de gasto | [github.com/rust-bitcoin/rust-miniscript](https://github.com/rust-bitcoin/rust-miniscript) |

## Herramientas de Wallet

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **Sparrow Wallet** | Wallet de escritorio con funciones avanzadas (coin control, PSBT) | [sparrowwallet.com](https://sparrowwallet.com/) |
| **HWI** | Hardware Wallet Interface para Bitcoin Core | [github.com/bitcoin-core/HWI](https://github.com/bitcoin-core/HWI) |
| **Specter Desktop** | Coordinación multisig con hardware wallets | [github.com/cryptoadvance/specter-desktop](https://github.com/cryptoadvance/specter-desktop) |

## Procesamiento de Pagos

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **BTCPay Server** | Procesador de pagos auto-hospedado | [btcpayserver.org](https://btcpayserver.org/) |
| **LNbits** | Contabilidad y extensiones basadas en Lightning | [lnbits.com](https://lnbits.com/) |
| **Boltz** | Servicio de submarine swap no custodial | [boltz.exchange](https://boltz.exchange/) |

## Testing y Debugging

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **Bitcoin Core test framework** | Tests funcionales en Python | Incluido en Bitcoin Core |
| **bitcoin-cli** | Interfaz RPC de línea de comandos | Incluido en Bitcoin Core |
| **Miniscript Playground** | Prueba políticas Miniscript en el navegador | [bitcoin.sipa.be/miniscript](https://bitcoin.sipa.be/miniscript/) |
| **Script Debugger** | Ejecuta paso a paso Bitcoin Script | [siminchen.github.io/bitcoinIDE](https://siminchen.github.io/bitcoinIDE/build/editor.html) |
| **Brink Faucet** | Faucet de Testnet/Signet | [faucet.brink.dev](https://faucet.brink.dev/) |

## Análisis y Monitoreo

| Herramienta | Descripción | Link |
|-------------|-------------|------|
| **Clark Moody Dashboard** | Estadísticas de red Bitcoin en tiempo real | [bitcoin.clarkmoody.com](https://bitcoin.clarkmoody.com/dashboard/) |
| **Grafana + Prometheus** | Dashboards de monitoreo de nodos | Varias configuraciones |
| **Fork Monitor** | Detecta forks de cadena y bloques stale | [forkmonitor.info](https://forkmonitor.info/) |
| **Transactionfee.info** | Estimación y análisis de comisiones | [transactionfee.info](https://transactionfee.info/) |

## Entorno de Desarrollo

### Configuración Rápida con Nigiri

```bash
# Install Nigiri (Docker required)
curl https://getnigiri.vulpemventures.com | bash

# Start a regtest environment (Bitcoin + Electrs + Esplora)
nigiri start

# Mine blocks
nigiri rpc generatetoaddress 1 $(nigiri rpc getnewaddress)

# Stop
nigiri stop
```

### Configuración Rápida con Polar

Descarga desde [lightningpolar.com](https://lightningpolar.com/) y crea una red con unos pocos clics — incluye nodos Bitcoin Core, LND, CLN y Eclair con una interfaz visual de grafo.
