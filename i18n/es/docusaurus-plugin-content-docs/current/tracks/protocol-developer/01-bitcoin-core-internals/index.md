---
sidebar_position: 1
title: Internos de Bitcoin Core
description: Entendiendo la arquitectura y módulos clave de Bitcoin Core
---

# Internos de Bitcoin Core

Bitcoin Core es la implementación de referencia del protocolo Bitcoin. Entender sus internos es la base del desarrollo de protocolo.

## Resumen

Bitcoin Core es una aplicación C++ que ha evolucionado desde el código original de Satoshi. A lo largo de los años, ha sido significativamente refactorizado para modularidad, seguridad y rendimiento. El proyecto mantiene estándares extremadamente altos de calidad de código — los cambios son revisados por múltiples desarrolladores experimentados antes de fusionarse.

## Subsistemas Clave

| Subsistema | Responsabilidad | Archivos Clave |
|------------|----------------|----------------|
| **Validation** | Validación de bloques y transacciones | `src/validation.cpp` |
| **Net/Net Processing** | Red P2P y manejo de mensajes | `src/net.cpp`, `src/net_processing.cpp` |
| **Wallet** | Gestión de claves, selección de monedas, firma | `src/wallet/` |
| **Mempool** | Gestión de transacciones sin confirmar | `src/txmempool.cpp` |
| **RPC/REST** | Interfaces de API externas | `src/rpc/` |
| **Script** | Intérprete y verificación de scripts | `src/script/` |
| **Consensus** | Código crítico de consenso | `src/consensus/` |
| **Index** | Índices opcionales (txindex, blockfilter) | `src/index/` |

## Cómo Encaja Todo

Cuando llega un nuevo bloque:

1. **Net** recibe el bloque de un peer
2. **Net Processing** lo deserializa y lo enruta
3. **Validation** verifica el proof-of-work, transacciones y reglas de consenso
4. **Conjunto UTXO** (chainstate) se actualiza
5. **Mempool** elimina las transacciones confirmadas
6. **Wallet** escanea por transacciones relevantes
7. **Indexes** se actualizan si están habilitados

## Comenzando

```bash
# Clonar el repositorio
git clone https://github.com/bitcoin/bitcoin.git
cd bitcoin

# Leer las instrucciones de build
cat doc/build-unix.md  # o doc/build-osx.md

# Compilar
cmake -B build
cmake --build build

# Ejecutar tests
ctest --test-dir build
```

## Temas en Esta Sección

- [Arquitectura del Código](/docs/tracks/protocol-developer/bitcoin-core-internals/code-architecture) — Layout del árbol de código, sistema de build, límites de módulos
- [Consenso](/docs/tracks/protocol-developer/bitcoin-core-internals/consensus) — Reglas de consenso, lógica de validación, activación de soft forks
