---
sidebar_position: 3
title: Python
description: Building Bitcoin applications with Python libraries
---

# Python

Python is excellent for prototyping, scripting, and building backend services. Its readability makes it ideal for learning Bitcoin concepts.

## python-bitcoinlib

[python-bitcoinlib](https://github.com/petertodd/python-bitcoinlib) provides low-level access to Bitcoin data structures and the RPC interface.

### Installation

```bash
pip install python-bitcoinlib
```

### Connect to Bitcoin Core via RPC

```python
from bitcoin.rpc import RawProxy

# Connect to a running bitcoind instance
rpc = RawProxy(
    service_url="http://rpcuser:rpcpassword@127.0.0.1:18443"  # regtest
)

# Get blockchain info
info = rpc.getblockchaininfo()
print(f"Chain: {info['chain']}")
print(f"Blocks: {info['blocks']}")

# Get a new address
address = rpc.getnewaddress()
print(f"New address: {address}")

# List unspent outputs
utxos = rpc.listunspent()
for utxo in utxos:
    print(f"  {utxo['txid'][:16]}... {utxo['amount']} BTC")
```

### Create a Transaction

```python
from bitcoin import SelectParams
from bitcoin.core import (
    CMutableTransaction, CMutableTxIn, CMutableTxOut,
    COutPoint, lx, COIN
)
from bitcoin.core.script import (
    CScript, OP_DUP, OP_HASH160, OP_EQUALVERIFY, OP_CHECKSIG
)
from bitcoin.wallet import CBitcoinAddress

SelectParams('regtest')

# Create a simple P2PKH transaction
txin = CMutableTxIn(COutPoint(lx('previous_txid'), 0))
txout = CMutableTxOut(
    int(0.5 * COIN),
    CBitcoinAddress('recipient_address').to_scriptPubKey()
)

tx = CMutableTransaction([txin], [txout])
print(f"Unsigned tx: {tx.serialize().hex()}")
```

### Decode and Analyze Transactions

```python
from bitcoin.rpc import RawProxy

rpc = RawProxy(service_url="http://rpcuser:rpcpassword@127.0.0.1:18443")

# Get a transaction and decode it
txid = "your_txid_here"
raw_tx = rpc.getrawtransaction(txid)
decoded = rpc.decoderawtransaction(raw_tx)

print(f"Version: {decoded['version']}")
print(f"Inputs: {len(decoded['vin'])}")
print(f"Outputs: {len(decoded['vout'])}")

for i, vout in enumerate(decoded['vout']):
    print(f"  Output {i}: {vout['value']} BTC → {vout['scriptPubKey']['type']}")
```

## BDK for Python

BDK provides Python bindings for production-grade wallet development:

```bash
pip install bdkpython
```

```python
import bdkpython as bdk

# Create a descriptor wallet
descriptor = bdk.Descriptor(
    "wpkh(tprv8ZgxMBicQKsPd7Uf69XL1XwhmjXhN7PfGPrzHVz7kAw.../*)",
    bdk.Network.REGTEST,
)

wallet = bdk.Wallet(
    descriptor=descriptor,
    change_descriptor=None,
    network=bdk.Network.REGTEST,
    database_config=bdk.DatabaseConfig.MEMORY(),
)

# Get a new address
address = wallet.get_address(bdk.AddressIndex.NEW)
print(f"Address: {address.address}")
```

## Useful Python Tools

| Package | Purpose |
|---------|---------|
| `python-bitcoinlib` | Core Bitcoin data structures and RPC |
| `bdkpython` | Production wallet development |
| `requests` | HTTP calls to Esplora/Electrum APIs |
| `hashlib` | SHA-256, RIPEMD-160 hashing |
| `ecdsa` | Elliptic curve operations |

## Recommended Reading

- [python-bitcoinlib GitHub](https://github.com/petertodd/python-bitcoinlib)
- [BDK Python Docs](https://bitcoindevkit.org/)
- [Learning Bitcoin from the Command Line - Python](https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line/blob/master/18_3_Accessing_Bitcoind_with_Python.md)
