---
sidebar_position: 6
title: Seguridad y Criptografía
description: Modelos de amenazas, primitivas criptográficas y prácticas de seguridad en el desarrollo de Bitcoin
---

# Seguridad y Criptografía

La seguridad no es una característica en Bitcoin — es la base. Los desarrolladores de protocolo deben pensar de forma adversarial en cada nivel, desde las primitivas criptográficas hasta los ataques a nivel de red.

## Modelo de Amenazas

El modelo de seguridad de Bitcoin asume:

- **Los mineros pueden ser adversarios** — El sistema debe permanecer seguro incluso si una minoría de mineros es maliciosa
- **La red puede ser poco confiable** — Los nodos pueden perder conectividad, recibir mensajes retrasados o estar particionados
- **Los peers pueden mentir** — Nunca confíes en datos de un peer sin verificación independiente
- **El hardware puede fallar** — El software debe manejar crashes y corrupción de forma graceful

### Vectores de Ataque Comunes

| Ataque | Descripción | Mitigación |
|--------|-------------|------------|
| **Ataque del 51%** | Hashpower mayoritario reescribe el historial | Costo económico, consenso social |
| **Ataque Eclipse** | Aislar un nodo de la red real | Múltiples conexiones de peers, fuentes diversas |
| **Ataque Sybil** | Crear muchos peers falsos | Límites de conexión, gestión de direcciones |
| **Maleabilidad de transacciones** | Modificar txid sin invalidar | SegWit (separación de witness) |
| **Ataque Time-warp** | Manipular timestamps para bajar dificultad | Reglas de median-time-past |
| **Minería egoísta** | Retener bloques para obtener ventaja | Mejoras al protocolo, monitoreo |

## Primitivas Criptográficas

### Funciones Hash

| Función | Uso en Bitcoin | Tamaño de Salida |
|---------|---------------|------------------|
| SHA-256 | Hashing de bloques, txid, proof-of-work | 256 bits |
| RIPEMD-160 | Generación de direcciones (HASH160 = SHA256 + RIPEMD160) | 160 bits |
| SHA-256d | Doble SHA-256 para la mayoría del hashing interno | 256 bits |
| SipHash | Short txid del mempool, protección de tablas hash | 64 bits |
| SHA-512 | HMAC para derivación de claves BIP-32 | 512 bits |

### Criptografía de Curva Elíptica

Bitcoin usa la curva **secp256k1**:

- **Campo**: Campo primo de 256 bits
- **Generación de claves**: Clave privada (entero aleatorio de 256 bits) → Clave pública (multiplicación por punto en la curva)
- **Propiedad fundamental**: Fácil calcular `pubkey = privkey * G`, computacionalmente inviable revertir

### Esquemas de Firma

**ECDSA** (original):
- Usado para transacciones legacy y SegWit v0
- Las firmas son ~72 bytes (codificación DER)
- No nativamente agregable

**Schnorr** (Taproot, BIP-340):
- Estructura matemática más simple
- Firmas fijas de 64 bytes
- Soporta agregación de claves (MuSig2) — múltiples firmantes producen una sola firma
- Verificación por lotes más eficiente

### Hashes Etiquetados

Taproot introdujo **hashes etiquetados** para prevenir ataques entre protocolos:

```
tagged_hash(tag, msg) = SHA256(SHA256(tag) || SHA256(tag) || msg)
```

Cada contexto usa una etiqueta diferente (`TapLeaf`, `TapBranch`, `TapTweak`, etc.), asegurando que un hash de un contexto no pueda ser reinterpretado en otro.

## Prácticas de Seguridad en Bitcoin Core

### Divulgación Responsable

Bitcoin Core tiene una [política de seguridad](https://github.com/bitcoin/bitcoin/blob/master/SECURITY.md):

- Los bugs críticos se reportan privadamente a security@bitcoincore.org
- Las correcciones se coordinan antes de la divulgación pública
- Se asignan CVEs para vulnerabilidades rastreadas

### Programación Defensiva

- **Sin asignación dinámica de memoria en código de consenso** donde sea evitable
- **Verificaciones de desbordamiento** en todas las operaciones aritméticas
- **Operaciones en tiempo constante** para código criptográfico (prevenir ataques de timing)
- **Dependencias mínimas** — menos librerías externas = menor superficie de ataque
- **Compilaciones determinísticas** (Guix) — verificar que los binarios coincidan con el código fuente

## Lectura Recomendada

- [Bitcoin Security Model (Lopp)](https://blog.lopp.net/bitcoin-security-model/)
- [Mastering Bitcoin, Cap. 4: Claves y Direcciones](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04_keys.adoc)
- [BIP-340: Firmas Schnorr](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [Elliptic Curve Cryptography (Andrea Corbellini)](https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/)
