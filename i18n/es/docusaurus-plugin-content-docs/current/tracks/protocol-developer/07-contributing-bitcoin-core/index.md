---
sidebar_position: 7
title: Contribuir a Bitcoin Core
description: Cómo contribuir a Bitcoin Core - proceso de revisión, flujo de PRs y normas de la comunidad
---

# Contribuir a Bitcoin Core

Contribuir a Bitcoin Core es una de las cosas más impactantes que puedes hacer como desarrollador de protocolo. El proyecto es de código abierto, no necesitas permisos para contribuir, y siempre necesita revisores y desarrolladores reflexivos.

## Empieza con la Revisión

La mejor forma de comenzar a contribuir es **revisando pull requests**. La revisión es:

- El recurso más valioso y escaso en Bitcoin Core
- Cómo aprendes el código y las convenciones
- Cómo construyes confianza con otros contribuidores
- Necesaria antes de que tus propios PRs reciban atención

### Cómo Revisar

1. Elige un PR de la [lista de pull requests](https://github.com/bitcoin/bitcoin/pulls)
2. Lee la descripción del PR y los issues enlazados
3. Descarga la rama localmente y compílala
4. Lee los cambios de código cuidadosamente
5. Ejecuta los tests
6. Deja retroalimentación constructiva

### Señales de Revisión

| Señal | Significado |
|-------|-----------|
| **ACK** | Probado, código revisado, de acuerdo con el cambio |
| **NACK** | En desacuerdo con el enfoque (debe explicar por qué) |
| **utACK** | Código revisado, no probado, de acuerdo con el enfoque |
| **Concept ACK** | De acuerdo con el objetivo, no ha revisado el código |
| **Approach ACK** | De acuerdo con el enfoque técnico |

```
# Ejemplo de comentario de revisión
ACK abc1234

Probado en Ubuntu 22.04. Compilado con CMake, ejecutados tests unitarios
y tests funcionales relevantes (feature_block.py, p2p_segwit.py).
La revisión de código se ve bien. Una sugerencia menor abajo.
```

## Hacer Tu Primer PR

### Antes de Empezar

1. **Lee las guías de contribución**: `CONTRIBUTING.md` en el repo
2. **Lee las notas de desarrollo**: `doc/developer-notes.md`
3. **Empieza en pequeño** — Correcciones de documentación, mejoras de tests, refactorizaciones menores
4. **Un cambio lógico por commit** — Mantén los PRs enfocados

### Flujo de Trabajo de PR

```bash
# Fork y clonar
git clone https://github.com/TU_USUARIO/bitcoin.git
cd bitcoin
git remote add upstream https://github.com/bitcoin/bitcoin.git

# Crear una rama de feature
git checkout -b tu-rama-de-feature

# Hacer cambios, commit
git add -A
git commit -m "short: Descripción del cambio"

# Push y crear PR
git push origin tu-rama-de-feature
```

### Mensajes de Commit

Bitcoin Core sigue un formato específico de mensajes de commit:

```
subsystem: Descripción corta (máx ~50 caracteres)

Explicación más larga de qué y por qué (no cómo).
Ajustar a 72 caracteres.

Puede referenciar issues: Fixes #12345
```

Prefijos de subsistema: `consensus`, `net`, `wallet`, `rpc`, `test`, `build`, `doc`, `refactor`, `ci`, etc.

### Qué Hace un Buen PR

- **Enfocado** — Un cambio lógico, no un cajón de sastre
- **Bien probado** — Incluir tests unitarios y/o funcionales
- **Bien documentado** — Descripción clara de qué y por qué
- **Rebaseado** — Historial limpio sobre el master actual
- **Paciente** — La revisión toma tiempo; no esperes fusión inmediata

## El Proceso de Revisión

1. **CI se ejecuta** — Los builds y tests automatizados deben pasar
2. **Revisión de concepto** — Los maintainers evalúan si el cambio es deseable
3. **Revisión de código** — Múltiples revisores examinan el código
4. **Testing** — Los revisores prueban los cambios localmente
5. **Iteración** — Atender retroalimentación, actualizar PR
6. **Merge** — Un maintainer fusiona después de revisión suficiente

No hay un **número fijo** de revisiones requeridas. Los cambios críticos de consenso necesitan más revisión que refactorizaciones menores. Algunos PRs toman semanas; otros toman meses o años.

## Normas de la Comunidad

- **Sé paciente y respetuoso** — Todos son voluntarios
- **No hagas bump a tu PR** — Los revisores llegarán a él
- **Responde a la retroalimentación constructivamente** — Incluso si no estás de acuerdo
- **No tomes el rechazo personalmente** — Los NACKs son sobre el código, no sobre ti
- **Revisa PRs de otros** — Es la mejor forma de ganar revisión de los tuyos

## Obtener Ayuda

- [Bitcoin Core PR Review Club](https://bitcoincore.reviews/) — Sesiones de revisión guiada semanales
- [Delving Bitcoin](https://delvingbitcoin.org/) — Discusiones técnicas
- [Canales IRC de Bitcoin](https://bitcoin.org/en/development#irc-channels) — `#bitcoin-core-dev` en Libera Chat
- [Bitcoin Optech](https://bitcoinops.org/) — Actualizaciones semanales de desarrollo del protocolo

## Ruta Recomendada

1. Compilar Bitcoin Core desde el código fuente
2. Ejecutar la suite de tests
3. Unirse al PR Review Club por algunas semanas
4. Revisar 5-10 PRs (dejar comentarios, probar, dar ACK/NACK)
5. Encontrar un "good first issue" o mejora pequeña
6. Enviar tu primer PR
7. Continuar revisando mientras esperas retroalimentación
