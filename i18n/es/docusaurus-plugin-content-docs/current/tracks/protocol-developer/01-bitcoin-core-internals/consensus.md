---
sidebar_position: 3
title: Reglas de Consenso
description: Entendiendo las reglas de consenso de Bitcoin, lógica de validación y activación de soft forks
---

# Reglas de Consenso

Las reglas de consenso son la parte más crítica de Bitcoin. Definen qué hace válido a un bloque y una transacción. Cada nodo completo en la red aplica estas reglas de forma independiente — si un bloque viola cualquier regla, es rechazado sin importar cuánto proof-of-work lo respalde.

## ¿Qué Son las Reglas de Consenso?

Las reglas de consenso son el conjunto de condiciones que cada bloque y transacción debe satisfacer para ser considerado válido. Incluyen:

### Reglas a Nivel de Bloque

- El tamaño del bloque no debe exceder el límite de peso (4M unidades de peso)
- El hash del encabezado del bloque debe estar por debajo del objetivo de dificultad actual
- La marca de tiempo debe ser mayor que la mediana de los últimos 11 bloques
- La primera transacción debe ser una coinbase (y solo la primera)
- La recompensa de coinbase no debe exceder el subsidio del bloque + comisiones
- La raíz de Merkle debe coincidir con las transacciones en el bloque

### Reglas a Nivel de Transacción

- Las entradas deben referenciar salidas existentes y no gastadas (UTXOs)
- Los scripts de entrada deben satisfacer los scripts de salida correspondientes
- El valor total de entrada debe ser >= al valor total de salida (la diferencia es la comisión)
- Sin doble gasto dentro del mismo bloque
- La transacción no debe ser un duplicado de una transacción sin confirmar existente
- Las operaciones de firma no deben exceder los límites

### Validación de Script

La validación de script es donde se verifican las condiciones de gasto:

```
Para cada entrada:
  1. Recuperar el UTXO que se está gastando
  2. Ejecutar el script de desbloqueo (scriptSig / witness)
  3. Ejecutar el script de bloqueo (scriptPubKey)
  4. Si la ejecución tiene éxito → la entrada es válida
  5. Si la ejecución falla → toda la transacción es inválida
```

## Soft Forks

Los soft forks endurecen las reglas de consenso — bloques que antes eran válidos se vuelven inválidos. Los nodos antiguos aún aceptan los nuevos bloques (no violan ninguna regla antigua), así que la red no se divide.

### Soft Forks Notables

| Soft Fork | Año | BIP(s) | Qué Cambió |
|-----------|-----|--------|-----------|
| P2SH | 2012 | BIP-16 | Soporte para Pay-to-Script-Hash |
| CLTV | 2015 | BIP-65 | Timelocks absolutos |
| CSV | 2016 | BIP-68, 112, 113 | Timelocks relativos |
| SegWit | 2017 | BIP-141, 143, 144 | Separación de datos witness, corrección de maleabilidad |
| Taproot | 2021 | BIP-340, 341, 342 | Firmas Schnorr, MAST |

### Mecanismos de Activación

Cómo se activan los soft forks en la red:

- **BIP-9 (Version Bits)** — Los mineros señalizan disponibilidad; se activa después de un umbral
- **BIP-8 (Activación Obligatoria)** — Similar a BIP-9 pero con opción de activación forzada
- **Speedy Trial** — Usado para Taproot; ventana de señalización corta, activación retrasada
- **UASF (User Activated Soft Fork)** — Los nodos aplican las reglas independientemente de la señalización minera

## Validación en el Código

Las funciones clave de validación en Bitcoin Core:

```
CheckBlock()          → Verificaciones básicas de estructura del bloque
ContextualCheckBlock() → Verificaciones que dependen del estado de la cadena
ConnectBlock()        → Validación completa + actualización del conjunto UTXO
CheckTransaction()    → Validación individual de transacciones
```

El código de validación se encuentra principalmente en `src/validation.cpp`, con verificaciones específicas de consenso en `src/consensus/`.

## Por Qué los Bugs de Consenso Son Críticos

Un bug de consenso puede causar:

- **División de cadena** — Los nodos no están de acuerdo sobre cuál cadena es válida
- **Inflación** — Más monedas creadas que el límite de 21M
- **Robo** — Fondos gastados sin firmas válidas
- **Detención de la red** — Los nodos rechazan todos los nuevos bloques

Por esto los cambios en el código de consenso requieren el proceso de revisión más riguroso en todo el software de código abierto.

## Lectura Recomendada

- [Reglas de consenso de Bitcoin (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Protocol_rules)
- [BIP-9: Version Bits](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [Chaincode Labs: Bitcoin Protocol Development Curriculum](https://chaincode.com/)
