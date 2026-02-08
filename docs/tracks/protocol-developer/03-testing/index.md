---
sidebar_position: 3
title: Testing
description: Testing methodologies in Bitcoin Core - functional tests, unit tests, and fuzz testing
---

# Testing

Testing is not optional in Bitcoin Core — it's a first-class requirement. Every pull request must include appropriate tests. The project has multiple testing layers, each catching different types of bugs.

## Testing Layers

### Unit Tests (C++)

Located in `src/test/`, these test individual functions and classes in isolation:

```bash
# Build and run unit tests
cmake --build build
ctest --test-dir build

# Run specific test suite
./build/src/test/test_bitcoin --run_test=script_tests

# List available test suites
./build/src/test/test_bitcoin --list_content
```

Unit tests use the **Boost.Test** framework:

```cpp
BOOST_AUTO_TEST_SUITE(example_tests)

BOOST_AUTO_TEST_CASE(basic_check)
{
    CTransaction tx;
    BOOST_CHECK(tx.vin.empty());
    BOOST_CHECK(tx.vout.empty());
}

BOOST_AUTO_TEST_SUITE_END()
```

### Functional Tests (Python)

Located in `test/functional/`, these spin up actual Bitcoin Core nodes and test end-to-end behavior:

```bash
# Run entire functional test suite
test/functional/test_runner.py

# Run specific test with logging
test/functional/feature_block.py --loglevel=debug

# Run tests in parallel
test/functional/test_runner.py -j8
```

Functional tests are the primary way to test protocol-level changes. They simulate real network conditions with multiple nodes.

### Fuzz Testing

Fuzz testing feeds random or semi-random data to parsing functions to find crashes, hangs, and undefined behavior:

```bash
# Build with fuzzing support
cmake -B build -DSANITIZERS=fuzzer
cmake --build build

# Run a fuzz target
./build/src/test/fuzz/deserialize_block

# Run with a corpus
./build/src/test/fuzz/deserialize_block corpus/
```

Bitcoin Core has **hundreds of fuzz targets** covering deserialization, script parsing, network message handling, and more. The [OSS-Fuzz](https://google.github.io/oss-fuzz/) project continuously fuzzes Bitcoin Core.

### Linting

Static analysis and style checks run in CI:

```bash
# Run all linters
test/lint/run-lint.sh

# Specific checks
test/lint/lint-circular-dependencies.py
test/lint/lint-includes.py
```

## CI Infrastructure

Every pull request runs through automated CI:

| System | What It Checks |
|--------|---------------|
| **GitHub Actions** | Build on multiple platforms, run tests |
| **Cirrus CI** | macOS builds, sanitizer runs |
| **OSS-Fuzz** | Continuous fuzz testing |
| **Guix builds** | Reproducible binary builds |

### Sanitizers

Bitcoin Core CI uses LLVM sanitizers to catch memory and threading bugs:

- **ASan** (AddressSanitizer) — Buffer overflows, use-after-free
- **UBSan** (UndefinedBehaviorSanitizer) — Integer overflow, null pointer dereference
- **TSan** (ThreadSanitizer) — Data races
- **MSan** (MemorySanitizer) — Uninitialized memory reads

```bash
# Build with sanitizers
cmake -B build -DSANITIZERS="address;undefined"
cmake --build build
```

## Writing Good Tests

When contributing to Bitcoin Core, follow these testing guidelines:

1. **Test the behavior, not the implementation** — Tests should verify what the code does, not how it does it
2. **Test edge cases** — Empty inputs, maximum values, malformed data
3. **Test failure modes** — Ensure invalid inputs are rejected correctly
4. **Don't test framework functionality** — Trust Boost.Test and the Python framework
5. **Keep tests deterministic** — Avoid timing dependencies and random failures

## Recommended Reading

- [Bitcoin Core Test Documentation](https://github.com/bitcoin/bitcoin/tree/master/test)
- [Functional Test README](https://github.com/bitcoin/bitcoin/blob/master/test/functional/README.md)
- [Fuzz Testing Guide](https://github.com/bitcoin/bitcoin/blob/master/doc/fuzzing.md)
