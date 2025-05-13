---
sidebar_position: 1
---

# Ubuntu

## Bitcoin Core

### Dependencies

We will install `Python 3.12.3`.

:::warning
Versions above 3.12.3 did not work for me. I got errors later with Lightning Network.
:::

Supposing that you have been installed `python`, `build-essential` and `git` you should install the following dependencies:

```bash title="dependencies"
sudo apt-get update
sudo apt-get install -y \
  jq autoconf automake libtool libsqlite3-dev libffi-dev \
  net-tools zlib1g-dev libsodium-dev gettext
```

### Installing Bitcoin Core

The easiest way to install `Bitcoin Core` is using snap.
:::info
There is also the option to compile bitcoin core from the source code.
:::

```bash title="Bitcoin core installation"
sudo snap install bitcoin-core
# Create a symbolic link to bitcoind and bitcoin-cli from the snap
sudo ln -s /snap/bitcoin-core/current/bin/bitcoin{d,-cli} /usr/local/bin/
```

We are going to use our Bitcoin node for development purposes, so instead of syncing the entire blockchain, we need to configure a pruned node.

Lets create the config file:
```bash
nano ~/.bitcoin/bitcoin.conf
```

Include the following configuration parameters:
```bash title="bitcoin.conf"
regtest=1

[main]
prune=550

[regtest]
rcpport=18443
rpcuser=foo
rpcpassword=bar
```

### Running Bitcoin for Development

At this point we will open two terminals:
- In the first terminal we are going to run `bitcoind`, which will start the Bitcoin node and synchronize the blockchain—well, just a minimal part of it, since we configured a pruned node.

```bash
bitcoind
```
- In the second terminal `bitcoin-cli` where we going to show the node info.
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
All requests made with `bitcoin-cli` will be responded in JSON format.
:::

Go to the terminal where `bitcoind` is running and cancel it with `ctrl + c`.

:::warning
Leaving `bitcoind` running may take a lot of time or even days to synchronize the whole blockchain.
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

We compile and install lightning:

```bash
./configure --disable-rust
make -j15
sudo make install
```

:::info
In the command above -j15 we are indicating that we want to use 15 cores to compile the software. If we don't know the number of cores of our pc we can substitute it by `make -j$(($(nproc)-1))` to use the cores of our pc leaving one free.
:::

### Running Lightning for Development

We run the testnet of lighning (in fact regtest, but I will explain it later in another guide):

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
We get the information of one of the nodes (l1).

```bash
l1-cli getinfo
```

:::info
All requests made with lightning will be responded in JSON format.
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

```bash title="fund_nodes output"
bitcoind balance: 447.99999718
Waiting for lightning node funds... found.
Funding channel <-> node 1 to node 2. Waiting for confirmation... done.
```

We get the funds of the node `l1`:

```bash
l1-cli listfunds
```

The `our_amount_msat` property is the amount in satoshis.

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
