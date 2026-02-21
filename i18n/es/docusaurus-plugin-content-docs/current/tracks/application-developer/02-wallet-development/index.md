---
sidebar_position: 2
title: Desarrollo de Wallets
description: Construyendo wallets Bitcoin - derivación de claves HD, selección de monedas y gestión de claves
---

# Desarrollo de Wallets

Un wallet Bitcoin es mucho más que mostrar un saldo. Gestiona claves, construye transacciones, selecciona qué UTXOs gastar, estima comisiones y lleva registro de tu historial de transacciones. Construir un wallet seguro es una de las tareas más importantes (y desafiantes) en el desarrollo Bitcoin.

## HD Wallets (Determinísticos Jerárquicos)

Los wallets modernos usan una estructura de árbol para derivar todas las claves desde una única semilla:

### BIP-32: Derivación de Claves HD

Una semilla maestra genera un árbol de pares de claves:

```
Master Seed
  └── m (master key)
       ├── m/0  (child 0)
       │    ├── m/0/0
       │    └── m/0/1
       └── m/1  (child 1)
            ├── m/1/0
            └── m/1/1
```

**Derivación hardened vs. normal:**
- Normal (`m/0/1`): Las claves públicas hijas pueden derivarse de la clave pública padre
- Hardened (`m/0'/1'`): Requiere la clave privada padre — más seguro

### BIP-39: Frases Semilla Mnemónicas

Las frases de 12 o 24 palabras que respaldan un wallet:

```
abandon abandon abandon ... about  →  Entropy  →  Seed  →  Master Key
```

El mnemónico codifica entropía (128 o 256 bits) con un checksum. Combinado con una passphrase opcional, produce la semilla maestra.

### BIP-44/49/84/86: Rutas de Derivación

Las rutas estándar definen dónde viven las claves en el árbol HD:

| BIP | Ruta | Tipo de Dirección |
|-----|------|-------------------|
| BIP-44 | `m/44'/0'/0'/0/i` | Legacy P2PKH (1...) |
| BIP-49 | `m/49'/0'/0'/0/i` | Wrapped SegWit P2SH-P2WPKH (3...) |
| BIP-84 | `m/84'/0'/0'/0/i` | Native SegWit P2WPKH (bc1q...) |
| BIP-86 | `m/86'/0'/0'/0/i` | Taproot P2TR (bc1p...) |

Componentes de la ruta: `purpose' / coin_type' / account' / change / address_index`

## Descriptores

Los output descriptors son una forma moderna de describir qué puede gastar un wallet:

```
# Native SegWit wallet
wpkh([fingerprint/84'/0'/0']xpub.../0/*)

# 2-of-3 multisig
wsh(sortedmulti(2, [fp1/48'/0'/0'/2']xpub1/0/*, [fp2/...]xpub2/0/*, [fp3/...]xpub3/0/*))

# Taproot
tr([fingerprint/86'/0'/0']xpub.../0/*)
```

Los descriptores son el enfoque preferido para nuevas implementaciones de wallets. BDK está construido completamente alrededor de descriptores.

## Selección de Monedas

Al gastar Bitcoin, el wallet debe elegir qué UTXOs usar como inputs. Esto no es trivial:

### Estrategias

| Estrategia | Descripción | Compromiso |
|------------|-------------|------------|
| **Mayor primero** | Usar los UTXOs más grandes primero | Simple, pero crea muchos outputs de cambio pequeños |
| **Menor primero** | Usar los UTXOs más pequeños primero | Consolida dust, pero comisiones más altas |
| **Branch and Bound** | Encontrar coincidencia exacta (sin cambio) | Óptimo cuando es posible, computacionalmente costoso |
| **Aleatorio** | Selección aleatoria con objetivo | Buena privacidad, impredecible |
| **Knapsack** | Aproximar objetivo con mínimo desperdicio | Enfoque histórico de Bitcoin Core |

### Consideraciones

- **Minimización de comisiones** — Menos inputs = menor comisión
- **Privacidad** — Evitar vincular UTXOs de diferentes fuentes
- **Output de cambio** — Un output extra cuesta ~34 bytes; evitar si es posible
- **Evitar dust** — No crear cambio por debajo del umbral de dust (~546 sats)

## PSBT (Transacciones Bitcoin Parcialmente Firmadas)

[BIP-174](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki) define un formato estándar para transacciones sin firmar/parcialmente firmadas. Esto permite:

- **Firmado con hardware wallet** — Crear transacción en computadora, firmar en dispositivo
- **Flujos multisig** — Cada firmante agrega su firma independientemente
- **CoinJoin** — Múltiples partes contribuyen inputs y firman por separado

```
Creator → Updater → Signer → Combiner → Finalizer → Extractor
```

## Consideraciones de Seguridad

- **Nunca almacenes claves privadas en texto plano** — Encripta en reposo
- **Usa hardware wallets para fondos significativos** — Las claves nunca salen del dispositivo
- **Implementa verificación de direcciones** — Mostrar direcciones en dispositivo hardware
- **Prueba en regtest/testnet primero** — Siempre prueba antes de mainnet
- **Respalda la frase semilla de forma segura** — Respaldo en metal, múltiples ubicaciones

## Lectura Recomendada

- [BIP-32: HD Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP-39: Mnemonic Code](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Output Descriptors (Bitcoin Core)](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [BIP-174: PSBT](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki)
- [Bitcoin Design Guide: Wallet](https://bitcoin.design/guide/designing-products/personal-finance/)
