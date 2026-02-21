---
sidebar_position: 3
title: Procesamiento de Pagos
description: Construyendo flujos de pago, sistemas de facturación e integración con Lightning Network
---

# Procesamiento de Pagos

Aceptar pagos en Bitcoin implica más que solo generar una dirección. Necesitas manejar confirmaciones, estimación de comisiones, detección de pagos, y cada vez más, integración con Lightning Network para pagos instantáneos.

## Pagos On-Chain

### Flujo de Pago

```mermaid
graph LR
    A[Generar Dirección] --> B[Mostrar al Cliente]
    B --> C[Monitorear Mempool]
    C --> D[Detectar Pago]
    D --> E[Esperar Confirmaciones]
    E --> F[Marcar como Pagado]
```

### Consideraciones Clave

| Factor | Recomendación |
|--------|---------------|
| **Reutilización de direcciones** | Nunca reutilices direcciones — genera una dirección única por factura |
| **Confirmaciones** | 1 confirmación para montos pequeños, 3-6 para montos mayores |
| **Estimación de comisiones** | Usa `estimatesmartfee` o estimación basada en mempool |
| **Detección de pagos** | Vigila el mempool para 0-conf, luego rastrea confirmaciones |
| **Timeouts** | Establece expiración de factura (ej: 15-60 minutos) |
| **Sobrepago/pago insuficiente** | Define rangos de tolerancia |

### Monitoreo de Pagos

```bash
# Using bitcoin-cli
bitcoin-cli listtransactions "*" 10  # Recent transactions

# Watch a specific address (requires addressindex or wallet import)
bitcoin-cli importaddress "bc1q..." "invoice-001" false
```

Para producción, usa un backend dedicado:
- **Electrum server** — Consultas eficientes basadas en direcciones
- **Esplora API** — API REST para búsquedas de direcciones/transacciones
- **Bitcoin Core wallet** — RPC directo, más privado

## Pagos Lightning

Lightning permite pagos instantáneos y de baja comisión — ideal para punto de venta y transacciones pequeñas.

### Facturas BOLT-11

Los pagos Lightning usan facturas BOLT-11:

```
lnbc10u1pj...  ← encoded invoice

Decoded:
  Amount: 10,000 sats
  Description: "Coffee"
  Payment hash: abc123...
  Expiry: 3600 seconds
  Node pubkey: 02def...
```

### Flujo de Pago (Lightning)

```mermaid
graph LR
    A[Crear Factura] --> B[Mostrar Código QR]
    B --> C[Cliente Paga]
    C --> D[Pago se Liquida ~1s]
    D --> E[Webhook/Callback]
```

### Opciones de Integración Lightning

| Enfoque | Complejidad | Control |
|---------|------------|---------|
| **BTCPay Server** | Baja | Auto-hospedado, control total |
| **LND/CLN API** | Media | Acceso directo al nodo |
| **LDK** | Alta | Implementación personalizada |
| **API Hospedada** (Strike, etc.) | Baja | Dependencia de terceros |

## BTCPay Server

[BTCPay Server](https://btcpayserver.org/) es el procesador de pagos open-source más popular:

- Auto-hospedado (sin terceros)
- Soporte on-chain + Lightning
- Integraciones con Shopify, WooCommerce y otros
- Facturación, punto de venta y crowdfunding integrados
- API para integraciones personalizadas

```bash
# Deploy with Docker
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
./btcpay-setup.sh
```

## Códigos QR Unificados (BIP-21)

[BIP-21](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) define un esquema URI que puede incluir opciones tanto on-chain como Lightning:

```
bitcoin:bc1qaddress?amount=0.001&lightning=lnbc1000...
```

Esto permite al pagador elegir on-chain o Lightning desde un único código QR.

## Lectura Recomendada

- [BTCPay Server Documentation](https://docs.btcpayserver.org/)
- [BIP-21: URI Scheme](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki)
- [BOLT-11: Invoice Protocol](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md)
- [Bitcoin Design Guide: Payments](https://bitcoin.design/guide/how-it-works/payments/)
