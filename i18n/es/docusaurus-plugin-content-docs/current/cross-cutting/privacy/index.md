---
sidebar_position: 2
title: Privacidad
description: Técnicas de privacidad en Bitcoin - coin control, CoinJoin, Tor y contramedidas al análisis de cadena
---

# Privacidad

Bitcoin es pseudónimo, no anónimo. Cada transacción se registra públicamente en la blockchain. Sin prácticas deliberadas de privacidad, frecuentemente es posible vincular transacciones a identidades del mundo real. Entender la privacidad es esencial para todo desarrollador Bitcoin.

## Por Qué Importa la Privacidad

- **Fungibilidad** — Si las monedas pueden rastrearse y "contaminarse", Bitcoin pierde fungibilidad (todas las monedas deberían ser iguales)
- **Seguridad personal** — Saldos públicos pueden hacer que los usuarios sean objetivos de robo
- **Confidencialidad empresarial** — Las empresas no quieren que competidores vean sus transacciones
- **Libertad financiera** — Dinero resistente a la vigilancia es un valor central de Bitcoin

## Amenazas de Privacidad On-Chain

### Heurísticas Comunes Usadas en Análisis de Cadena

| Heurística | Cómo Funciona | Contramedida |
|-----------|---------------|--------------|
| **Reutilización de direcciones** | Misma dirección usada múltiples veces vincula transacciones | Generar nueva dirección para cada recepción |
| **Propiedad común de entradas** | Entradas en la misma transacción probablemente pertenecen al mismo wallet | CoinJoin, PayJoin |
| **Detección de cambio** | Identificar cuál salida es cambio vs. pago | Evitar montos redondos, usar mismo tipo de dirección |
| **Análisis de timing** | El timing de transacciones se correlaciona con actividad del usuario | Transmisión retrasada |
| **Correlación de montos** | Emparejar montos de entrada/salida entre transacciones | Romper montos con CoinJoin |
| **Ataques de dust** | UTXOs pequeños enviados para rastrear gastos | Coin control, ignorar dust |

## Técnicas de Privacidad

### Coin Control

Coin control permite a los usuarios elegir qué UTXOs gastar en una transacción, previniendo vinculación no deseada:

```bash
# Listar UTXOs con etiquetas
bitcoin-cli listunspent

# Enviar usando UTXOs específicos
bitcoin-cli -named send outputs='{"bc1q...": 0.5}' \
  options='{"inputs": [{"txid": "abc...", "vout": 0}]}'
```

Todo wallet que maneje privacidad debería implementar coin control. Los usuarios necesitan decidir qué monedas combinar en una transacción.

### CoinJoin

CoinJoin combina las transacciones de múltiples usuarios en una sola, rompiendo el vínculo entre entradas y salidas:

```
Transacción tradicional:
  Alice (1 BTC) → Bob (0.8 BTC) + cambio de Alice (0.2 BTC)

CoinJoin:
  Alice (1 BTC)  ┐     ┌ ? (0.5 BTC)
  Bob (0.5 BTC)  ├─tx─→├ ? (0.5 BTC)
  Carol (0.5 BTC)┘     ├ ? (0.5 BTC)
                        └ ? (0.5 BTC)
```

Con salidas del mismo tamaño, un observador no puede determinar qué entrada financió qué salida.

**Implementaciones:**
- [Joinmarket](https://github.com/JoinMarket-Org/joinmarket-clientserver) — Modelo maker/taker, descentralizado
- [Wasabi Wallet](https://wasabiwallet.io/) — CoinJoin integrado con protocolo WabiSabi

### PayJoin (BIP-78)

PayJoin involucra al receptor contribuyendo una entrada a la transacción, rompiendo la heurística de propiedad común de entradas:

```
Pago normal:
  Entrada del emisor → Salida del receptor + Cambio del emisor

PayJoin:
  Entrada del emisor + Entrada del receptor → Salida del receptor + Cambio del emisor
```

Para un observador, parece que todas las entradas pertenecen al emisor — lo cual no es cierto. Esto mejora la privacidad para ambas partes.

### Privacidad a Nivel de Red

#### Tor

Ejecutar Bitcoin Core sobre Tor oculta tu dirección IP de los peers:

```ini
# bitcoin.conf
proxy=127.0.0.1:9050
listen=1
onlynet=onion
```

#### Dandelion++ (BIP-156)

Dandelion++ cambia cómo se propagan las transacciones para prevenir vincular una transacción al IP de origen:

1. **Fase stem** — La transacción se retransmite a través de una ruta aleatoria de nodos (uno a la vez)
2. **Fase fluff** — La transacción se transmite normalmente a toda la red

Esto dificulta que nodos espía determinen qué nodo originó una transacción.

### Silent Payments (BIP-352)

Silent Payments permiten recibir a un identificador público estático sin reutilización de direcciones:

- El receptor publica una **dirección de silent payment** (estática, reutilizable)
- El emisor deriva una dirección on-chain única usando ECDH
- Cada pago va a una dirección diferente on-chain
- No se requiere interacción entre emisor y receptor

Esto resuelve el problema de reutilización de direcciones sin requerir un servidor o interacción.

## Privacidad para Desarrolladores

Al construir aplicaciones Bitcoin:

- **Privacidad por defecto** — Generar nuevas direcciones por defecto, nunca reutilizar
- **Implementar coin control** — Dejar que los usuarios elijan qué UTXOs gastar
- **Evitar recolección innecesaria de datos** — No registrar direcciones IP con transacciones
- **Usar tu propio nodo** — No filtrar direcciones de usuario a APIs de terceros
- **Soportar Tor** — Permitir a los usuarios conectarse vía Tor
- **Etiquetar UTXOs** — Ayudar a los usuarios a entender la procedencia de sus monedas
- **Considerar PayJoin** — Implementar BIP-78 para recibir pagos

## Lectura Recomendada

- [Bitcoin Privacy Wiki](https://en.bitcoin.it/wiki/Privacy)
- [BIP-78: PayJoin](https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki)
- [BIP-352: Silent Payments](https://github.com/bitcoin/bips/blob/master/bip-0352.mediawiki)
- [Bitcoin Design Guide: Privacy](https://bitcoin.design/guide/how-it-works/privacy/)
- [OXT Research](https://oxt.me/) — Análisis de cadena e investigación de privacidad
