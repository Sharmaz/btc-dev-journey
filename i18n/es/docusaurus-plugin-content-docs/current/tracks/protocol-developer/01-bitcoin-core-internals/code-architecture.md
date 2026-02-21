---
sidebar_position: 2
title: Arquitectura del Código
description: Layout del árbol de código fuente de Bitcoin Core, sistema de build y límites de módulos
---

# Arquitectura del Código

Entender cómo está organizado el código fuente de Bitcoin Core es el primer paso para navegar y contribuir al proyecto.

## Layout del Árbol de Código

```
bitcoin/
├── src/                    # Código fuente principal
│   ├── consensus/          # Código crítico de consenso (dependencias mínimas)
│   ├── script/             # Intérprete y verificación de scripts
│   ├── primitives/         # Estructuras de datos fundamentales (block, transaction)
│   ├── wallet/             # Funcionalidad del wallet
│   ├── rpc/                # Implementaciones de comandos RPC
│   ├── net.cpp             # Red de bajo nivel (conexiones, sockets)
│   ├── net_processing.cpp  # Lógica de manejo de mensajes del protocolo
│   ├── validation.cpp      # Validación de bloques y transacciones
│   ├── txmempool.cpp       # Gestión del memory pool
│   ├── init.cpp            # Inicialización y arranque del nodo
│   ├── node/               # Interfaces a nivel de nodo
│   ├── kernel/             # Libbitcoinkernel (extracción del motor de consenso)
│   └── test/               # Tests unitarios
├── test/                   # Tests funcionales (Python)
├── doc/                    # Documentación para desarrolladores
├── contrib/                # Scripts y herramientas auxiliares
├── depends/                # Constructor de dependencias para compilación cruzada
└── ci/                     # Scripts de integración continua
```

## Conceptos Arquitectónicos Clave

### Separación de Consenso

Bitcoin Core separa cuidadosamente el código **crítico de consenso** de todo lo demás. El código en `src/consensus/` y `src/script/` tiene los requisitos de revisión más estrictos porque los bugs ahí podrían causar divisiones de la cadena.

El proyecto **libbitcoinkernel** (en desarrollo) busca extraer toda la lógica de consenso en una librería independiente que otras implementaciones podrían usar, reduciendo el riesgo de divergencia de consenso.

### Arquitectura de Procesos

Bitcoin Core se ejecuta como un solo proceso con múltiples hilos:

- **Hilo principal** — Inicialización y apagado
- **Hilo manejador de mensajes** — Procesa mensajes P2P
- **Hilo de red** — Gestiona conexiones de sockets
- **Hilo programador** — Ejecuta tareas periódicas
- **Hilos RPC** — Manejan solicitudes de API
- **Hilos de verificación de scripts** — Verificación paralela de firmas

### Interfaces Importantes

| Interfaz | Propósito |
|----------|-----------|
| `ChainstateManager` | Gestiona el estado de la blockchain y validación |
| `CTxMemPool` | Memory pool de transacciones |
| `CConnman` | Gestor de conexiones para red P2P |
| `PeerManager` | Lógica de protocolo de peers de alto nivel |
| `CWallet` | Operaciones del wallet |
| `CScript` | Representación y operaciones de scripts |

## Sistema de Build

Bitcoin Core usa **CMake** (migrado desde autotools):

```bash
# Configurar
cmake -B build

# Compilar con jobs paralelos
cmake --build build -j$(nproc)

# Opciones comunes de CMake
cmake -B build -DWITH_BDB=ON          # Habilitar wallet legacy (BDB)
cmake -B build -DBUILD_TESTING=ON      # Compilar tests unitarios
cmake -B build -DCMAKE_BUILD_TYPE=Debug  # Build de depuración
```

## Lectura Recomendada

- [Notas para Desarrolladores de Bitcoin Core](https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md) — Convenciones y prácticas de código
- [Organización del código fuente](https://github.com/bitcoin/bitcoin/blob/master/doc/design/libraries.md) — Arquitectura de librerías
- [Onboarding to Bitcoin Core](https://obc.256k1.dev/) — Programa de estudio guiado
