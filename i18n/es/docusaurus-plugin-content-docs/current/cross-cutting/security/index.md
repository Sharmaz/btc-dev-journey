---
sidebar_position: 1
title: Seguridad
description: Prácticas de seguridad para desarrollo Bitcoin - gestión de claves, modelado de amenazas y codificación segura
---

# Seguridad

La seguridad en el desarrollo de Bitcoin no es negociable. Estás construyendo software que maneja dinero real — una sola vulnerabilidad puede significar pérdida irreversible de fondos. Esta sección cubre principios de seguridad que aplican a todos los tracks de especialización.

Para primitivas criptográficas específicas de Bitcoin Core, consulta [Seguridad y Criptografía](/docs/tracks/protocol-developer/security-cryptography).

## Gestión de Claves

El desafío de seguridad más crítico en cualquier aplicación Bitcoin.

### Principios

- **Nunca almacenes claves privadas en texto plano** — Encripta en reposo usando encriptación fuerte (AES-256-GCM)
- **Minimiza la exposición de claves** — Las claves solo deben desencriptarse en memoria, por el menor tiempo posible
- **Usa módulos de seguridad de hardware (HSMs)** o hardware wallets para firmar cuando sea posible
- **Implementa rotación de claves** — Ten un plan para rotar claves comprometidas
- **Separa claves hot y cold** — Solo mantén los fondos mínimos necesarios en hot wallets

### Estrategias de Respaldo

| Estrategia | Pros | Contras |
|------------|------|---------|
| **Semilla mnemónica (BIP-39)** | Legible por humanos, portátil | Punto único de fallo si no se divide |
| **Shamir's Secret Sharing** | Recuperación por umbral (ej: 3-de-5) | Configuración más compleja |
| **Respaldo en metal** | Resistente al fuego/agua | Requiere seguridad física |
| **Multi-ubicación** | Resiliente a desastres locales | Overhead de coordinación |

### Errores Comunes

- Registrar claves privadas o mnemónicos en logs
- Almacenar claves en variables de entorno o archivos de configuración en control de versiones
- Usar aleatoriedad débil para generación de claves
- No encriptar archivos de wallet en disco
- Reutilizar claves entre diferentes aplicaciones

## Modelado de Amenazas

Antes de escribir código, entiende contra qué te estás defendiendo.

### Modelo STRIDE Aplicado a Bitcoin

| Amenaza | Ejemplo en Bitcoin | Mitigación |
|---------|-------------------|------------|
| **Suplantación** | Nodo falso sirviendo datos falsos | Verificar contra nodo completo |
| **Manipulación** | Transacción modificada antes de transmitir | Firmar transacciones del lado del cliente |
| **Repudio** | Negar que se realizó un pago | La blockchain es la prueba |
| **Divulgación de Información** | Reutilización de direcciones revela saldo | Nueva dirección por transacción |
| **Denegación de Servicio** | Nodo abrumado con solicitudes | Limitación de tasa, límites de conexión |
| **Elevación de Privilegios** | Acceso RPC sin autenticación | Credenciales RPC fuertes, firewall |

### Amenazas Específicas de Aplicación

- **Sustitución de direcciones** — Malware reemplaza direcciones mostradas (verificar en dispositivo hardware)
- **Fee sniping** — Atacante re-mina bloques para robar transacciones (usar `nLockTime`)
- **Ataques de dust** — UTXOs pequeños enviados para rastrear patrones de gasto (coin control)
- **Ataques de cadena de suministro** — Dependencias comprometidas (verificar firmas, minimizar deps)

## Prácticas de Codificación Segura

### Validación de Entradas

```
✓ Validar todas las direcciones antes de enviar (checksum, red)
✓ Validar montos de transacción (positivos, dentro del rango)
✓ Validar tasas de comisión (límites razonables, no absurdamente altas)
✓ Sanitizar toda entrada de usuario antes de llamadas RPC
✗ Nunca construir comandos RPC mediante concatenación de strings
```

### Gestión de Dependencias

- Fijar versiones de dependencias
- Verificar integridad de paquetes (checksums, firmas)
- Auditar dependencias por vulnerabilidades conocidas
- Preferir librerías Bitcoin bien auditadas sobre cripto de propósito general
- Minimizar el número total de dependencias

### Testing de Seguridad

- **Fuzz testing** en código de parsing y deserialización
- **Probar con entradas inválidas** — Transacciones, direcciones y scripts malformados
- **Probar casos límite de comisiones** — Comisión cero, comisión máxima, montos de dust
- **Probar acceso concurrente** — Condiciones de carrera en operaciones de wallet
- **Revisar manejo de errores** — Asegurar que las fallas no filtren datos sensibles

## Seguridad Operacional

### Seguridad del Nodo

- Ejecuta tu propio nodo completo (no confíes en nodos de terceros para validación)
- Mantén Bitcoin Core actualizado a la última versión estable
- Protege el puerto RPC (8332/18332/18443) con firewall — nunca expongas a internet
- Usa credenciales RPC fuertes y únicas
- Habilita Tor para privacidad de red

### Despliegue en Producción

- Separar la firma de la transmisión (firma con air-gap)
- Implementar límites de tasa en APIs de retiro
- Usar multi-firma para fondos organizacionales
- Monitorear patrones de transacción inusuales
- Tener un plan de respuesta a incidentes para compromiso de claves

## Lectura Recomendada

- [Bitcoin Security Model (Lopp)](https://blog.lopp.net/bitcoin-security-model/)
- [Cryptocurrency Security Standard (CCSS)](https://cryptoconsortium.org/certification/ccss/)
- [Bitcoin Design Guide: Security](https://bitcoin.design/guide/how-it-works/private-key-management/)
- [OWASP for Bitcoin](https://owasp.org/) — Aplicar principios de seguridad web a apps Bitcoin
