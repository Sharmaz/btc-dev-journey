---
sidebar_position: 7
title: Protocolos en Bitcoin
description: Lightning Network, sidechains, Nostr y otros protocolos construidos sobre Bitcoin
---

# Protocolos en Bitcoin

La capa base de Bitcoin prioriza seguridad y descentralización. Capas superiores y protocolos adyacentes agregan velocidad, programabilidad y nuevas capacidades mientras se anclan a la seguridad de Bitcoin.

## Lightning Network

Lightning Network es la solución principal de Layer 2 de Bitcoin para pagos instantáneos y de baja comisión.

### Cómo Funciona

1. Dos partes abren un **canal de pago** bloqueando BTC en un multisig 2-de-2 on-chain
2. Intercambian transacciones firmadas off-chain para actualizar el saldo del canal
3. Los pagos se **rutean** a través de una red de canales usando HTLCs
4. Cualquier parte puede cerrar el canal en cualquier momento, liquidando el saldo final on-chain

### Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Canal de pago** | Hoja de balance entre dos partes asegurada por Bitcoin |
| **HTLC** | Hash Time-Locked Contract para ruteo de pagos |
| **Factura** | Solicitud de pago codificada en BOLT-11 |
| **Ruteo** | Encontrar un camino a través del grafo de canales |
| **Capacidad** | Monto máximo que un canal puede rutear |
| **Liquidez** | Saldo disponible en cada lado de un canal |

### Implementaciones

| Implementación | Lenguaje | Enfoque |
|---------------|---------|---------|
| **LND** | Go | Más popular, rico en funcionalidades |
| **Core Lightning (CLN)** | C | Modular, basado en plugins |
| **Eclair** | Scala | Amigable para móvil (Phoenix wallet) |
| **LDK** | Rust | Librería para implementaciones personalizadas |

### Construyendo sobre Lightning

```bash
# Create an invoice (LND)
lncli addinvoice --amt 1000 --memo "Test payment"

# Pay an invoice
lncli payinvoice <bolt11_invoice>

# Check channel balances
lncli listchannels
```

Para aplicaciones personalizadas, usa las APIs gRPC/REST o construye con LDK.

## Sidechains

Las sidechains son blockchains separadas vinculadas a Bitcoin, habilitando funcionalidades que Bitcoin no soporta nativamente.

### Liquid Network

[Liquid](https://liquid.net/) es una sidechain federada de Blockstream:

- **Confidential Transactions** — Montos y tipos de activos están ocultos
- **Issued Assets** — Crear tokens en la cadena Liquid
- **Bloques más rápidos** — Tiempo de bloque de 1 minuto
- **Federación** — Gestionada por un conjunto de functionaries

### Fedimint

[Fedimint](https://fedimint.org/) es un protocolo de custodia federada usando e-cash Chaumiano:

- **Custodia comunitaria** — Federación de confianza custodia Bitcoin
- **Privacidad** — Los tokens e-cash no son vinculables
- **Integración Lightning** — Gateway para pagos Lightning
- **Open source** — Construye tu propia federación

## Nostr

[Nostr](https://nostr.com/) (Notes and Other Stuff Transmitted by Relays) es un protocolo social descentralizado que usa criptografía estilo Bitcoin (claves secp256k1):

- **Identidad** — Tu par de claves Nostr es tu identidad
- **Zaps** — Pagos Lightning integrados en interacciones sociales
- **Descentralizado** — Sin servidor central, los mensajes se retransmiten a través de múltiples servidores

### Integración Nostr + Bitcoin

```
NIP-57 (Zaps): Lightning payments via Nostr
NIP-47 (Nostr Wallet Connect): Control wallets via Nostr
```

## Comparación

| Protocolo | Capa | Velocidad | Modelo de Confianza |
|----------|------|-----------|---------------------|
| **Lightning** | L2 | Instantáneo | Sin confianza (channel partners) |
| **Liquid** | Sidechain | ~1 min | Federado (functionaries) |
| **Fedimint** | L2 custodial | Instantáneo | Federado (guardianes) |
| **Stacks** | L1 (anclado) | ~10 min | Consenso PoX |
| **RGB** | Client-side | Variable | Sin confianza (validación del cliente) |

## Lectura Recomendada

- [Mastering the Lightning Network](https://github.com/lnbook/lnbook) — Guía completa de LN
- [BOLT Specifications](https://github.com/lightning/bolts) — Especificaciones del protocolo Lightning
- [Liquid Developer Docs](https://docs.liquid.net/)
- [Fedimint GitHub](https://github.com/fedimint/fedimint)
- [Nostr Protocol](https://github.com/nostr-protocol/nostr)
