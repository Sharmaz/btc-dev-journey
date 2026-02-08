---
sidebar_position: 2
title: Code Architecture
description: Bitcoin Core source tree layout, build system, and module boundaries
---

# Code Architecture

Understanding how Bitcoin Core's source code is organized is the first step to navigating and contributing to the project.

## Source Tree Layout

```
bitcoin/
├── src/                    # Main source code
│   ├── consensus/          # Consensus-critical code (minimal dependencies)
│   ├── script/             # Script interpreter and verification
│   ├── primitives/         # Core data structures (block, transaction)
│   ├── wallet/             # Wallet functionality
│   ├── rpc/                # RPC command implementations
│   ├── net.cpp             # Low-level networking (connections, sockets)
│   ├── net_processing.cpp  # Protocol message handling logic
│   ├── validation.cpp      # Block and transaction validation
│   ├── txmempool.cpp       # Memory pool management
│   ├── init.cpp            # Node initialization and startup
│   ├── node/               # Node-level interfaces
│   ├── kernel/             # Libbitcoinkernel (consensus engine extraction)
│   └── test/               # Unit tests
├── test/                   # Functional tests (Python)
├── doc/                    # Developer documentation
├── contrib/                # Auxiliary scripts and tools
├── depends/                # Cross-compilation dependency builder
└── ci/                     # Continuous integration scripts
```

## Key Architectural Concepts

### Separation of Consensus

Bitcoin Core carefully separates **consensus-critical** code from everything else. Code in `src/consensus/` and `src/script/` has the strictest review requirements because bugs there could cause chain splits.

The **libbitcoinkernel** project (ongoing) aims to extract all consensus logic into a standalone library that other implementations could use, reducing the risk of consensus divergence.

### Process Architecture

Bitcoin Core runs as a single process with multiple threads:

- **Main thread** — Initialization and shutdown
- **Message handler thread** — Processes P2P messages
- **Net thread** — Manages socket connections
- **Scheduler thread** — Runs periodic tasks
- **RPC threads** — Handle API requests
- **Script verification threads** — Parallel signature checking

### Important Interfaces

| Interface | Purpose |
|-----------|---------|
| `ChainstateManager` | Manages blockchain state and validation |
| `CTxMemPool` | Transaction memory pool |
| `CConnman` | Connection manager for P2P networking |
| `PeerManager` | High-level peer protocol logic |
| `CWallet` | Wallet operations |
| `CScript` | Script representation and operations |

## Build System

Bitcoin Core uses **CMake** (migrated from autotools):

```bash
# Configure
cmake -B build

# Build with parallel jobs
cmake --build build -j$(nproc)

# Common CMake options
cmake -B build -DWITH_BDB=ON          # Enable legacy wallet (BDB)
cmake -B build -DBUILD_TESTING=ON      # Build unit tests
cmake -B build -DCMAKE_BUILD_TYPE=Debug  # Debug build
```

## Recommended Reading

- [Bitcoin Core Developer Notes](https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md) — Coding conventions and practices
- [Source code organization](https://github.com/bitcoin/bitcoin/blob/master/doc/design/libraries.md) — Library architecture
- [Onboarding to Bitcoin Core](https://obc.256k1.dev/) — Guided study program
