---
sidebar_position: 2
title: Lenguajes y Herramientas
description: Lenguajes de programación y herramientas de desarrollo usados en el desarrollo de Bitcoin Core
---

# Lenguajes y Herramientas

El desarrollo de Bitcoin Core utiliza principalmente C++ para el código principal y Python para el framework de tests. Entender los idioms específicos de C++ y las herramientas utilizadas en el proyecto es esencial.

## C++ en Bitcoin Core

Bitcoin Core usa **C++ moderno** (actualmente C++20). El proyecto tiene convenciones de código específicas:

### Estilo y Convenciones

- **Nombrado**: `CamelCase` para clases, `snake_case` para funciones y variables
- **Prefijo**: `C` para clases (`CBlock`, `CTransaction`), `m_` para variables miembro
- **Smart pointers**: `std::unique_ptr` y `std::shared_ptr` sobre punteros raw
- **Sin excepciones en código de consenso** — Manejo de errores mediante valores de retorno
- **Sin RTTI** — La información de tipo en tiempo de ejecución está deshabilitada

### Características Clave de C++ Usadas

```cpp
// std::optional para valores anulables
std::optional<CBlockIndex*> FindBlock(const uint256& hash);

// Span para vistas no propietarias
bool VerifyScript(Span<const unsigned char> scriptSig, ...);

// Structured bindings
auto [iter, inserted] = mapBlockIndex.emplace(hash, new_index);

// Patrones RAII para locks
LOCK(cs_main);  // Adquiere mutex, se libera al salir del scope
```

### Seguridad de Hilos

Bitcoin Core usa **anotaciones** para aplicar seguridad de hilos en tiempo de compilación:

```cpp
// Mutexes anotados
RecursiveMutex cs_main ACQUIRED_BEFORE(cs_wallet);

// Variables protegidas por mutexes específicos
int nBestHeight GUARDED_BY(cs_main);
```

## Framework de Tests en Python

La suite de tests funcionales (`test/functional/`) está escrita en Python y es crítica para los desarrolladores de protocolo:

```bash
# Ejecutar todos los tests funcionales
test/functional/test_runner.py

# Ejecutar un test específico
test/functional/test_runner.py wallet_basic.py

# Ejecutar con salida detallada
test/functional/feature_block.py --loglevel=debug
```

### Escribir un Test Funcional

```python
from test_framework.test_framework import BitcoinTestFramework
from test_framework.util import assert_equal

class ExampleTest(BitcoinTestFramework):
    def set_test_params(self):
        self.num_nodes = 2

    def run_test(self):
        # Minar algunos bloques
        self.generate(self.nodes[0], 101)

        # Verificar saldo
        balance = self.nodes[0].getbalance()
        assert_equal(balance, 50)

        # Enviar fondos y verificar
        txid = self.nodes[0].sendtoaddress(
            self.nodes[1].getnewaddress(), 10
        )
        self.generate(self.nodes[0], 1)
        assert_equal(self.nodes[1].getbalance(), 10)
```

## Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| `gdb` / `lldb` | Depurador para C++ |
| `valgrind` | Detección de errores de memoria |
| `clang-format` | Formateo de código (el proyecto tiene `.clang-format`) |
| `clang-tidy` | Análisis estático |
| `ccache` | Caché del compilador para rebuilds más rápidos |
| `bear` | Genera `compile_commands.json` para soporte de IDE |
| `flamegraph` | Visualización de profiling de rendimiento |

### Depurar Bitcoin Core

```bash
# Compilar con símbolos de depuración
cmake -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build

# Ejecutar bajo depurador
gdb --args ./build/src/bitcoind -regtest

# Comandos útiles de GDB
(gdb) break validation.cpp:ProcessNewBlock
(gdb) run
(gdb) bt    # backtrace
(gdb) p block.GetHash().ToString()  # imprimir expresión
```

## Lectura Recomendada

- [Notas para Desarrolladores de Bitcoin Core](https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
- [Documentación del Framework de Tests Funcionales](https://github.com/bitcoin/bitcoin/blob/master/test/functional/README.md)
