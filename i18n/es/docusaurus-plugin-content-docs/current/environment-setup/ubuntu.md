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

Nos bajamos el repo:

```bash
git clone https://github.com/ElementsProject/lightning.git
cd lightning
```

Compilamos e instalamos lightning:

```bash
./configure --disable-rust
make -j16
sudo make install
```

:::info
En make -j16 estamos indicando que queremos usar 16 cores para compilar el software.
:::

Corremos la testnet de lighning:

```bash
. contrib/startup_regtest.sh
```

Creamos nodos:

```bash
start_ln
```

Ahora podemos ver la info de los nodos creados:

```bash
l1-cli getinfo
```

Les agregamos fondos:

```bash
fund_nodes
```

Podemos ver esos fondos:

```bash
l1-cli listfunds
```

Sobre eso ya podemos comenzar a construir aplicaciones sobre Bitcoin y Lightning Network.
