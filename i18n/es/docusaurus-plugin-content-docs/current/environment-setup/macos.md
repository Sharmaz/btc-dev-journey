---
sidebar_position: 2
---
# MacOS

## Bitcoin Core

### Dependencias

Instalar dependencias `Python 3.12.3`, `Homebrew` y `Xcode`.
:::warning
Las versiones superiores de Python no me funcionaron. Me causaron errores mas adelante con Lightning Network.
:::

Otras dependencias: 

```bash
brew install autoconf automake libtool gnu-sed gettext libsodium protobuf
export PATH="/usr/local/opt:$PATH"
```

Dependiencias de Python:

```bash
pip install --upgrade pip
pip install poetry
pip install --user pyln-client websockets
```

Si no tenemos SQLite hay que instalarlo:

```bash
brew install sqlite
export LDFLAGS="-L/usr/local/opt/sqlite/lib"
export CPPFLAGS="-I/usr/local/opt/sqlite/include"
```

Para las Macs con `Apple Silicon` hay que asegurarse de que los paths de las librerías son correctos tratándose de Homebrew:

```bash
export CPATH=/opt/homebrew/include
export LIBRARY_PATH=/opt/homebrew/lib
```

### ¿Por qué Bitcoin Knots?

`Bitcoin Knots` es un fork de Bitcoin Core mantenido por Luke Dashjr. Es totalmente compatible — mismos `bitcoind`, `bitcoin-cli` y `bitcoin.conf` — así que el resto de esta guía aplica para ambos clientes.

:::info Por qué recomendamos Bitcoin Knots sobre Bitcoin Core
- **Mayor control y personalización** — expone opciones de configuración adicionales que no están disponibles en Core.
- **Filtros de Spam (Límite de Datos)** — permite configurar `datacarriersize` para filtrar transacciones no financieras que saturan la blockchain.
- **Mayor Descentralización** — políticas predeterminadas más estrictas alineadas con el diseño original de Bitcoin.
- **Políticas de Transmisión** — control más fino sobre qué transacciones tu nodo retransmite y acepta en el mempool.
:::

### Instalación de Bitcoin Knots

Descárgalo desde [bitcoinknots.org](https://bitcoinknots.org/), descomprimelo y arrástralo a tu carpeta de aplicaciones. Otorga permisos en `System Settings` > `Privacy & Security` de la misma forma que con Bitcoin Core.

Para las herramientas de CLI, como no existe fórmula de Homebrew para Bitcoin Knots, copia los binarios manualmente:

```bash
# Sustituye X.Y.Z por la versión descargada
sudo cp ~/Downloads/bitcoin-X.Y.Z/bin/bitcoind /usr/local/bin/
sudo cp ~/Downloads/bitcoin-X.Y.Z/bin/bitcoin-cli /usr/local/bin/
```

### Alternativa: Bitcoin Core

Si prefieres el cliente upstream más conservador, descárgalo desde [bitcoincore.org](https://bitcoincore.org/en/download/), descomprimelo y arrástralo a tu carpeta de aplicaciones.

:::info
También existe la opción de compilar Bitcoin Core desde el código fuente.
:::

Tras otorgar permisos en `System Settings` > `Privacy & Security`, instala las herramientas CLI via Homebrew:

```bash
brew install bitcoin
```

Para poder correrlo, ademas de abrirlo desde aplicaciones hay a que otorgarle permisos en `System Settings` > `Privacy & Security`. Nos movemos hasta abajo y hay que darle al botón `Open Anyway`.

![image](/img/bitcoin_core_macos_settings_open.png)

En la configuración inicial elegimos el directorio por defecto junto con la opcion de `1 GB`.

![image](/img/bitcoin_core_setup.png)

Bitcoin Core va syncronizar y a descargar toda la blockchain, y eso va a tardar muchas horas dependiendo de tu equipo y tu conexión a internet.

![image](/img/bitcoin_core_sync.png)

:::warning
Sincronizar el todo el blockchain podria tardar muchas horas o incluso días.
:::

:::danger
En esta guía no vamos a sincronizar todo el blockchain, vamos a usar un `Prune Node`, o nodo podado y vamos a utilizar la red `regtest`.
:::

Abrimos la app de Bitcoin Core y nos vamos a las preferencias de la aplicación. En la prestaña de `main` vamos a abrir el archivo de configuración de bitcoin core en el boton que dice `Open Configuration File` y agregamos lo siguiente:

```bash title="bitcoin.conf"
regtest=1

[main]
prune=550

[regtest]
rcpport=18443
rpcuser=foo
rpcpassword=bar
```

Reiniciamos la aplicación de Bitcoin Core y esperamos a que se sincronice.

Esto va a reducir significativamente el tiempo de sincronización asi como el espacio en disco que necesitamos.

Despues de sincronizar la blockchain, cerramos la aplicación gráfica de Bitcoin Core, necesitamos correr bitcoin core en la terminal, para ello tenemos que instalarlo desde homebrew:

```bash
brew install bitcoin
```

Hombrew nos va a instalar `bitcoind` y `bitcoin-cli`.

### Ejecución de Bitcoin para Desarrollo

Vamos a abrir dos ventanas o pestañas de terminal:
- En la primera terminal ejecutamos `bitcoind` el cual va a correr el nodo de bitcoin y va sincronizar el blockchain (si no sincronizamos antes).

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
poetry install
./configure
poetry run make
```

:::warning
En mi caso como uso un version manager ASDF tengo que especificar el path de poetry en mi archivo .zhrc.
:::

Necesitamos correr `bitcoind`, `lightningd` y `lightning-cli` en segundo plano con la flag `--regtest`:

```bash
bitcoind &
./lightningd/lightningd --regtest &
./cli/lightning-cli --regtest help
```

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

La propiedad `amount_msat` es el monto en satoshis.

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
