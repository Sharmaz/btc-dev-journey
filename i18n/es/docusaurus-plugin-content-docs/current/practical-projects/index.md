---
sidebar_position: 1
title: Proyectos Prácticos
description: Proyectos prácticos de desarrollo Bitcoin organizados por nivel de dificultad
---

# Proyectos Prácticos

La mejor forma de aprender es construyendo. Estos proyectos están organizados por nivel de dificultad, cada uno diseñado para reforzar conceptos específicos del roadmap.

**Todos los proyectos deben construirse y probarse en regtest.** Nunca uses mainnet para experimentos de desarrollo.

---

## Principiante

### 1. Generador de Direcciones

**Construye una herramienta que genere direcciones Bitcoin de diferentes tipos.**

- **Habilidades practicadas:** Generación de claves, hashing, codificación de direcciones
- **Stack sugerido:** Python + python-bitcoinlib, o JavaScript + bitcoinjs-lib
- **Secciones relacionadas:** [Prerequisitos](/docs/fundamentals/prerequisites), [Fundamentos de Bitcoin](/docs/fundamentals/bitcoin-fundamentals)

**Pasos:**
1. Generar una clave privada aleatoria
2. Derivar la clave pública (secp256k1)
3. Generar una dirección Legacy (P2PKH — `1...`)
4. Generar una dirección SegWit (P2WPKH — `bc1q...`)
5. Generar una dirección Taproot (P2TR — `bc1p...`)
6. Mostrar la clave privada en formato WIF
7. Verificar las direcciones usando `bitcoin-cli validateaddress`

---

### 2. Parser de Transacciones

**Construye una herramienta que decodifique y muestre transacciones Bitcoin raw.**

- **Habilidades practicadas:** Estructura de transacciones, serialización, opcodes de Script
- **Stack sugerido:** Python o Rust
- **Secciones relacionadas:** [Arquitectura de Bitcoin](/docs/fundamentals/bitcoin-architecture)

**Pasos:**
1. Aceptar un hex de transacción raw como entrada
2. Parsear la versión, inputs, outputs y locktime
3. Para cada input: mostrar txid, vout, scriptSig
4. Para cada output: mostrar valor, scriptPubKey, tipo de dirección
5. Calcular y mostrar el txid (doble SHA-256 de la tx serializada)
6. Manejar formatos de transacción tanto legacy como SegWit
7. Probar con transacciones de `bitcoin-cli getrawtransaction`

---

### 3. CLI Wallet

**Construye un wallet simple de línea de comandos que gestione claves y envíe transacciones.**

- **Habilidades practicadas:** Derivación de claves HD, gestión de wallet, interacción RPC
- **Stack sugerido:** JavaScript + bitcoinjs-lib + bip32/bip39, o Rust + BDK
- **Secciones relacionadas:** [Desarrollo de Wallets](/docs/tracks/application-developer/wallet-development), [Desarrollo Básico](/docs/fundamentals/basic-development)

**Pasos:**
1. Generar una frase semilla mnemónica (BIP-39)
2. Derivar claves HD usando ruta BIP-84 (`m/84'/1'/0'/0/i` para testnet)
3. Generar direcciones de recepción
4. Mostrar saldo consultando el nodo
5. Construir y firmar una transacción para enviar fondos
6. Transmitir la transacción
7. Guardar/cargar estado del wallet a un archivo (encriptado)

---

## Intermedio

### 4. Explorador de Bloques

**Construye un explorador de bloques web para tu red regtest local.**

- **Habilidades practicadas:** Integración RPC, modelado de datos, desarrollo web
- **Stack sugerido:** Node.js + Express + cualquier frontend, o Python + Flask
- **Secciones relacionadas:** [Librerías y SDKs](/docs/tracks/application-developer/libraries-sdks)

**Pasos:**
1. Conectar a Bitcoin Core vía RPC
2. Mostrar los últimos bloques con hash, altura, timestamp, conteo de tx
3. Clic en un bloque para ver sus transacciones
4. Clic en una transacción para ver inputs, outputs y montos
5. Buscar por hash de bloque, txid o dirección
6. Mostrar estadísticas del mempool (transacciones sin confirmar, comisiones totales)
7. Agregar auto-refresh o actualizaciones WebSocket

---

### 5. Procesador de Pagos

**Construye un sistema simple de procesamiento de pagos que genere facturas y rastree pagos.**

- **Habilidades practicadas:** Generación de direcciones, detección de pagos, patrones de webhook
- **Stack sugerido:** Node.js o Python + Bitcoin Core RPC
- **Secciones relacionadas:** [Procesamiento de Pagos](/docs/tracks/application-developer/payment-processing)

**Pasos:**
1. Generar una dirección única por factura (derivación HD)
2. Crear un endpoint de factura: `POST /invoice` → retorna dirección + monto
3. Monitorear la blockchain por pagos entrantes
4. Rastrear conteo de confirmaciones por cada pago
5. Marcar facturas como pagadas después de N confirmaciones
6. Agregar callback webhook cuando el pago es confirmado
7. Construir un dashboard simple mostrando estado de facturas

---

### 6. Monitor de Mempool

**Construye una herramienta que monitoree el mempool y proporcione estimación de comisiones.**

- **Habilidades practicadas:** Análisis de mempool, estimación de comisiones, visualización de datos
- **Stack sugerido:** Python o JavaScript + Bitcoin Core RPC
- **Secciones relacionadas:** [Red P2P](/docs/fundamentals/p2p-network), [Arquitectura de Bitcoin](/docs/fundamentals/bitcoin-architecture)

**Pasos:**
1. Consultar `getmempoolinfo` y `getrawmempool` periódicamente
2. Agrupar transacciones por tasa de comisión (sat/vB)
3. Mostrar un histograma de distribución de tasas de comisión
4. Rastrear tamaño del mempool a lo largo del tiempo
5. Estimar tiempo de confirmación para diferentes tasas de comisión
6. Alertar cuando el mempool exceda un umbral
7. Visualizar con un dashboard web o gráfico de terminal

---

## Avanzado

### 7. Wallet Multisig

**Construye un wallet multisig 2-de-3 con flujo de trabajo de firmado PSBT.**

- **Habilidades practicadas:** Multisig, PSBT, descriptor wallets, firmado colaborativo
- **Stack sugerido:** Rust + BDK, o JavaScript + bitcoinjs-lib
- **Secciones relacionadas:** [Protocolos Avanzados](/docs/tracks/application-developer/advanced-protocols), [Desarrollo de Wallets](/docs/tracks/application-developer/wallet-development)

**Pasos:**
1. Generar 3 pares de claves independientes (simulando 3 firmantes)
2. Crear un descriptor multisig 2-de-3 (`wsh(sortedmulti(2,...))`)
3. Derivar direcciones de recepción del descriptor
4. Recibir fondos a una dirección multisig
5. Crear un PSBT sin firmar para una transacción de gasto
6. Firmar con clave 1 → PSBT parcialmente firmado
7. Firmar con clave 2 → PSBT completamente firmado
8. Finalizar y transmitir

---

### 8. Gateway de Pagos Lightning

**Construye un gateway de pagos que acepte pagos Lightning.**

- **Habilidades practicadas:** Integración Lightning, gestión de facturas, sistemas de webhook
- **Stack sugerido:** Node.js + LND gRPC, o Rust + LDK
- **Secciones relacionadas:** [Procesamiento de Pagos](/docs/tracks/application-developer/payment-processing), [Protocolos en Bitcoin](/docs/tracks/application-developer/protocols-on-bitcoin)

**Pasos:**
1. Conectar a un nodo LND vía gRPC (o construir con LDK)
2. Crear facturas BOLT-11 con monto y descripción
3. Monitorear liquidación de facturas (streaming RPC o polling)
4. Generar un código QR para la factura
5. Construir una API REST: crear factura, verificar estado, listar pagos
6. Agregar notificaciones webhook al liquidar pagos
7. Mostrar una página de checkout simple

---

### 9. Indexador Personalizado

**Construye un indexador de blockchain que rastree saldos de direcciones e historial de transacciones.**

- **Habilidades practicadas:** Parsing de blockchain, diseño de base de datos, rastreo de UTXOs
- **Stack sugerido:** Rust o Go + PostgreSQL/SQLite
- **Secciones relacionadas:** [Arquitectura de Bitcoin](/docs/fundamentals/bitcoin-architecture), [Red P2P](/docs/fundamentals/p2p-network)

**Pasos:**
1. Conectar a Bitcoin Core y suscribirse a nuevos bloques
2. Parsear las transacciones de cada bloque
3. Extraer inputs y outputs con direcciones
4. Mantener un conjunto UTXO en una base de datos
5. Rastrear saldos de direcciones (suma de outputs no gastados)
6. Construir una API: obtener saldo, obtener historial de transacciones, obtener UTXOs
7. Manejar reorgs (rollback cuando un bloque se desconecta)
8. Indexar desde génesis o desde una altura específica

---

## Consejos para Todos los Proyectos

- **Empieza en regtest** — Bloques instantáneos, monedas gratis, control total
- **Usa `bitcoin-cli` primero** — Entiende las llamadas RPC antes de programar
- **Lee el código fuente** — Cuando te atasques, mira cómo herramientas existentes resuelven el problema
- **Mantenlo simple** — Haz que el flujo básico funcione antes de agregar funcionalidades
- **Comparte tu trabajo** — Haz open-source de tus proyectos, obtén feedback de la comunidad
