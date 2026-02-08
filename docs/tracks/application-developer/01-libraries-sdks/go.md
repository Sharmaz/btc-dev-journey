---
sidebar_position: 5
title: Go
description: Building Bitcoin applications with Go - btcd, btcutil, and the Go Bitcoin ecosystem
---

# Go

Go is widely used in Bitcoin infrastructure — especially for alternative node implementations, Lightning nodes (LND), and backend services. Its simplicity, strong concurrency model, and fast compilation make it well-suited for network services.

## btcd / btcutil

[btcd](https://github.com/btcsuite/btcd) is an alternative full node implementation written in Go. Even if you don't run btcd, its libraries are excellent for building Bitcoin applications.

```bash
go get github.com/btcsuite/btcd
go get github.com/btcsuite/btcutil
```

### Generate a Key Pair and Address

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

### Connect to Bitcoin Core via RPC

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

[LND](https://github.com/lightningnetwork/lnd) is the most popular Lightning Network implementation, written in Go. It exposes a gRPC API for building Lightning-powered applications:

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

## Go Bitcoin Ecosystem

| Package | Purpose |
|---------|---------|
| `btcd` | Full node implementation |
| `btcutil` | Address encoding, WIF, amounts |
| `btcec` | Elliptic curve operations (secp256k1) |
| `btcwallet` | Full wallet implementation |
| `rpcclient` | Bitcoin Core RPC client |
| `lnd` | Lightning Network node |
| `neutrino` | Light client (BIP-157/158) |

## Recommended Reading

- [btcd GitHub](https://github.com/btcsuite/btcd)
- [LND Developer Guide](https://docs.lightning.engineering/)
- [Building on LND](https://docs.lightning.engineering/lapps/guides)
