"use strict";(self.webpackChunkbtc_dev_journey=self.webpackChunkbtc_dev_journey||[]).push([[2234],{8236:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"environment-setup/ubuntu","title":"Ubuntu","description":"Bitcoin Core","source":"@site/docs/environment-setup/ubuntu.md","sourceDirName":"environment-setup","slug":"/environment-setup/ubuntu","permalink":"/btc-dev-journey/docs/environment-setup/ubuntu","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"guideSidebar","previous":{"title":"Environment setup","permalink":"/btc-dev-journey/docs/category/environment-setup"},"next":{"title":"MacOS","permalink":"/btc-dev-journey/docs/environment-setup/macos"}}');var s=i(4848),o=i(8453);const l={sidebar_position:1},a="Ubuntu",c={},d=[{value:"Bitcoin Core",id:"bitcoin-core",level:2},{value:"Dependencies",id:"dependencies",level:3},{value:"Installing Bitcoin Core",id:"installing-bitcoin-core",level:3},{value:"Running Bitcoin for Development",id:"running-bitcoin-for-development",level:3},{value:"Installing Lightning",id:"installing-lightning",level:2},{value:"Running Lightning for Development",id:"running-lightning-for-development",level:3}];function r(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"ubuntu",children:"Ubuntu"})}),"\n",(0,s.jsx)(e.h2,{id:"bitcoin-core",children:"Bitcoin Core"}),"\n",(0,s.jsx)(e.h3,{id:"dependencies",children:"Dependencies"}),"\n",(0,s.jsxs)(e.p,{children:["We will install ",(0,s.jsx)(e.code,{children:"Python 3.12.3"}),"."]}),"\n",(0,s.jsx)(e.admonition,{type:"warning",children:(0,s.jsx)(e.p,{children:"Versions above 3.12.3 did not work for me. I got errors later with Lightning Network."})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",metastring:'title="Python dependencies"',children:"sudo apt-get update\nsudo apt-get install -y \\\n  jq autoconf automake build-essential git libtool libsqlite3-dev libffi-dev \\\n  python3 python3-pip net-tools zlib1g-dev libsodium-dev gettext\npip3 install --upgrade pip\npip3 install --user poetry\n"})}),"\n",(0,s.jsx)(e.h3,{id:"installing-bitcoin-core",children:"Installing Bitcoin Core"}),"\n",(0,s.jsxs)(e.p,{children:["The easiest way to install ",(0,s.jsx)(e.code,{children:"Bitcoin Core"})," is using snap."]}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsx)(e.p,{children:"There is also the option to compile bitcoin core from the source code."})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",metastring:'title="Bitcoin core installation"',children:"sudo apt-get install snapd\nsudo snap install bitcoin-core\n# Se agrega un link simb\xf3lico debido a que snap hace cosas raras cuando maneja binarios.\nsudo ln -s /snap/bitcoin-core/current/bin/bitcoin{d,-cli} /usr/local/bin/\n"})}),"\n",(0,s.jsx)(e.admonition,{type:"tip",children:(0,s.jsxs)(e.p,{children:["In case you are developing applications for Lightning Network, I recommend you to skip the step that follows and go directly to ",(0,s.jsx)(e.a,{href:"#installing-lightning",children:"Installing Lightning"}),"."]})}),"\n",(0,s.jsx)(e.h3,{id:"running-bitcoin-for-development",children:"Running Bitcoin for Development"}),"\n",(0,s.jsx)(e.p,{children:"At this point we will open two terminals:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["In the first terminal we are going to run ",(0,s.jsx)(e.code,{children:"bitcoind"})," which will run the bitcoin node and synchronize the blockchain which is more than half a terabyte."]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"bitcoind\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["In the second terminal ",(0,s.jsx)(e.code,{children:"bitcoin-cli"})," where we going to show the node info."]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"bitcoin-cli getblockchaininfo\n"})}),"\n",(0,s.jsx)(e.p,{children:"If everything goes well we should see something like this:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-JSON",metastring:'title="getblockchaininfo output"',children:'{\n  "chain": "main",\n  "blocks": 1,\n  "headers": 1,\n  "bestblockhash": "0000000000000000000000000000000000000000000000000000000000000000",\n  "difficulty": 1,\n  "mediantime": 0,\n  "verificationprogress": 1,\n  "initialblockdownload": true,\n  "chainwork": "0000000000000000000000000000000000000000000000000000000000000000",\n  "size_on_disk": 0,\n  "pruned": true,\n  "pruneheight": 0,\n  "automatic_pruning": true,\n  "prune_target_size": 0,\n  "softforks": [],\n  "warnings": ""\n}\n'})}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsxs)(e.p,{children:["All requests made with ",(0,s.jsx)(e.code,{children:"bitcoin-cli"})," will be responded in JSON format."]})}),"\n",(0,s.jsxs)(e.p,{children:["Go to the terminal where ",(0,s.jsx)(e.code,{children:"bitcoind"})," is running and cancel it with ",(0,s.jsx)(e.code,{children:"ctrl + c"}),"."]}),"\n",(0,s.jsx)(e.admonition,{type:"warning",children:(0,s.jsxs)(e.p,{children:["Leaving ",(0,s.jsx)(e.code,{children:"bitcoind"})," running may take a lot of time or even days to synchronize the whole blockchain."]})}),"\n",(0,s.jsx)(e.admonition,{type:"note",children:(0,s.jsxs)(e.p,{children:["If you are developing applications only for Bitcoin without touching the Lightning Network, you can skip the rest of this guide. And your next steps will be finishing synchronizing the blockchain with ",(0,s.jsx)(e.code,{children:"bitcoind"})," and then using ",(0,s.jsx)(e.code,{children:"bitcoin-cli"}),"."]})}),"\n",(0,s.jsx)(e.h2,{id:"installing-lightning",children:"Installing Lightning"}),"\n",(0,s.jsx)(e.p,{children:"Let's download the repository:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"git clone https://github.com/ElementsProject/lightning.git\ncd lightning\n"})}),"\n",(0,s.jsx)(e.p,{children:"We compile and install lightning:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"./configure --disable-rust\nmake -j15\nsudo make install\n"})}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsxs)(e.p,{children:["In the command above -j15 we are indicating that we want to use 15 cores to compile the software. If we don't know the number of cores of our pc we can substitute it by ",(0,s.jsx)(e.code,{children:"make -j$(($(nproc)-1))"})," to use the cores of our pc leaving one free."]})}),"\n",(0,s.jsx)(e.h3,{id:"running-lightning-for-development",children:"Running Lightning for Development"}),"\n",(0,s.jsx)(e.p,{children:"We run the testnet of lighning (in fact regtest, but I will explain it later in another guide):"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:". contrib/startup_regtest.sh\n"})}),"\n",(0,s.jsxs)(e.p,{children:["The command above is a script that will run ",(0,s.jsx)(e.code,{children:"bitcoind"}),", ",(0,s.jsx)(e.code,{children:"bitcion-cli"}),", ",(0,s.jsx)(e.code,{children:"lightningd"})," and ",(0,s.jsx)(e.code,{children:"lightning-cli"}),".\nAnd we get the following output with some basic commands."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",metastring:'title=". contrib/startup_regtest.sh output"',children:"Useful commands:\n  start_ln 3: start three nodes, l1, l2, l3\n  connect 1 2: connect l1 and l2\n  fund_nodes: connect all nodes with channels, in a row\n  stop_ln: shutdown\n  destroy_ln: remove ln directories\n"})}),"\n",(0,s.jsxs)(e.p,{children:["The command ",(0,s.jsx)(e.code,{children:"start_ln"})," will create a pair of nodes in the lightning network (l1 and l2)."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"start_ln\n"})}),"\n",(0,s.jsx)(e.p,{children:"Also we will get a list of commands to interact with each node:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",metastring:'title="start_ln output"',children:'Bitcoin Core starting\nawaiting bitcoind...\nLoading "default" bitcoind wallet.\n[1] 10459\n[2] 10463\nCommands:\n        l1-cli, l1-log,\n        l2-cli, l2-log,\n        bt-cli, stop_ln, fund_nodes\ntimed out parsing log /tmp/l1/log\n'})}),"\n",(0,s.jsx)(e.p,{children:"We get the information of one of the nodes (l1)."}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"l1-cli getinfo\n"})}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsx)(e.p,{children:"All requests made with lightning will be responded in JSON format."})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-JSON",metastring:'title="getinfo output"',children:'{\n   "id": "02d44e9a844e84ab76d412601c8e648ce039b8266874ddfe5b854fb6723096ea06",\n   "alias": "SLICKERROUTE-v24.11-91-g9e29bde",\n   "color": "02d44e",\n   "num_peers": 0,\n   "num_pending_channels": 0,\n   "num_active_channels": 0,\n   "num_inactive_channels": 0,\n   "address": [],\n   "binding": [\n      {\n         "type": "ipv4",\n         "address": "127.0.0.1",\n         "port": 7171\n      }\n   ],\n   "version": "v24.11-91-g9e29bde",\n   "blockheight": 109,\n   "network": "regtest",\n   "fees_collected_msat": 0,\n   "lightning-dir": "/tmp/l1/regtest",\n   "our_features": {\n      "init": "8008a0882a8a59a1",\n      "node": "8088a0882a8a59a1",\n      "channel": "",\n      "invoice": "02000002024100"\n   }\n}\n'})}),"\n",(0,s.jsx)(e.p,{children:"Now we are going to add some funds (a few satoshis) to the nodes:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"fund_nodes\n"})}),"\n",(0,s.jsx)(e.p,{children:"Awesome!!"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",metastring:'title="fund_nodes output"',children:"bitcoind balance: 447.99999718\nWaiting for lightning node funds... found.\nFunding channel <-> node 1 to node 2. Waiting for confirmation... done.\n"})}),"\n",(0,s.jsxs)(e.p,{children:["We get the funds of the node ",(0,s.jsx)(e.code,{children:"l1"}),":"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"l1-cli listfunds\n"})}),"\n",(0,s.jsxs)(e.p,{children:["The ",(0,s.jsx)(e.code,{children:"amount_msat"})," property is the amount in satoshis."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-JSON",metastring:'title="listfunds output"',children:'{\n   "outputs": [\n      {\n         "txid": "3383b42043c96d072f1a22f11ea1e4039bb93176f13d397178a6eb13cb7113e2",\n         "output": 1,\n         "amount_msat": 98999834000,\n         "scriptpubkey": "51200e98fba542bc6fda8cb83ae930cebd6f6957f3cb5d2eb49e47a6d0f612473efa",\n         "address": "bcrt1pp6v0hf2zh3ha4r9c8t5npn4ada540u7tt5htf8j85mg0vyj88maq9zy237",\n         "status": "confirmed",\n         "blockheight": 111,\n         "reserved": false\n      }\n   ],\n   "channels": [\n      {\n         "peer_id": "02fed4dea6a6bc7dcc8d7bb4c88aa452fc4cd3878949851b4c0c23e71eebfc751f",\n         "connected": true,\n         "state": "CHANNELD_NORMAL",\n         "channel_id": "8274abbaeb547055d57f07337965eadea778c7e0344dd6d1b55257746cd85288",\n         "short_channel_id": "111x1x0",\n         "our_amount_msat": 1000000000,\n         "amount_msat": 1100000000,\n         "funding_txid": "3383b42043c96d072f1a22f11ea1e4039bb93176f13d397178a6eb13cb7113e2",\n         "funding_output": 0\n      }\n   ]\n}\n'})}),"\n",(0,s.jsx)(e.admonition,{type:"note",children:(0,s.jsx)(e.p,{children:"Congratulations!! Now we can build applications on Bitcoin and Lightning Network.\n...well, kind of. Al least we can start experimenting with it."})})]})}function h(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(r,{...n})}):r(n)}}}]);