---
sidebar_position: 1
---

# Ubuntu

## Bitcoin Core

### Dependencias

Vamos a instalar `Python 3.12.3`.
:::warning
Las versiones superiores no me funcionaron. Me causaron errores mas adelante con Lightning Network.
:::

Suponiendo que tengas instalado `python`, `build-essential` y `git` debes instalar las siguientes dependencias:

```bash title="dependencies"
sudo apt-get update
sudo apt-get install -y \
  jq autoconf automake libtool libsqlite3-dev libffi-dev \
  net-tools zlib1g-dev libsodium-dev gettext
```

### Instalación de Bitcoin Core

Para instalar `Bitcoin Core` lo más sencillo es usando snap.

:::info
Tambien existe la opción de compilar Bitcoin Core desde el código fuente.
:::

```bash title="Bitcoin core"
sudo snap install bitcoin-core
# Creamos un link simbólico de bitcoind y bitcoin-cli desde el snap.
sudo ln -s /snap/bitcoin-core/current/bin/bitcoin{d,-cli} /usr/local/bin/
```

Este nodo de bitcoin como lo vamos a usar para desarrollar aplicaciones no nos vamos a traer toda la blockchain (casi 1TB) vamos a configurar un pruned node o nodo podado.

Vamos a crear el archivo de configuracion de nuestro nodo:
```bash
nano ~/.bitcoin/bitcoin.conf
```

Dentro vamos a agregar la siguiente configuracion:
```bash title="bitcoin.conf"
regtest=1
txindex=0
prune=550
fallbackfee=0.0002

[regtest]
rcpport=18443
rpcuser=foo
rpcpassword=bar
```

### Ejecución de Bitcoin para Desarrollo

Vamos a abrir dos ventanas o pestañas de terminal:

- En la primera terminal ejecutamos `bitcoind` el cual va a correr el nodo de bitcoin y va sincronizar el blockchain como es un pruned node solo traera una parte minima de la blockchain.

```bash
bitcoind
```

- En la segunda terminal ejecutamos `bitcoin-cli` donde nos va a mostrar la info del nodo.

```bash
bitcoin-cli getblockchaininfo
```

Si todo sale bien deberiamos ver algo como esto:

```JSON title="getblockchaininfo salida"
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

:::info
Toda petición realizada con `bitcoin-cli` nos responderá en formato JSON.
:::

Vamos a la terminal donde se esta corriendo `bitcoind` y cancelamos su ejecución con `ctrl + c`.

:::warning
Dejar corriendo `bitcoind` podria tardar muchas horas o incluso días en sincronizar el todo el blockchain.
:::

:::note
Si en tu caso la aplicación que quieres desarrollar es solamente para Bitcoin, sin tocar la Lightning Network, puedes saltarte el resto de la guía. Y tus siguientes pasos seran terminar de sincronizar la blockchain con `bitcoind` y luego seguir usando `bitcoin-cli`.
:::

## Instalación de Lightning

Vamos a descargar el repositorio:

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
En make -j15 estamos indicando que queremos usar 15 cores para compilar el software. Si no sabemos el numero de cores de nuestra pc podemos sustituirlo por `make -j$(($(nproc)-1))` para usar los cores de nuestra pc dejando uno libre.
:::

Corremos la testnet de lighning (en realidad regtest, pero eso lo explicaré en otra guía):

```bash
. contrib/startup_regtest.sh
```

El comando anterior es un script que va a correr `bitcoind`, `bitcion-cli`, `lightningd` y `lightning-cli`. Y nos va a dar la siguiente salida con unos comandos básicos.

```bash title=". contrib/startup_regtest.sh salida"
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

Tambien nos dará una lista de comandos para interactuar con cada nodo:

```bash title="start_ln salida"
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

:::info
Toda petición realizada en lightning nos responderá en formato JSON.
:::

```JSON title="getinfo salida"
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

Genial!!

Obtenemos la información de los fondos del nodo `l1`:

```bash
l1-cli listfunds
```

La propiedad `our_amount_msat` es el monto en satoshis.

```JSON title="listfunds salida"
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

:::note
¡Felicidades!! Ahora podemos construir aplicaciones sobre Bitcoin y Lightning Network.
...bueno, mas o menos. Por lo menos podemos comenzar a experimentar con ello.
:::
