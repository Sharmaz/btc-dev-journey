---
sidebar_position: 2
---
# MacOS

Instalar dependencias Python 3.12.3, Homebrew y Xcode.

Otras dependencias: 

```bash
brew install autoconf automake libtool gnu-sed gettext libsodium protobuf
export PATH="/usr/local/opt:$PATH"
```

Instalamos poetry:

```bash
pip install --upgrade pip
pip install poetry
```

Si nos hace falta SQLITE:

```bash
brew install sqlite
export LDFLAGS="-L/usr/local/opt/sqlite/lib"
export CPPFLAGS="-I/usr/local/opt/sqlite/include"
```

Some library paths are different when using `homebrew` on Macs with Apple silicon, therefore the following two variables need to be set for Macs with Apple silicon:

```bash
export CPATH=/opt/homebrew/include
export LIBRARY_PATH=/opt/homebrew/lib
```

Instalar el Bitcoin Core de https://bitcoin.org/en/download

Ir a privace and security and open bit core anyway

I selected the 1 GB limit option to prevent to download all the blockchain.

Edit your `~/Library/Application\ Support/Bitcoin/bitcoin.conf`to include `rpcuser=<foo>` and `rpcpassword=<bar>` first, you may also need to include `testnet=1`.

Para no descargarnos todo el blockchain tambien agregamos `prune=550` .

Se va a tardar un monton de horas

Instalamos bitcoin core daemon (bitcoind)

```bash
brew install bitcoin
```

Jalamos el repo

```bash
git clone https://github.com/ElementsProject/lightning.git
cd lightning
```

Hacemos el build de lightning:

```bash
poetry install
./configure
poetry run make
```
