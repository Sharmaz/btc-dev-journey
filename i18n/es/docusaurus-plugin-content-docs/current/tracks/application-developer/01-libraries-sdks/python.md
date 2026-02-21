---
sidebar_position: 3
title: Python
description: Construyendo aplicaciones Bitcoin con librerías Python
---

# Python

Python es excelente para prototipado, scripting y construcción de servicios backend. Su legibilidad lo hace ideal para aprender conceptos de Bitcoin.

## python-bitcoinlib

[python-bitcoinlib](https://github.com/petertodd/python-bitcoinlib) proporciona acceso de bajo nivel a estructuras de datos Bitcoin y la interfaz RPC.

### Instalación

```bash
pip install python-bitcoinlib
```

### Conectar a Bitcoin Core vía RPC

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

### Crear una Transacción

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

### Decodificar y Analizar Transacciones

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

## BDK para Python

BDK proporciona bindings Python para desarrollo de wallets de grado producción:

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

## Herramientas Python Útiles

| Paquete | Propósito |
|---------|-----------|
| `python-bitcoinlib` | Estructuras de datos core Bitcoin y RPC |
| `bdkpython` | Desarrollo de wallets en producción |
| `requests` | Llamadas HTTP a APIs Esplora/Electrum |
| `hashlib` | Hashing SHA-256, RIPEMD-160 |
| `ecdsa` | Operaciones de curva elíptica |

## Lectura Recomendada

- [python-bitcoinlib GitHub](https://github.com/petertodd/python-bitcoinlib)
- [BDK Python Docs](https://bitcoindevkit.org/)
- [Learning Bitcoin from the Command Line - Python](https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line/blob/master/18_3_Accessing_Bitcoind_with_Python.md)
