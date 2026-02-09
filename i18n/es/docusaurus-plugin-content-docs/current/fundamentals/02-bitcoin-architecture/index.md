---
sidebar_position: 3
title: Arquitectura de Bitcoin
description: Entendiendo el modelo UTXO, transacciones y Bitcoin Script
---

# Arquitectura de Bitcoin

Esta sección cubre las estructuras de datos fundamentales de Bitcoin: cómo se representa el valor, cómo funcionan las transacciones y cómo el lenguaje de scripting de Bitcoin permite dinero programable.

## El Modelo UTXO

Bitcoin no usa cuentas y saldos como un banco. En su lugar, usa **UTXOs** (Unspent Transaction Outputs — Salidas de Transacción No Gastadas).

### Cómo Funciona

Piensa en los UTXOs como monedas y billetes físicos. Cuando "tienes" 1.5 BTC, no tienes una cuenta con un saldo de 1.5 BTC — tienes uno o más UTXOs que suman 1.5 BTC. Por ejemplo:

- UTXO A: 1.0 BTC (de un pago que recibiste)
- UTXO B: 0.5 BTC (cambio de una transacción anterior)

Cuando gastas Bitcoin, **consumes** UTXOs completos como entradas y creas nuevos UTXOs como salidas:

```
Entradas (consumidas):         Salidas (creadas):
  UTXO A: 1.0 BTC    →       0.7 BTC al destinatario
                              0.2999 BTC de vuelta a ti (cambio)
                              0.0001 BTC comisión (implícita)
```

El UTXO de entrada se destruye. Se crean dos nuevos UTXOs: uno para el destinatario, uno como cambio de vuelta a ti. La diferencia entre entradas y salidas es la **comisión de transacción** pagada a los mineros.

### Por Qué los UTXOs Importan para los Desarrolladores

- **Privacidad** — Cada UTXO es independiente; no se expone un "saldo" único
- **Paralelismo** — Los UTXOs se pueden gastar independientemente, permitiendo validación paralela
- **Selección de monedas** — Los wallets deben elegir qué UTXOs gastar (un algoritmo no trivial)
- **Dust** — UTXOs muy pequeños cuestan más en comisiones de lo que valen para gastarlos

## Transacciones

Una transacción de Bitcoin es una estructura de datos con:

### Entradas

Cada entrada referencia una salida de transacción previa (por txid e índice de salida) y proporciona un **script** que satisface las condiciones de gasto:

```
{
  "txid": "abc123...",
  "vout": 0,
  "scriptSig": "<signature> <pubkey>"
}
```

### Salidas

Cada salida especifica un monto y un **script de bloqueo** (las condiciones que deben cumplirse para gastarla):

```
{
  "value": 0.5,
  "scriptPubKey": "OP_DUP OP_HASH160 <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG"
}
```

### Tipos de Transacción

| Tipo | Descripción | Uso Común |
|------|-------------|-----------|
| **P2PKH** | Pay to Public Key Hash | Direcciones legacy (1...) |
| **P2SH** | Pay to Script Hash | Multisig, SegWit envuelto (3...) |
| **P2WPKH** | Pay to Witness Public Key Hash | SegWit nativo (bc1q...) |
| **P2WSH** | Pay to Witness Script Hash | Multisig SegWit |
| **P2TR** | Pay to Taproot | Direcciones Taproot (bc1p...) |

### SegWit y Taproot

**Segregated Witness (SegWit)**, activado en 2017, movió los datos de firma a una estructura "witness" separada. Esto corrigió la maleabilidad de transacciones y aumentó efectivamente la capacidad de los bloques.

**Taproot**, activado en 2021, introdujo firmas Schnorr y MAST (Merkelized Alternative Script Trees). Esto mejora la privacidad (scripts complejos se ven como pagos simples) y la eficiencia.

## Bitcoin Script

Bitcoin tiene su propio lenguaje de scripting — un lenguaje simple, basado en pila, intencionalmente no-Turing-completo para definir condiciones de gasto.

### Cómo Funciona Script

Cuando una transacción se valida, el **script de desbloqueo** (scriptSig/witness) se combina con el **script de bloqueo** (scriptPubKey) y se ejecuta en una máquina de pila. Si la ejecución tiene éxito (deja `true` en la pila), el gasto es válido.

### Opcodes Comunes

| Opcode | Descripción |
|--------|-------------|
| `OP_DUP` | Duplicar el elemento superior de la pila |
| `OP_HASH160` | Hashear el elemento superior con SHA-256 luego RIPEMD-160 |
| `OP_EQUALVERIFY` | Verificar igualdad, fallar si no es igual |
| `OP_CHECKSIG` | Verificar una firma contra una clave pública |
| `OP_CHECKMULTISIG` | Verificar multisig M-de-N |
| `OP_CHECKLOCKTIMEVERIFY` | Time-lock: la salida no puede gastarse antes de un tiempo/bloque |
| `OP_CHECKSEQUENCEVERIFY` | Time-lock relativo |
| `OP_IF / OP_ELSE / OP_ENDIF` | Ejecución condicional |

### Ejemplo: Ejecución de Script P2PKH

Script de bloqueo: `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`

Script de desbloqueo: `<sig> <pubKey>`

```
Ejecución en pila:
1. Push <sig>           → [sig]
2. Push <pubKey>        → [sig, pubKey]
3. OP_DUP               → [sig, pubKey, pubKey]
4. OP_HASH160            → [sig, pubKey, hash(pubKey)]
5. Push <pubKeyHash>    → [sig, pubKey, hash(pubKey), pubKeyHash]
6. OP_EQUALVERIFY        → [sig, pubKey]  (hashes coinciden ✓)
7. OP_CHECKSIG           → [true]         (firma válida ✓)
```

## Lectura Recomendada

- [Learn Me a Bitcoin](https://learnmeabitcoin.com/) — Explicaciones visuales de transacciones y script
- [Bitcoin Script Wiki](https://en.bitcoin.it/wiki/Script) — Referencia completa de opcodes
- [BIP-141 (SegWit)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) — Especificación de Segregated Witness
- [BIP-341 (Taproot)](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) — Especificación de Taproot
