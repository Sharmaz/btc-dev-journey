---
sidebar_position: 5
title: Desarrollo Básico
description: Práctica con Bitcoin Core, redes y operaciones básicas de wallet
---

# Desarrollo Básico

Es hora de ensuciarse las manos. Esta sección cubre los fundamentos prácticos que todo desarrollador Bitcoin necesita: ejecutar un nodo, entender las redes y realizar operaciones básicas de wallet.

## Nodo Bitcoin

### Instalación

Consulta nuestras guías de configuración de entorno para instrucciones detalladas de instalación:

- [Configuración en macOS](/docs/environment-setup/macos)
- [Configuración en Ubuntu](/docs/environment-setup/ubuntu)

### Básicos de bitcoin-cli

`bitcoin-cli` es la interfaz de línea de comandos para interactuar con tu nodo Bitcoin:

```bash
# Verificar estado del nodo
bitcoin-cli getblockchaininfo

# Obtener info de la red
bitcoin-cli getnetworkinfo

# Obtener info de peers
bitcoin-cli getpeerinfo

# Obtener info del mempool
bitcoin-cli getmempoolinfo
```

### bitcoin.conf

El archivo de configuración controla el comportamiento de tu nodo. Opciones clave:

```ini
# Red (descomenta una)
#testnet=1
#regtest=1

# Configuración RPC
rpcuser=tuusuario
rpcpassword=tucontraseña
server=1

# Rendimiento
dbcache=450
maxmempool=300

# Poda (ahorrar espacio en disco)
#prune=1000
```

## Redes

Bitcoin tiene tres redes, cada una con un propósito diferente:

### Mainnet

La red real de Bitcoin donde las transacciones tienen valor monetario real.

- **Usar para:** Aplicaciones en producción, pagos reales
- **Nunca usar para:** Pruebas o experimentos
- **Puerto:** 8333

### Testnet

Una red de pruebas pública con monedas de prueba sin valor. Se comporta como mainnet pero con monedas gratuitas de faucets.

- **Usar para:** Pruebas de integración, testing con otros desarrolladores
- **Monedas:** Gratuitas de faucets (sin valor monetario)
- **Puerto:** 18333
- **Versión actual:** Testnet4

```bash
# Iniciar nodo en testnet
bitcoind -testnet
bitcoin-cli -testnet getblockchaininfo
```

### Regtest (Regression Testing)

Una red local y privada donde controlas todo. Puedes minar bloques al instante y crear transacciones a voluntad.

- **Usar para:** Desarrollo local, pruebas unitarias, iteración rápida
- **Monedas:** Mina las tuyas al instante
- **Puerto:** 18444

```bash
# Iniciar nodo regtest
bitcoind -regtest

# Crear un wallet
bitcoin-cli -regtest createwallet "dev"

# Generar una dirección
bitcoin-cli -regtest getnewaddress

# Minar 101 bloques (los primeros 100 son inmaduros, el bloque 101 hace gastable la primera coinbase)
bitcoin-cli -regtest generatetoaddress 101 <tu-direccion>

# Verificar saldo
bitcoin-cli -regtest getbalance
```

**Regtest es tu mejor amigo como desarrollador.** Úsalo para toda experimentación local.

## Operaciones Básicas de Wallet

### Crear y Gestionar Wallets

```bash
# Crear un nuevo wallet
bitcoin-cli -regtest createwallet "miwallet"

# Listar wallets
bitcoin-cli -regtest listwallets

# Obtener info del wallet
bitcoin-cli -regtest getwalletinfo
```

### Direcciones

```bash
# Generar una nueva dirección de recepción
bitcoin-cli -regtest getnewaddress

# Generar un tipo de dirección específico
bitcoin-cli -regtest getnewaddress "" "bech32"    # bc1q... (SegWit)
bitcoin-cli -regtest getnewaddress "" "bech32m"   # bc1p... (Taproot)
bitcoin-cli -regtest getnewaddress "" "legacy"    # 1...    (P2PKH)
```

### Enviar Transacciones

```bash
# Enviar a una dirección
bitcoin-cli -regtest sendtoaddress <direccion> 0.5

# Enviar con tasa de comisión específica (sat/vB)
bitcoin-cli -regtest -named sendtoaddress address=<direccion> amount=0.5 fee_rate=10

# Obtener detalles de transacción
bitcoin-cli -regtest gettransaction <txid>

# Decodificar una transacción raw
bitcoin-cli -regtest decoderawtransaction <hex>
```

### Explorar Transacciones

```bash
# Listar transacciones recientes
bitcoin-cli -regtest listtransactions

# Listar salidas no gastadas (UTXOs)
bitcoin-cli -regtest listunspent

# Obtener datos raw de transacción
bitcoin-cli -regtest getrawtransaction <txid> true
```

## ¿Qué Sigue?

Con estos fundamentos bajo tu cinturón, estás listo para elegir un track de especialización:

- [Desarrollador de Protocolo](/docs/tracks/protocol-developer) — Sumérgete en los internos de Bitcoin Core
- [Desarrollador de Aplicaciones](/docs/tracks/application-developer) — Construye wallets y apps
- **Desarrollador de Infraestructura** — Crea exploradores y APIs (próximamente)
- **Desarrollador de Minería** — Desarrolla software de minería (próximamente)

Consulta la página de [Tipos de Desarrolladores](/docs/roadmap/developer-types) para ayudarte a decidir.
