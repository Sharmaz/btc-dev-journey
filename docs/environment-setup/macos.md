---
sidebar_position: 2
---
# MacOS

## Bitcoin Core

### Dependencies

Install dependencies `Python 3.12.3`, `Homebrew` and `Xcode`.
:::warning
Python version above `3.12.3` did not work for me. I got errors later with Lightning Network.
:::

Other dependencies:

```bash
brew install autoconf automake libtool gnu-sed gettext libsodium protobuf
export PATH="/usr/local/opt:$PATH"
```

Python dependencies:

```bash
pip install --upgrade pip
pip install poetry
```

If you don't have SQLite you need to install it:

```bash
brew install sqlite
export LDFLAGS="-L/usr/local/opt/sqlite/lib"
export CPPFLAGS="-I/usr/local/opt/sqlite/include"
```

For Macs with `Apple Silicon` we need to make sure that the library paths are correct when using `homebrew`:

```bash
export CPATH=/opt/homebrew/include
export LIBRARY_PATH=/opt/homebrew/lib
```

### Installing Bitcoin Core

The easiest way to install `Bitcoin Core` is downloading it from [bitcoincore.org](https://bitcoincore.org/en/download/), decompressing it and dragging it to our applications folder.

:::info
There is also the option to compile Bitcoin Core from the source code.
:::

To be able to run it, besides opening it from applications we need to grant it permissions in `System Settings` > `Privacy & Security`. Scroll down and click the `Open Anyway` button.

![image](/img/bitcoin_core_macos_settings_open.png)

At the initial configuration we choose the default directory along with the option of `1 GB`.

![image](/img/bitcoin_core_setup.png)

Bitcoin Core will synchronize and download the entire blockchain, and that will take a lot of time depending on your computer and internet connection.

![image](/img/bitcoin_core_sync.png)

:::warning
Synchronizing the entire blockchain could take a lot of time or even days.
:::

:::danger
In this guide we will not synchronize the entire blockchain, we will use a `Prune Node`, and we will use the `regtest` network.
:::

Open the Bitcoin Core app and we will go to the preferences of the application. In the `main` tab we will open the configuration file of Bitcoin Core click the button that says `Open Configuration File` and add the following:

```bash title="bitcoin.conf"
prune=550
regtest=1

[regtest]
rcpport=18443
rpcuser=foo
rpcpassword=bar
```

Restart the Bitcoin Core application and wait until it is synchronized.

This will reduce the time of synchronization as well as the disk space we need.

After synchronizing the blockchain, close the Bitcoin Core graphical application, we need to run bitcoin core in the terminal, so we need to install it from homebrew:

```bash
brew install bitcoin
```

Homebrew will install `bitcoind` and `bitcoin-cli`.

### Running Bitcoin for Development

Open two terminal windows or tabs:

- In the first terminal we are going to run `bitcoind` which will run the bitcoin node and synchronize the blockchain (if we haven't synchronized it before).

```bash
bitcoind
```

- In the second terminal we are going to run `bitcoin-cli` which will show the info of the node.


```bash
bitcoin-cli getblockchaininfo
```

If everything goes well we should see something like this:

```JSON title="getblockchaininfo output"
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
All requests made with `bitcoin-cli` will be in JSON format.
:::

:::note
If you are developing applications only for Bitcoin without touching the Lightning Network, you can skip the rest of this guide. And your next steps will be finishing synchronizing the blockchain with `bitcoind` and then using `bitcoin-cli`.
:::

## Installing Lightning

Let's download the repository:

```bash
git clone https://github.com/ElementsProject/lightning.git
cd lightning
```

Compile and install lightning:

```bash
poetry install
./configure
poetry run make
```

Run the testnet of lighning (in fact regtest, but I will explain it later in another guide):

```bash
. contrib/startup_regtest.sh
```

The command above is a script that will run `bitcoind`, `bitcion-cli`, `lightningd` and `lightning-cli`.
And we get the following output with some basic commands.

```bash title=". contrib/startup_regtest.sh output"
Useful commands:
  start_ln 3: start three nodes, l1, l2, l3
  connect 1 2: connect l1 and l2
  fund_nodes: connect all nodes with channels, in a row
  stop_ln: shutdown
  destroy_ln: remove ln directories
```

The command `start_ln` will create a pair of nodes in the lightning network (l1 and l2).

```bash
start_ln
```

Also we will get a list of commands to interact with each node:

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

We will get the information of one of the nodes (l1).

```bash
l1-cli getinfo
```

:::info
All requests made with lightning will be in JSON format.
:::

```JSON title="getinfo output"
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

Now we are going to add some funds (a few satoshis) to the nodes:

```bash
fund_nodes
```

Awesome!!

We get the funds of the node `l1`:

```bash
l1-cli listfunds
```

The `amount_msat` property is the amount in satoshis.

```JSON title="listfunds output"
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
Congratulations!! Now we can build applications on Bitcoin and Lightning Network.
...well, kind of. Al least we can start experimenting with it.
:::
