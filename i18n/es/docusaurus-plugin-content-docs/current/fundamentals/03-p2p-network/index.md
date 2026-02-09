---
sidebar_position: 4
title: Red P2P
description: Cómo funciona la red peer-to-peer de Bitcoin y la comunicación entre nodos
---

# Red P2P

Bitcoin opera como una red peer-to-peer donde los nodos se comunican directamente entre sí — sin servidor central, sin jerarquía. Entender esta capa de red es esencial para cualquier desarrollador Bitcoin.

## Protocolo de Red

### Cómo se Encuentran los Nodos

Cuando un nodo Bitcoin inicia, necesita descubrir otros nodos para conectarse:

1. **DNS Seeds** — Direcciones DNS hardcodeadas que devuelven direcciones IP de nodos activos conocidos
2. **Seed Nodes** — Direcciones IP hardcodeadas como respaldo si los DNS seeds fallan
3. **Mensajes Addr** — Una vez conectados, los nodos comparten direcciones de otros nodos conocidos
4. **Peers Manuales** — Los operadores pueden especificar peers manualmente

### Tipos de Mensajes

Los nodos se comunican usando un protocolo binario sobre TCP (puerto por defecto 8333 para mainnet). Tipos de mensajes clave:

| Mensaje | Propósito |
|---------|-----------|
| `version` / `verack` | Handshake — intercambiar información de versión y capacidades |
| `inv` | Anunciar nuevas transacciones o bloques (inventario) |
| `getdata` | Solicitar los datos completos de elementos anunciados |
| `tx` | Enviar una transacción completa |
| `block` | Enviar un bloque completo |
| `headers` | Enviar encabezados de bloques (para SPV y sincronización inicial) |
| `getblocks` / `getheaders` | Solicitar hashes o encabezados de bloques |
| `ping` / `pong` | Mantener la conexión activa y medir latencia |
| `addr` / `addrv2` | Compartir direcciones de nodos conocidos |
| `feefilter` | Indicar a los peers la tasa mínima de comisión para relay |

### Propagación de Transacciones

Cuando un usuario transmite una transacción:

1. La transacción se envía a los peers conectados
2. Cada peer valida la transacción independientemente
3. Las transacciones válidas se agregan al **mempool** (pool de memoria de transacciones sin confirmar)
4. Los peers retransmiten la transacción a sus propios peers
5. La transacción se propaga por toda la red en segundos

### Propagación de Bloques

Cuando un minero encuentra un bloque válido:

1. El minero envía un anuncio de **bloque compacto** a sus peers
2. Los peers solicitan las transacciones que no tienen
3. Cada nodo valida el bloque independientemente (todas las transacciones, proof of work, reglas de consenso)
4. Los bloques válidos se agregan a la blockchain local
5. El bloque se propaga a toda la red

**Compact Blocks** (BIP-152) redujo significativamente el tiempo de propagación de bloques enviando IDs cortos de transacciones en lugar de transacciones completas — los nodos generalmente ya tienen las transacciones en su mempool.

## Tipos de Nodos

### Nodo Completo

Un **nodo completo** descarga y valida cada bloque y transacción desde el bloque génesis. Aplica todas las reglas de consenso de forma independiente.

- **Almacena:** La blockchain completa (600+ GB a 2025)
- **Valida:** Cada transacción y bloque
- **Sirve:** Bloques y transacciones a otros nodos
- **Modelo de confianza:** Sin confianza — verifica todo independientemente

Ejecutar un nodo completo es el estándar de oro para la seguridad en Bitcoin. Es la única forma de estar seguro de que tus transacciones son válidas sin confiar en nadie más.

### Nodo Podado

Un **nodo podado** es un nodo completo que valida todo pero **descarta datos de bloques antiguos** para ahorrar espacio en disco. Solo mantiene el conjunto UTXO y los bloques recientes.

- **Almacena:** Solo bloques recientes + conjunto UTXO (configurable, mínimo ~550 MB)
- **Valida:** Todo (igual que un nodo completo)
- **No puede servir:** Bloques históricos a otros nodos
- **Ideal para:** Desarrolladores y usuarios con espacio en disco limitado

```bash
# bitcoin.conf para un nodo podado
prune=1000  # Mantener solo ~1 GB de datos de bloques
```

### Nodo SPV (Verificación Simplificada de Pagos)

Un **nodo SPV** solo descarga encabezados de bloques y verifica transacciones usando pruebas de Merkle. Depende de nodos completos para los datos de transacciones.

- **Almacena:** Solo encabezados de bloques (~60 MB)
- **Valida:** Encabezados de bloques y pruebas de Merkle (no transacciones completas)
- **Modelo de confianza:** Asume que la cadena más larga con encabezados válidos contiene transacciones válidas
- **Usado por:** La mayoría de los wallets móviles

Los nodos SPV sacrifican seguridad por eficiencia — no pueden verificar independientemente todas las reglas de consenso.

### Nodo de Minería

Un **nodo de minería** es un nodo completo que también participa en la creación de bloques:

- Selecciona transacciones del mempool
- Construye bloques candidatos
- Realiza computación de proof-of-work
- Transmite los bloques descubiertos a la red

### Nodo de Lightning Network

Un **nodo Lightning** se ejecuta junto a un nodo completo de Bitcoin y gestiona canales de pago:

- Abre y cierra canales (transacciones on-chain)
- Enruta pagos a través de la red Lightning
- Mantiene el estado y los saldos de los canales

Implementaciones populares: LND, CLN (Core Lightning), Eclair, LDK.

## Parámetros de Red

| Parámetro | Mainnet | Testnet | Regtest |
|-----------|---------|---------|---------|
| Puerto por defecto | 8333 | 18333 | 18444 |
| Prefijo de dirección | 1, 3, bc1 | m, n, tb1 | bcrt1 |
| Magic bytes | 0xD9B4BEF9 | 0x0709110B | 0xDAB5BFFA |

## Lectura Recomendada

- [Bitcoin Developer Guide: P2P Network](https://developer.bitcoin.org/devguide/p2p_network.html)
- [BIP-152 (Compact Blocks)](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)
- [Bitcoin Protocol Documentation](https://en.bitcoin.it/wiki/Protocol_documentation)
