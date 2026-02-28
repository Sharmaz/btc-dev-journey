---
sidebar_position: 5
title: Web3 en Bitcoin
description: Una visión general de los intentos de programabilidad en Bitcoin — incluyendo protocolos considerados spam — presentado para tomar conciencia, no como respaldo.
---

# Web3 en Bitcoin

:::danger No Recomendado
Protocolos como Ordinals, BRC-20, Runes y Stamps insertan datos arbitrarios en el espacio de bloques de Bitcoin. Esto es ampliamente considerado **spam**: infla la blockchain, eleva las comisiones para todos y socava el propósito de Bitcoin como dinero sólido y resistente a la censura. El estándar Bitcoin es claro — Bitcoin es dinero, no una capa de datos de propósito general.

Esta página se incluye únicamente para **tomar conciencia**. Conocer estos protocolos no significa respaldarlos.
:::

Bitcoin está diseñado como un sistema monetario — una forma descentralizada y resistente a la censura de dinero sólido. Algunos desarrolladores han construido capas de programabilidad sobre Bitcoin, desde protocolos legítimos de contratos off-chain (DLCs, RGB) que respetan el diseño de Bitcoin, hasta esquemas de inscripción de datos (Ordinals, BRC-20) que abusan del espacio de bloques y son rechazados por una parte significativa de la comunidad Bitcoin.

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

## Ordinals, Inscriptions y BRC-20

:::warning Spam — No Recomendado
Ordinals, BRC-20, Runes y Stamps explotan el witness data de Bitcoin para insertar contenido arbitrario (imágenes, texto, datos de tokens) on-chain. Esto eleva las comisiones de transacción, infla el conjunto UTXO y desplaza transacciones financieras legítimas. No tienen ningún propósito monetario y son ampliamente considerados un ataque al espacio de bloques de Bitcoin.
:::

- **Teoría ordinal** — Asigna números de serie a satoshis individuales para simular propiedad estilo NFT
- **Inscriptions** — Incrusta datos arbitrarios (imágenes, texto, código) en witness data
- **BRC-20** — Un experimento de token fungible construido sobre inscriptions
- **Runes** — Un protocolo de tokens más reciente que también usa el espacio de bloques de Bitcoin para datos no monetarios

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
