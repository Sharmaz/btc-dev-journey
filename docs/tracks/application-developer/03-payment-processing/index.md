---
sidebar_position: 3
title: Payment Processing
description: Building payment flows, invoicing systems, and Lightning Network integration
---

# Payment Processing

Accepting Bitcoin payments involves more than just generating an address. You need to handle confirmations, fee estimation, payment detection, and increasingly, Lightning Network integration for instant payments.

## On-Chain Payments

### Payment Flow

```mermaid
graph LR
    A[Generate Address] --> B[Display to Customer]
    B --> C[Monitor Mempool]
    C --> D[Detect Payment]
    D --> E[Wait for Confirmations]
    E --> F[Mark as Paid]
```

### Key Considerations

| Factor | Recommendation |
|--------|---------------|
| **Address reuse** | Never reuse addresses — generate a unique address per invoice |
| **Confirmations** | 1 confirmation for small amounts, 3-6 for larger amounts |
| **Fee estimation** | Use `estimatesmartfee` or mempool-based estimation |
| **Payment detection** | Watch the mempool for 0-conf, then track confirmations |
| **Timeouts** | Set invoice expiry (e.g., 15-60 minutes) |
| **Overpayment/underpayment** | Define tolerance ranges |

### Monitoring Payments

```bash
# Using bitcoin-cli
bitcoin-cli listtransactions "*" 10  # Recent transactions

# Watch a specific address (requires addressindex or wallet import)
bitcoin-cli importaddress "bc1q..." "invoice-001" false
```

For production, use a dedicated backend:
- **Electrum server** — Efficient address-based queries
- **Esplora API** — REST API for address/transaction lookups
- **Bitcoin Core wallet** — Direct RPC, most private

## Lightning Payments

Lightning enables instant, low-fee payments — ideal for point-of-sale and small transactions.

### BOLT-11 Invoices

Lightning payments use BOLT-11 invoices:

```
lnbc10u1pj...  ← encoded invoice

Decoded:
  Amount: 10,000 sats
  Description: "Coffee"
  Payment hash: abc123...
  Expiry: 3600 seconds
  Node pubkey: 02def...
```

### Payment Flow (Lightning)

```mermaid
graph LR
    A[Create Invoice] --> B[Display QR Code]
    B --> C[Customer Pays]
    C --> D[Payment Settles ~1s]
    D --> E[Webhook/Callback]
```

### Lightning Integration Options

| Approach | Complexity | Control |
|----------|-----------|---------|
| **BTCPay Server** | Low | Self-hosted, full control |
| **LND/CLN API** | Medium | Direct node access |
| **LDK** | High | Custom implementation |
| **Hosted API** (Strike, etc.) | Low | Third-party dependency |

## BTCPay Server

[BTCPay Server](https://btcpayserver.org/) is the most popular open-source payment processor:

- Self-hosted (no third party)
- On-chain + Lightning support
- Shopify, WooCommerce, and other integrations
- Built-in invoicing, point-of-sale, and crowdfunding
- API for custom integrations

```bash
# Deploy with Docker
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
./btcpay-setup.sh
```

## Unified QR Codes (BIP-21)

[BIP-21](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) defines a URI scheme that can include both on-chain and Lightning options:

```
bitcoin:bc1qaddress?amount=0.001&lightning=lnbc1000...
```

This lets the payer choose on-chain or Lightning from a single QR code.

## Recommended Reading

- [BTCPay Server Documentation](https://docs.btcpayserver.org/)
- [BIP-21: URI Scheme](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki)
- [BOLT-11: Invoice Protocol](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md)
- [Bitcoin Design Guide: Payments](https://bitcoin.design/guide/how-it-works/payments/)
