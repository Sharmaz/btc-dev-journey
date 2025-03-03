---
sidebar_position: 3
---

# Uninstalling

## Remove Lightning

### Ubuntu & MacOS
```bash
sudo rm -rf lightning
```

### Ubuntu
Remove the link to `lightningd` and `lightning-cli`.

```bash
sudo rm /usr/local/bin/lightningd
sudo rm /usr/local/bin/lightning-cli
sudo rm /usr/local/bin/lightning-hsmtool
```

## Remove Bitcoin Core

### Ubuntu
```bash
sudo snap remove bitcoin-core
```
Remove the link to `bitcoind` and `bitcoin-cli`.

```bash
sudo rm /usr/local/bin/bitcoind
sudo rm /usr/local/bin/bitcoin-cli
```

### MacOS
Drag the `Bitcoin` app to the trash.

```bash
brew uninstall bitcoin
```

Delete the blockchain data:

```bash
sudo rm -rf ~/Library/Application\ Support/Bitcoin/
```

## Uninstall Dependencies

### Ubuntu
```bash
sudo apt-get remove -y \
  jq autoconf automake libtool libsqlite3-dev libffi-dev \
  net-tools zlib1g-dev libsodium-dev gettext
```

### MacOS

:::warning
Possibly, you are using a version manager like asdf. In that case, some of the following packages are dependencies for this version manager, so be careful when removing them.
:::

```bash
brew uninstall autoconf automake libtool gnu-sed gettext libsodium protobuf
```

Remove python dependencies:

```bash
pip uninstall poetry
pip uninstall pyln-client websockets
```


If we want to remove SQLite:
```bash
brew uninstall sqlite
```

:::note
Great!! Now we should be clean and with some GB of free space.
:::
