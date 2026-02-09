---
sidebar_position: 2
title: Fundamentos de Bitcoin
description: Historia, filosofía y conceptos fundamentales de Bitcoin
---

# Fundamentos de Bitcoin

Entender Bitcoin significa comprender los problemas que resuelve, los principios detrás de su diseño y los bloques de construcción criptográficos que lo hacen funcionar.

## Historia y Filosofía

### El Problema

Antes de Bitcoin, el dinero digital tenía un problema fundamental: el **problema del doble gasto**. La información digital se puede copiar libremente, entonces ¿cómo evitas que alguien gaste el mismo dinero digital dos veces? Los intentos anteriores (DigiCash, e-gold, b-money, Bit Gold) requerían un tercero de confianza para llevar registro de los saldos.

### El Avance

En octubre de 2008, Satoshi Nakamoto publicó el [whitepaper de Bitcoin](https://bitcoin.org/bitcoin.pdf): *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. La innovación clave fue combinar varias tecnologías existentes en un sistema que resuelve el doble gasto sin un intermediario de confianza:

- **Proof of Work** — De Hashcash de Adam Back (1997)
- **Marcas de tiempo distribuidas** — De trabajos previos en servicios de timestamps
- **Árboles de Merkle** — Del trabajo de Ralph Merkle (1979)
- **Criptografía de clave pública** — De Diffie-Hellman y trabajos posteriores

La red Bitcoin se lanzó el **3 de enero de 2009**, cuando Satoshi minó el bloque génesis.

### Principios Fundamentales

- **Descentralización** — Ninguna entidad controla la red
- **Sin permisos** — Cualquiera puede participar sin aprobación
- **Resistencia a la censura** — Nadie puede evitar que transacciones válidas sean confirmadas
- **Oferta fija** — 21 millones de BTC máximo, aplicado por las reglas de consenso
- **Pseudonimia** — Las direcciones no están vinculadas a identidades del mundo real por defecto
- **Verificabilidad** — Cualquiera puede ejecutar un nodo y verificar cada transacción

## Criptografía Básica

### Funciones Hash

Bitcoin usa funciones hash criptográficas extensivamente. Una función hash toma una entrada arbitraria y produce una salida de tamaño fijo (el "hash" o "digest").

**SHA-256** (Secure Hash Algorithm, 256-bit) es la función hash principal de Bitcoin:

```
Input: "Hello"
SHA-256: 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
```

Propiedades que hacen útiles las funciones hash en Bitcoin:
- **Determinísticas** — La misma entrada siempre produce la misma salida
- **Unidireccionales** — No puedes revertir un hash para encontrar la entrada
- **Efecto avalancha** — Un cambio mínimo en la entrada cambia completamente la salida
- **Resistentes a colisiones** — Es computacionalmente inviable encontrar dos entradas con el mismo hash

Bitcoin también usa **RIPEMD-160** (combinado con SHA-256 como HASH160) para generar direcciones más cortas.

### Criptografía de Curva Elíptica

Bitcoin usa la curva elíptica **secp256k1** para pares de claves y firmas:

1. **Clave privada** — Un número aleatorio de 256 bits (tu secreto)
2. **Clave pública** — Derivada de la clave privada mediante multiplicación de curva elíptica (compartible)
3. **Dirección** — Derivada de la clave pública mediante hashing (lo que compartes con otros)

Las matemáticas aseguran que puedes ir de clave privada → clave pública → dirección, pero **nunca en reversa**.

### Firmas Digitales

Cuando envías Bitcoin, creas una **firma digital** usando tu clave privada. Esto demuestra que eres dueño de los fondos sin revelar tu clave privada. Bitcoin originalmente usó **ECDSA** (Elliptic Curve Digital Signature Algorithm) y ahora también soporta **firmas Schnorr** (agregadas en Taproot, 2021).

## Conceptos de Blockchain

### Bloques

Un bloque es una estructura de datos que contiene:
- **Encabezado del bloque** — Versión, hash del bloque anterior, raíz de Merkle, marca de tiempo, objetivo de dificultad, nonce
- **Transacciones** — La lista de transacciones incluidas en este bloque

Los bloques están encadenados incluyendo el hash del bloque anterior en cada nuevo encabezado de bloque — formando la **blockchain**.

### Proof of Work

Los mineros compiten para encontrar un nonce que, combinado con el encabezado del bloque, produce un hash por debajo del objetivo de dificultad actual. Este proceso:
- Requiere trabajo computacional significativo para encontrar un nonce válido
- Es trivial de verificar (solo hay que hashear el encabezado y verificar)
- Ajusta la dificultad cada 2,016 bloques (~2 semanas) para mantener intervalos de ~10 minutos entre bloques

### Consenso

Las reglas de consenso de Bitcoin definen qué hace válido a un bloque y una transacción. Cada nodo completo verifica independientemente cada bloque y transacción contra estas reglas. Ningún bloque se acepta por confianza — el lema es **"Don't trust, verify."**

## Lectura Recomendada

- [Whitepaper de Bitcoin](https://bitcoin.org/bitcoin.pdf) — El paper original de 9 páginas de Satoshi Nakamoto
- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) por Andreas Antonopoulos — Guía técnica completa
- [The Bitcoin Standard](https://saifedean.com/thebitcoinstandard/) por Saifedean Ammous — Contexto económico e histórico
- [Bitcoin Wiki](https://en.bitcoin.it/wiki/Main_Page) — Referencia técnica mantenida por la comunidad
