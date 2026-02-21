---
sidebar_position: 5
title: Go
description: Construyendo aplicaciones Bitcoin con Go - btcd, btcutil y el ecosistema Bitcoin en Go
---

# Go

Go es ampliamente utilizado en infraestructura Bitcoin — especialmente para implementaciones alternativas de nodos, nodos Lightning (LND) y servicios backend. Su simplicidad, modelo de concurrencia robusto y compilación rápida lo hacen ideal para servicios de red.

## btcd / btcutil

[btcd](https://github.com/btcsuite/btcd) es una implementación alternativa de nodo completo escrita en Go. Incluso si no ejecutas btcd, sus librerías son excelentes para construir aplicaciones Bitcoin.

```bash
go get github.com/btcsuite/btcd
go get github.com/btcsuite/btcutil
```

### Generar un Par de Claves y Dirección

```go
package main

import (
    "fmt"
    "github.com/btcsuite/btcd/btcec/v2"
    "github.com/btcsuite/btcd/btcutil"
    "github.com/btcsuite/btcd/chaincfg"
)

func main() {
    // Generate a new private key
    privKey, err := btcec.NewPrivateKey()
    if err != nil {
        panic(err)
    }

    // Get the public key
    pubKey := privKey.PubKey()

    // Create a P2WPKH address (native SegWit)
    witnessProg := btcutil.Hash160(pubKey.SerializeCompressed())
    address, err := btcutil.NewAddressWitnessPubKeyHash(
        witnessProg, &chaincfg.RegressionNetParams,
    )
    if err != nil {
        panic(err)
    }

    fmt.Printf("Address: %s\n", address.EncodeAddress())

    // WIF-encode the private key
    wif, _ := btcutil.NewWIF(privKey, &chaincfg.RegressionNetParams, true)
    fmt.Printf("WIF: %s\n", wif.String())
}
```

### Conectar a Bitcoin Core vía RPC

```go
package main

import (
    "fmt"
    "github.com/btcsuite/btcd/rpcclient"
)

func main() {
    // Connect to bitcoind
    connCfg := &rpcclient.ConnConfig{
        Host:         "localhost:18443",
        User:         "rpcuser",
        Pass:         "rpcpassword",
        HTTPPostMode: true,
        DisableTLS:   true,
    }

    client, err := rpcclient.New(connCfg, nil)
    if err != nil {
        panic(err)
    }
    defer client.Shutdown()

    // Get blockchain info
    info, err := client.GetBlockChainInfo()
    if err != nil {
        panic(err)
    }
    fmt.Printf("Chain: %s, Blocks: %d\n", info.Chain, info.Blocks)

    // Get best block hash
    hash, _ := client.GetBestBlockHash()
    fmt.Printf("Best block: %s\n", hash.String())
}
```

## LND (Lightning Network Daemon)

[LND](https://github.com/lightningnetwork/lnd) es la implementación más popular de Lightning Network, escrita en Go. Expone una API gRPC para construir aplicaciones Lightning:

```go
// LND gRPC client example
import "github.com/lightningnetwork/lnd/lnrpc"

// Create an invoice
invoice, err := client.AddInvoice(ctx, &lnrpc.Invoice{
    Value: 1000, // satoshis
    Memo:  "Test payment",
})

// Pay an invoice
payment, err := client.SendPaymentSync(ctx, &lnrpc.SendRequest{
    PaymentRequest: "lnbc...",
})
```

## Ecosistema Bitcoin en Go

| Paquete | Propósito |
|---------|-----------|
| `btcd` | Implementación de nodo completo |
| `btcutil` | Codificación de direcciones, WIF, montos |
| `btcec` | Operaciones de curva elíptica (secp256k1) |
| `btcwallet` | Implementación completa de wallet |
| `rpcclient` | Cliente RPC de Bitcoin Core |
| `lnd` | Nodo Lightning Network |
| `neutrino` | Cliente ligero (BIP-157/158) |

## Lectura Recomendada

- [btcd GitHub](https://github.com/btcsuite/btcd)
- [LND Developer Guide](https://docs.lightning.engineering/)
- [Building on LND](https://docs.lightning.engineering/lapps/guides)
