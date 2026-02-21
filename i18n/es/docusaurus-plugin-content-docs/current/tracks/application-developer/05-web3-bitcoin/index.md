---
sidebar_position: 5
title: Web3 en Bitcoin
description: Explorando capacidades de contratos inteligentes en Bitcoin - DLCs, Stacks, RGB y más
---

# Web3 en Bitcoin

Bitcoin a menudo se ve como "solo dinero", pero hay un ecosistema creciente de contratos inteligentes y funcionalidad programable construyéndose sobre él. A diferencia del enfoque de Ethereum, los contratos inteligentes de Bitcoin tienden a enfatizar seguridad, minimalismo y computación off-chain.

## Discreet Log Contracts (DLCs)

Los DLCs permiten pagos condicionales basados en eventos del mundo real (contratos basados en oráculos) sin revelar los detalles del contrato on-chain.

**Cómo funciona:**
1. Dos partes bloquean fondos en un multisig 2-de-2
2. Un oráculo publica una attestation firmada de un resultado
3. La parte ganadora usa la firma del oráculo para reclamar los fondos
4. El oráculo nunca se entera de la existencia del contrato

**Casos de uso:** Apuestas, derivados, seguros, mercados de predicción

**Librerías:**
- [rust-dlc](https://github.com/p2pderivatives/rust-dlc)
- [dlcdevkit](https://github.com/bennyhodl/dlcdevkit)

## Stacks

[Stacks](https://www.stacks.co/) es una blockchain Layer 1 anclada a Bitcoin. Usa consenso "Proof of Transfer" (PoX), donde los mineros de Stacks gastan BTC para minar bloques STX.

**Características clave:**
- **Clarity** — Un lenguaje de contratos inteligentes decidible (no-Turing-completo por diseño)
- **sBTC** — Peg de Bitcoin programable y con confianza minimizada
- **Finalidad de Bitcoin** — Las transacciones de Stacks se liquidan en Bitcoin

```clarity
;; Simple Clarity contract
(define-public (transfer (amount uint) (recipient principal))
  (stx-transfer? amount tx-sender recipient))
```

## Protocolo RGB

[RGB](https://rgb.tech/) permite contratos inteligentes y emisión de tokens en Bitcoin usando validación del lado del cliente:

- **Computación off-chain** — El estado del contrato vive con los usuarios, no on-chain
- **Bitcoin como liquidación** — Solo los compromisos se anclan en Bitcoin
- **Privacidad** — Los detalles del contrato no son visibles en la blockchain
- **Activos** — Emitir tokens fungibles, NFTs y más

## Ordinals e Inscriptions

Ordinals asigna un número de serie a satoshis individuales, habilitando funcionalidad similar a NFTs:

- **Teoría ordinal** — Rastrea sats individuales a través de transacciones
- **Inscriptions** — Insertar datos (imágenes, texto) en witness data
- **BRC-20** — Estándar de tokens fungibles usando inscriptions

Esto es controversial en la comunidad Bitcoin — algunos lo ven como innovación, otros como bloat de la blockchain.

## Otros Enfoques

| Protocolo | Enfoque | Estado |
|----------|---------|--------|
| **Liquid** | Sidechain federada (Blockstream) | Producción |
| **RSK** | Sidechain merge-mined con EVM | Producción |
| **Ark** | Protocolo off-chain de compartir UTXOs | Desarrollo |
| **BitVM** | Computación optimista en Bitcoin | Investigación |

## Lectura Recomendada

- [DLC Specification](https://github.com/discreetlogcontracts/dlcspecs)
- [Stacks Documentation](https://docs.stacks.co/)
- [RGB Documentation](https://rgb.tech/)
- [BitVM Whitepaper](https://bitvm.org/bitvm.pdf)
