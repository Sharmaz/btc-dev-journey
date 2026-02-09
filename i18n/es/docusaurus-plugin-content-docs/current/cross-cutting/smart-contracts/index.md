---
sidebar_position: 4
title: Contratos Inteligentes
description: Capacidades de contratos inteligentes en Bitcoin - Script, Miniscript, Tapscript, DLCs y covenants
---

# Contratos Inteligentes en Bitcoin

Bitcoin siempre ha tenido contratos inteligentes — simplemente son diferentes de lo que podrías esperar. El enfoque de Bitcoin prioriza seguridad, predictibilidad y minimalismo sobre expresividad. Cada transacción de Bitcoin es un contrato inteligente.

Para temas relacionados, consulta [Web3 en Bitcoin](/docs/tracks/application-developer/web3-bitcoin) y [Protocolos Avanzados](/docs/tracks/application-developer/advanced-protocols).

## Bitcoin Script

El lenguaje de scripting nativo de Bitcoin es **basado en pila e intencionalmente no-Turing-completo**. Esto es una característica, no una limitación:

- **Ejecución predecible** — Sin bucles infinitos, uso de recursos acotado
- **Verificación simple** — Fácil razonar sobre qué hace un script
- **Seguridad** — Menor superficie de ataque que VMs de propósito general

### Lo Que Puedes Hacer Hoy

| Capacidad | Mecanismo | Ejemplo de Uso |
|-----------|-----------|----------------|
| **Firma multi-parte** | OP_CHECKMULTISIG, MuSig2 | Wallets compartidos, escrow |
| **Pagos con timelock** | OP_CLTV, OP_CSV | Herencia, liberaciones programadas |
| **Pagos con hash-lock** | OP_HASH160 + OP_EQUAL | HTLCs (Lightning, atomic swaps) |
| **Ejecución condicional** | OP_IF / OP_ELSE | Múltiples rutas de gasto |
| **Verificación de firma** | OP_CHECKSIG, OP_CHECKSIGADD | Autorización |

## Miniscript

[Miniscript](https://bitcoin.sipa.be/miniscript/) es un subconjunto estructurado de Bitcoin Script que permite **políticas de gasto componibles**:

```
Política: thresh(2, pk(Alice), pk(Bob), pk(Carol))
Resultado: multisig 2-de-3

Política: or(pk(Alice), and(pk(Bob), after(144)))
Resultado: Alice puede gastar en cualquier momento, O Bob puede gastar después de 144 bloques
```

### Por Qué Importa Miniscript

- **Composabilidad** — Combinar condiciones con AND, OR, THRESHOLD
- **Análisis** — Determinar automáticamente tamaño de witness, condiciones de gasto
- **Compilación** — Política → Bitcoin Script optimizado automáticamente
- **Interoperabilidad** — Los wallets pueden entender políticas de gasto arbitrarias

Miniscript está integrado en el wallet de Bitcoin Core y es la base de los wallets basados en descriptores.

## Taproot y Tapscript

Taproot (BIP-341/342) expandió significativamente las capacidades de contratos inteligentes de Bitcoin:

### MAST (Merkelized Alternative Script Trees)

Múltiples condiciones de gasto organizadas en un árbol de Merkle. Solo la condición usada se revela on-chain:

```
                    [Taproot Key]
                    /           \
            [Rama A]         [Rama B]
            /        \           |
    [multisig 2-de-3] [Timelock] [Recuperación de emergencia]
```

- **Privacidad** — Las ramas no usadas nunca se revelan
- **Eficiencia** — Solo la rama ejecutada va on-chain
- **Key path spending** — El caso más común (gasto simple por clave) se ve como cualquier otro pago Taproot

### Tapscript

Tapscript es la versión de script usada dentro de Taproot, con mejoras:

- `OP_CHECKSIGADD` reemplaza a `OP_CHECKMULTISIG` (más eficiente)
- La validación de firmas usa Schnorr
- Opcodes futuros pueden agregarse vía `OP_SUCCESSx`

## Discreet Log Contracts (DLCs)

Los DLCs permiten pagos condicionales basados en oráculos sin revelar el contrato on-chain:

```
1. Alice y Bob acuerdan un contrato (ej: precio de BTC > $100k en fecha X)
2. Bloquean fondos en un multisig 2-de-2
3. El oráculo publica una attestation firmada del resultado
4. El ganador usa la attestation para reclamar los fondos
```

El oráculo nunca se entera del contrato. Se pueden usar múltiples oráculos para minimización de confianza.

**Librerías:** [rust-dlc](https://github.com/p2pderivatives/rust-dlc), [dlcdevkit](https://github.com/bennyhodl/dlcdevkit)

## Covenants (Propuestos)

Los covenants restringirían **cómo** un UTXO puede gastarse, no solo **quién** puede gastarlo. Son el área más activa de investigación de contratos inteligentes en Bitcoin.

### OP_CHECKTEMPLATEVERIFY (CTV) — BIP-119

Compromete la transacción exacta que gastará una salida:

**Casos de uso:**
- **Vaults** — Retrasos de retiro con recuperación de emergencia
- **Control de congestión** — Pagos por lotes que se expanden después
- **Payment pools** — UTXOs compartidos para múltiples usuarios

### OP_CAT

Re-habilita el opcode de concatenación (deshabilitado por Satoshi en 2010). Combinado con firmas Schnorr, permite lógica de contratos sorprendentemente potente:

- Construcciones de vaults
- Introspección arbitraria de transacciones
- Verificación de pruebas de Merkle en script

### BitVM

Un modelo de **computación optimista** para Bitcoin — programas arbitrarios pueden verificarse en Bitcoin sin un soft fork:

- El prover compromete el resultado de la computación
- El verificador puede disputar vía on-chain
- Solo los resultados incorrectos requieren resolución on-chain

Aún en investigación/desarrollo temprano, pero potencialmente transformativo.

## La Filosofía de Contratos Inteligentes de Bitcoin

El enfoque de Bitcoin es fundamentalmente diferente al de Ethereum:

| Bitcoin | Ethereum |
|---------|----------|
| Verificar, no computar | Computar on-chain |
| No-Turing-completo | Turing-completo |
| Modelo UTXO | Modelo de cuentas |
| Ejecución off-chain preferida | Ejecución on-chain estándar |
| Mínimo, seguro | Expresivo, mayor superficie de ataque |

La filosofía de Bitcoin: **mover la complejidad off-chain, usar la blockchain solo para liquidación y resolución de disputas.**

## Lectura Recomendada

- [Miniscript (Pieter Wuille)](https://bitcoin.sipa.be/miniscript/)
- [BIP-341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [BIP-119: OP_CTV](https://github.com/bitcoin/bips/blob/master/bip-0119.mediawiki)
- [BitVM Whitepaper](https://bitvm.org/bitvm.pdf)
- [DLC Specification](https://github.com/discreetlogcontracts/dlcspecs)
