---
sidebar_position: 5
title: Áreas de Especialización
description: Inmersión profunda en subsistemas de Bitcoin Core - P2P, mempool, wallet y minería
---

# Áreas de Especialización

Bitcoin Core es un proyecto grande. La mayoría de los contribuidores eventualmente se especializan en uno o dos subsistemas. Esta sección proporciona una visión general de las principales áreas en las que puedes enfocarte.

## Red P2P

La capa peer-to-peer maneja toda la comunicación entre nodos.

**En qué trabajarías:**
- Gestión de conexiones y selección de peers
- Políticas de relay de mensajes (transacciones, bloques, direcciones)
- Mitigaciones de ataques Eclipse
- Privacidad de red (transporte encriptado BIP-324)
- Soporte para Tor, I2P y CNET

**Archivos clave:** `src/net.cpp`, `src/net_processing.cpp`, `src/addrman.cpp`

**Temas actuales:**
- Erlay (BIP-330) — Relay de transacciones eficiente en ancho de banda
- Package relay — Transmitir transacciones relacionadas como paquetes
- P2P encriptado (BIP-324) — Encriptación oportunista

## Política de Mempool

El mempool gestiona transacciones sin confirmar y decide cuáles transmitir y minar.

**En qué trabajarías:**
- Algoritmos de estimación de comisiones
- Política de relay de transacciones (reglas de estandarización)
- Lógica de Replace-By-Fee (RBF)
- Aceptación de paquetes y CPFP (Child-Pays-For-Parent)
- Políticas de evicción del mempool

**Archivos clave:** `src/txmempool.cpp`, `src/policy/`, `src/validation.cpp`

**Temas actuales:**
- Package relay y package RBF
- Cluster mempool — Reestructuración para mejor ordenamiento basado en comisiones
- Ephemeral anchors — Salidas ancla de comisión cero para Lightning

## Wallet

El subsistema de wallet gestiona claves, construye transacciones y rastrea saldos.

**En qué trabajarías:**
- Descriptor wallets (gestión moderna de claves)
- Algoritmos de selección de monedas
- Construcción y firma de transacciones
- PSBT (Partially Signed Bitcoin Transactions)
- Integración con hardware wallets (HWI)

**Archivos clave:** `src/wallet/`

**Temas actuales:**
- Integración de Miniscript — Políticas de gasto componibles
- Silent Payments (BIP-352) — Direcciones stealth reutilizables
- Mejoras en selección de monedas

## Interfaz de Minería

El subsistema de minería construye plantillas de bloques e interactúa con software de minería.

**En qué trabajarías:**
- Construcción de plantillas de bloques (`getblocktemplate`)
- Selección de transacciones para bloques
- Integración con Stratum V2
- Interfaces para pools de minería

**Archivos clave:** `src/node/miner.cpp`, `src/rpc/mining.cpp`

## Script y Consenso

El intérprete de scripts y el motor de consenso son las partes más críticas de Bitcoin.

**En qué trabajarías:**
- Implementación de opcodes de script
- Verificación de firmas (ECDSA, Schnorr)
- Ejecución de Taproot/Tapscript
- Potenciales opcodes futuros (OP_CTV, OP_CAT)

**Archivos clave:** `src/script/`, `src/consensus/`

**Temas actuales:**
- OP_CHECKTEMPLATEVERIFY (BIP-119) — Primitiva de covenant
- OP_CAT — Re-habilitación del opcode de concatenación
- Great Script Restoration — Re-habilitación de opcodes deshabilitados

## Cómo Elegir

| Si disfrutas... | Considera... |
|-----------------|-------------|
| Redes y sistemas distribuidos | Red P2P |
| Diseño de algoritmos y optimización | Política de Mempool |
| Características orientadas al usuario y UX | Wallet |
| Rendimiento y optimización de bajo nivel | Interfaz de Minería |
| Criptografía y razonamiento formal | Script y Consenso |

La mayoría de los contribuidores comienzan revisando PRs en su área de interés antes de escribir su propio código. La revisión es la mejor forma de aprender un subsistema profundamente.

## Lectura Recomendada

- [Bitcoin Core PR Review Club](https://bitcoincore.reviews/) — Revisión semanal guiada de un PR
- [Bitcoin Optech](https://bitcoinops.org/) — Mantente al día con el desarrollo del protocolo
- [Delving Bitcoin](https://delvingbitcoin.org/) — Foro de discusión técnica
