---
sidebar_position: 2
title: Languages & Tools
description: Programming languages and development tools used in Bitcoin Core development
---

# Languages & Tools

Bitcoin Core development primarily uses C++ for the main codebase and Python for the test framework. Understanding the specific C++ idioms and tooling used in the project is essential.

## C++ in Bitcoin Core

Bitcoin Core uses **modern C++** (currently C++20). The project has specific coding conventions:

### Style and Conventions

- **Naming**: `CamelCase` for classes, `snake_case` for functions and variables
- **Prefix**: `C` prefix for classes (`CBlock`, `CTransaction`), `m_` for member variables
- **Smart pointers**: `std::unique_ptr` and `std::shared_ptr` over raw pointers
- **No exceptions in consensus code** — Error handling via return values
- **No RTTI** — Runtime type information is disabled

### Key C++ Features Used

```cpp
// std::optional for nullable values
std::optional<CBlockIndex*> FindBlock(const uint256& hash);

// Span for non-owning views
bool VerifyScript(Span<const unsigned char> scriptSig, ...);

// Structured bindings
auto [iter, inserted] = mapBlockIndex.emplace(hash, new_index);

// RAII patterns for locks
LOCK(cs_main);  // Acquires mutex, released at scope exit
```

### Thread Safety

Bitcoin Core uses **annotations** to enforce thread safety at compile time:

```cpp
// Annotated mutexes
RecursiveMutex cs_main ACQUIRED_BEFORE(cs_wallet);

// Variables guarded by specific mutexes
int nBestHeight GUARDED_BY(cs_main);
```

## Python Test Framework

The functional test suite (`test/functional/`) is written in Python and is critical for protocol developers:

```bash
# Run all functional tests
test/functional/test_runner.py

# Run a specific test
test/functional/test_runner.py wallet_basic.py

# Run with verbose output
test/functional/feature_block.py --loglevel=debug
```

### Writing a Functional Test

```python
from test_framework.test_framework import BitcoinTestFramework
from test_framework.util import assert_equal

class ExampleTest(BitcoinTestFramework):
    def set_test_params(self):
        self.num_nodes = 2

    def run_test(self):
        # Mine some blocks
        self.generate(self.nodes[0], 101)

        # Check balance
        balance = self.nodes[0].getbalance()
        assert_equal(balance, 50)

        # Send funds and verify
        txid = self.nodes[0].sendtoaddress(
            self.nodes[1].getnewaddress(), 10
        )
        self.generate(self.nodes[0], 1)
        assert_equal(self.nodes[1].getbalance(), 10)
```

## Development Tools

| Tool | Purpose |
|------|---------|
| `gdb` / `lldb` | Debugger for C++ |
| `valgrind` | Memory error detection |
| `clang-format` | Code formatting (project has `.clang-format`) |
| `clang-tidy` | Static analysis |
| `ccache` | Compiler cache for faster rebuilds |
| `bear` | Generates `compile_commands.json` for IDE support |
| `flamegraph` | Performance profiling visualization |

### Debugging Bitcoin Core

```bash
# Build with debug symbols
cmake -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build

# Run under debugger
gdb --args ./build/src/bitcoind -regtest

# Useful GDB commands
(gdb) break validation.cpp:ProcessNewBlock
(gdb) run
(gdb) bt    # backtrace
(gdb) p block.GetHash().ToString()  # print expression
```

## Recommended Reading

- [Bitcoin Core Developer Notes](https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
- [Functional Test Framework Documentation](https://github.com/bitcoin/bitcoin/blob/master/test/functional/README.md)
