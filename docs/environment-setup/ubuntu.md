---
sidebar_position: 1
---

# Ubuntu

## Bitcoin Core

### Dependencias

Vamos a instalar `Python 3.12.3`..
:::warning
Las versiones superiores no me funcionaron. Me causaron errores mas adelante con Lightning Network.
:::

```bash title="Dependencias de python"
sudo apt-get update
sudo apt-get install -y \
  jq autoconf automake build-essential git libtool libsqlite3-dev libffi-dev \
  python3 python3-pip net-tools zlib1g-dev libsodium-dev gettext
pip3 install --upgrade pip
pip3 install --user poetry
```

### Instalacion de Bitcoin Core

Para instalar `Bitcoin Core` lo mas sencillo es usando snap.
:::info
Tambien existe la opcion de compilar bitcoin core desde el codigo fuente.
:::

```bash title="Bitcoin core"
sudo apt-get install snapd
sudo snap install bitcoin-core
# Se agrega un link simbólico debido a que snap hace cosas raras cuando maneja binarios.
sudo ln -s /snap/bitcoin-core/current/bin/bitcoin{d,-cli} /usr/local/bin/
```

Aqui podemos abrir dos ventanas o tabs de terminal:
- En la primera vamos a ejecutar `bitcoind` el cual va a correr el nodo de bitcoin y va sincronizar el blockchain que son mas de medio terabyte.
```bash
bitcoind
```

- En la segunda `bitcoin-cli` donde nos va a mostrar la info del nodo.
```bash
bitcoin-cli getblockchaininfo
```
Si todo sale bien deberiamos ver algo como esto:

```bash title="bitcoin-cli output"
{
  "chain": "main",
  "blocks": 1,
  "headers": 1,
  "bestblockhash": "0000000000000000000000000000000000000000000000000000000000000000",
  "difficulty": 1,
  "mediantime": 0,
  "verificationprogress": 1,
  "initialblockdownload": true,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000000000",
  "size_on_disk": 0,
  "pruned": true,
  "pruneheight": 0,
  "automatic_pruning": true,
  "prune_target_size": 0,
  "softforks": [],
  "warnings": ""
}
```

Este es el primer paso, antes que nada hay que regresarnos a donde se esta ejecutando `bitcoind` cancelar su ejecución con `ctrl+c`.

:::warning
Dejar corriendo `bitcoind` podria tardar muchas horas o incluso dias en sincronizar el todo el blockchain.
:::

Sencillo no? ahora vamos con la Lightning Network.

## Lightning

Descargamos el repositorio:

```bash
git clone https://github.com/ElementsProject/lightning.git
cd lightning
```

Compilamos e instalamos lightning:

```bash
./configure --disable-rust
make -j15
sudo make install
```

:::info
En make -j15 estamos indicando que queremos usar 15 cores para compilar el software.
Tambien es posible sustituir por `make -j$(($(nproc)-1))` para usar los cores de nuestra pc dejando uno libre.
:::

Corremos la testnet de lighning (en realidad regtest, pero eso lo explicaré más adelante):

```bash
. contrib/startup_regtest.sh
```

El comando anterior es un script que va a correr `bitcoind`, `bitcion-cli`, `lightningd` y `lightning-cli`.
Y nos va a dar la siguiente salida con unos comandos básicos.

```bash title=". contrib/startup_regtest.sh Output"
Useful commands:
  start_ln 3: start three nodes, l1, l2, l3
  connect 1 2: connect l1 and l2
  fund_nodes: connect all nodes with channels, in a row
  stop_ln: shutdown
  destroy_ln: remove ln directories
```

El comando `start_ln` creará un par de nodos en la red lightning (l1 y l2).
```bash
start_ln
```
Tambien nos dará una lista de comandos para actuar en cada nodo:
```bash title="start_ln output"
Bitcoin Core starting
awaiting bitcoind...
Loading "default" bitcoind wallet.
[1] 10459
[2] 10463
Commands:
        l1-cli, l1-log,
        l2-cli, l2-log,
        bt-cli, stop_ln, fund_nodes
timed out parsing log /tmp/l1/log
```
Vamos a obtener la información de uno de los nodos (l1).

```bash
l1-cli getinfo
```
Esta data nos la devuelve en formato JSON
```bash title="getinfo output"
{
   "id": "02d44e9a844e84ab76d412601c8e648ce039b8266874ddfe5b854fb6723096ea06",
   "alias": "SLICKERROUTE-v24.11-91-g9e29bde",
   "color": "02d44e",
   "num_peers": 0,
   "num_pending_channels": 0,
   "num_active_channels": 0,
   "num_inactive_channels": 0,
   "address": [],
   "binding": [
      {
         "type": "ipv4",
         "address": "127.0.0.1",
         "port": 7171
      }
   ],
   "version": "v24.11-91-g9e29bde",
   "blockheight": 109,
   "network": "regtest",
   "fees_collected_msat": 0,
   "lightning-dir": "/tmp/l1/regtest",
   "our_features": {
      "init": "8008a0882a8a59a1",
      "node": "8088a0882a8a59a1",
      "channel": "",
      "invoice": "02000002024100"
   }
}
```

Ahora vamos a agregarle fondos (unos cuantos satoshis) a los nodos:

```bash
fund_nodes
```
```bash title="fund_nodes output"
bitcoind balance: 447.99999718
Waiting for lightning node funds... found.
Funding channel <-> node 1 to node 2. Waiting for confirmation... done.
```

Podemos ver los fondos del nodo `l1`:

```bash
l1-cli listfunds
```
Toda información obtenida nos vendrá en formato JSON.
```bash title="listfunds output"
{
   "outputs": [
      {
         "txid": "3383b42043c96d072f1a22f11ea1e4039bb93176f13d397178a6eb13cb7113e2",
         "output": 1,
         "amount_msat": 98999834000,
         "scriptpubkey": "51200e98fba542bc6fda8cb83ae930cebd6f6957f3cb5d2eb49e47a6d0f612473efa",
         "address": "bcrt1pp6v0hf2zh3ha4r9c8t5npn4ada540u7tt5htf8j85mg0vyj88maq9zy237",
         "status": "confirmed",
         "blockheight": 111,
         "reserved": false
      }
   ],
   "channels": [
      {
         "peer_id": "02fed4dea6a6bc7dcc8d7bb4c88aa452fc4cd3878949851b4c0c23e71eebfc751f",
         "connected": true,
         "state": "CHANNELD_NORMAL",
         "channel_id": "8274abbaeb547055d57f07337965eadea778c7e0344dd6d1b55257746cd85288",
         "short_channel_id": "111x1x0",
         "our_amount_msat": 1000000000,
         "amount_msat": 1100000000,
         "funding_txid": "3383b42043c96d072f1a22f11ea1e4039bb93176f13d397178a6eb13cb7113e2",
         "funding_output": 0
      }
   ]
}
```

En hora buena!! con esto ya podemos construir aplicaciones sobre Bitcoin y Lightning Network.
...bueno, mas o menos.
