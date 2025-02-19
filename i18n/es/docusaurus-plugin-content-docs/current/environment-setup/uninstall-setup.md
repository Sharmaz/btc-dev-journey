---
sidebar_position: 3
---

# Desinstalación

## Desinstalación de Lightning

### Ubuntu & MacOS
```bash
sudo rm -rf lightning
```

### Ubuntu
Eliminamos los enlaces a `lightningd` y `lightning-cli`.

```bash
sudo rm /usr/local/bin/lightningd
sudo rm /usr/local/bin/lightning-cli
sudo rm /usr/local/bin/lightning-hsmtool
```

## Desinstalación Bitcoin Core

### Ubuntu
```bash
sudo snap remove bitcoin-core
```

Borramos los enlaces a `bitcoind` y `bitcoin-cli`.

```bash
sudo rm /usr/local/bin/bitcoind
sudo rm /usr/local/bin/bitcoin-cli
```

### MacOS
Arrastramos la aplicación `Bitcoin` a la papelera.

```bash
brew uninstall bitcoin
```

Borramos los datos de blockchain:

```bash
sudo rm -rf ~/Library/Application\ Support/Bitcoin/
```

## Desinstalación de dependencias

### Ubuntu
```bash
sudo apt-get remove -y \
  jq autoconf automake libtool libsqlite3-dev libffi-dev \
  net-tools zlib1g-dev libsodium-dev gettext
```

:::warning
Probablemente estas usando un gestor de versiones como asdf. En ese caso, algunas de los siguientes paquetes son dependencias para este gestor de versiones, así que ten cuidado al eliminarlas.
:::

### MacOS
```bash
brew uninstall autoconf automake libtool gnu-sed gettext libsodium protobuf
```

Desinstalamos las dependencias de python:

```bash
pip uninstall poetry
pip uninstall pyln-client websockets
```

Por si queremos desinstalar SQLite:
```bash
brew uninstall sqlite
```

:::note
Listo!! ya deberiamos estar limpios y con unos cuantos GB de espacio libre.
:::
