---
sidebar_position: 3
title: Testing
description: Metodologías de testing en Bitcoin Core - tests funcionales, unitarios y fuzz testing
---

# Testing

El testing no es opcional en Bitcoin Core — es un requisito de primera clase. Cada pull request debe incluir tests apropiados. El proyecto tiene múltiples capas de testing, cada una detectando diferentes tipos de bugs.

## Capas de Testing

### Tests Unitarios (C++)

Ubicados en `src/test/`, estos prueban funciones y clases individuales de forma aislada:

```bash
# Compilar y ejecutar tests unitarios
cmake --build build
ctest --test-dir build

# Ejecutar suite de tests específica
./build/src/test/test_bitcoin --run_test=script_tests

# Listar suites de tests disponibles
./build/src/test/test_bitcoin --list_content
```

Los tests unitarios usan el framework **Boost.Test**:

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

### Tests Funcionales (Python)

Ubicados en `test/functional/`, estos levantan nodos reales de Bitcoin Core y prueban el comportamiento de extremo a extremo:

```bash
# Ejecutar toda la suite de tests funcionales
test/functional/test_runner.py

# Ejecutar test específico con logging
test/functional/feature_block.py --loglevel=debug

# Ejecutar tests en paralelo
test/functional/test_runner.py -j8
```

Los tests funcionales son la forma principal de probar cambios a nivel de protocolo. Simulan condiciones reales de red con múltiples nodos.

### Fuzz Testing

El fuzz testing alimenta datos aleatorios o semi-aleatorios a funciones de parsing para encontrar crashes, cuelgues y comportamiento indefinido:

```bash
# Compilar con soporte de fuzzing
cmake -B build -DSANITIZERS=fuzzer
cmake --build build

# Ejecutar un objetivo de fuzz
./build/src/test/fuzz/deserialize_block

# Ejecutar con un corpus
./build/src/test/fuzz/deserialize_block corpus/
```

Bitcoin Core tiene **cientos de objetivos de fuzz** cubriendo deserialización, parsing de scripts, manejo de mensajes de red y más. El proyecto [OSS-Fuzz](https://google.github.io/oss-fuzz/) ejecuta fuzz testing continuo sobre Bitcoin Core.

### Linting

Análisis estático y verificaciones de estilo se ejecutan en CI:

```bash
# Ejecutar todos los linters
test/lint/run-lint.sh

# Verificaciones específicas
test/lint/lint-circular-dependencies.py
test/lint/lint-includes.py
```

## Infraestructura de CI

Cada pull request pasa por CI automatizado:

| Sistema | Qué Verifica |
|---------|-------------|
| **GitHub Actions** | Compilación en múltiples plataformas, ejecución de tests |
| **Cirrus CI** | Compilaciones en macOS, ejecución de sanitizers |
| **OSS-Fuzz** | Fuzz testing continuo |
| **Guix builds** | Compilaciones binarias reproducibles |

### Sanitizers

El CI de Bitcoin Core usa sanitizers de LLVM para detectar bugs de memoria e hilos:

- **ASan** (AddressSanitizer) — Desbordamientos de buffer, uso después de liberar
- **UBSan** (UndefinedBehaviorSanitizer) — Desbordamiento de enteros, desreferencia de puntero nulo
- **TSan** (ThreadSanitizer) — Condiciones de carrera de datos
- **MSan** (MemorySanitizer) — Lecturas de memoria no inicializada

```bash
# Compilar con sanitizers
cmake -B build -DSANITIZERS="address;undefined"
cmake --build build
```

## Escribir Buenos Tests

Al contribuir a Bitcoin Core, sigue estas guías de testing:

1. **Prueba el comportamiento, no la implementación** — Los tests deben verificar qué hace el código, no cómo lo hace
2. **Prueba casos límite** — Entradas vacías, valores máximos, datos malformados
3. **Prueba modos de falla** — Asegúrate de que las entradas inválidas se rechacen correctamente
4. **No pruebes funcionalidad del framework** — Confía en Boost.Test y el framework de Python
5. **Mantén los tests determinísticos** — Evita dependencias de tiempo y fallos aleatorios

## Lectura Recomendada

- [Documentación de Tests de Bitcoin Core](https://github.com/bitcoin/bitcoin/tree/master/test)
- [README de Tests Funcionales](https://github.com/bitcoin/bitcoin/blob/master/test/functional/README.md)
- [Guía de Fuzz Testing](https://github.com/bitcoin/bitcoin/blob/master/doc/fuzzing.md)
