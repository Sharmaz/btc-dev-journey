export type NodeData = {
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs: string;
  links: { label: string; labelEs: string; href: string }[];
  notRecommended?: boolean;
};

export const NODE_DATA: Record<string, NodeData> = {

  // ── Fundamentals ──────────────────────────────────────────────────────────

  'prerequisites': {
    title: 'Prerequisites',
    titleEs: 'Prerequisitos',
    description: 'Core computer science fundamentals required before diving into Bitcoin: programming in C++, Python or Rust, basic cryptography (hash functions, digital signatures), networking concepts, and data structures.',
    descriptionEs: 'Fundamentos de informática requeridos antes de adentrarse en Bitcoin: programación en C++, Python o Rust, criptografía básica (funciones hash, firmas digitales), conceptos de redes y estructuras de datos.',
    links: [
      { label: 'Prerequisites guide', labelEs: 'Prerequisitos', href: '/docs/fundamentals/prerequisites' },
    ],
  },

  'bitcoin-fundamentals': {
    title: 'Bitcoin Fundamentals',
    titleEs: 'Fundamentos de Bitcoin',
    description: 'How Bitcoin works end-to-end: the UTXO model, transactions and their structure, blocks, Proof of Work consensus, wallets, keys, and the Bitcoin scripting language.',
    descriptionEs: 'Cómo funciona Bitcoin de principio a fin: el modelo UTXO, transacciones y su estructura, bloques, consenso Proof of Work, wallets, claves y el lenguaje de scripting de Bitcoin.',
    links: [
      { label: 'Bitcoin Fundamentals', labelEs: 'Fundamentos de Bitcoin', href: '/docs/fundamentals/bitcoin-fundamentals' },
    ],
  },

  'bitcoin-architecture': {
    title: 'Bitcoin Architecture',
    titleEs: 'Arquitectura de Bitcoin',
    description: 'The internal architecture of a Bitcoin node: modules, data storage (LevelDB), mempool management, block validation pipeline, and how all components interact.',
    descriptionEs: 'La arquitectura interna de un nodo Bitcoin: módulos, almacenamiento de datos (LevelDB), gestión del mempool, pipeline de validación de bloques y cómo interactúan todos los componentes.',
    links: [
      { label: 'Bitcoin Architecture', labelEs: 'Arquitectura de Bitcoin', href: '/docs/fundamentals/bitcoin-architecture' },
    ],
  },

  'p2p-network': {
    title: 'P2P Network',
    titleEs: 'Red P2P',
    description: "Bitcoin's peer-to-peer network: node discovery via DNS seeds, the gossip protocol for transaction and block propagation, compact blocks, and network security considerations.",
    descriptionEs: 'La red peer-to-peer de Bitcoin: descubrimiento de nodos vía DNS seeds, el protocolo gossip para la propagación de transacciones y bloques, compact blocks y consideraciones de seguridad de red.',
    links: [
      { label: 'P2P Network', labelEs: 'Red P2P', href: '/docs/fundamentals/p2p-network' },
    ],
  },

  'basic-development': {
    title: 'Basic Development',
    titleEs: 'Desarrollo Básico',
    description: 'Essential developer tooling: setting up a Bitcoin development environment, running regtest/signet nodes, using bitcoin-cli, reading RPC documentation, and writing your first scripts.',
    descriptionEs: 'Herramientas esenciales para desarrolladores: configurar un entorno de desarrollo Bitcoin, ejecutar nodos en regtest/signet, usar bitcoin-cli, leer la documentación RPC y escribir tus primeros scripts.',
    links: [
      { label: 'Basic Development', labelEs: 'Desarrollo Básico', href: '/docs/fundamentals/basic-development' },
    ],
  },

  // ── Decision ──────────────────────────────────────────────────────────────

  'choose-your-track': {
    title: 'Choose Your Track',
    titleEs: 'Elige Tu Track',
    description: 'Bitcoin development has several specialization paths. Choose based on your goals: Protocol (Bitcoin Core contributions), Application (wallets, payment apps), Infrastructure (nodes, indexers), or Mining.',
    descriptionEs: 'El desarrollo Bitcoin tiene varios caminos de especialización. Elige según tus objetivos: Protocolo (contribuciones a Bitcoin Core), Aplicaciones (wallets, apps de pago), Infraestructura (nodos, indexadores) o Minería.',
    links: [
      { label: 'Developer Types overview', labelEs: 'Tipos de desarrolladores', href: '/docs/roadmap/developer-types' },
    ],
  },

  // ── Protocol Developer ────────────────────────────────────────────────────

  'protocol-developer': {
    title: 'Protocol Developer',
    titleEs: 'Desarrollador de Protocolo',
    description: 'Protocol developers work on Bitcoin Core and related consensus-critical software. This path requires deep C++ knowledge, understanding of the codebase internals, and rigorous testing practices.',
    descriptionEs: 'Los desarrolladores de protocolo trabajan en Bitcoin Core y software crítico para el consenso. Este camino requiere conocimiento profundo de C++, comprensión de los internos del código y prácticas rigurosas de testing.',
    links: [
      { label: 'Protocol Developer track', labelEs: 'Track de Desarrollador de Protocolo', href: '/docs/tracks/protocol-developer' },
    ],
  },

  'bitcoin-core-internals': {
    title: 'Bitcoin Core Internals',
    description: "Deep dive into Bitcoin Core's source code: the validation engine, script interpreter, wallet subsystem, RPC server, and how the different modules communicate.",
    descriptionEs: 'Inmersión profunda en el código fuente de Bitcoin Core: el motor de validación, el intérprete de scripts, el subsistema de wallet, el servidor RPC y cómo los diferentes módulos se comunican.',
    links: [
      { label: 'Bitcoin Core Internals', labelEs: 'Bitcoin Core Internals', href: '/docs/tracks/protocol-developer/bitcoin-core-internals' },
    ],
  },

  'code-architecture': {
    title: 'Code Architecture',
    description: "Bitcoin Core's architectural patterns: the separation between consensus, net processing, and wallet layers; the use of interfaces to decouple components; and the build system.",
    descriptionEs: 'Los patrones arquitectónicos de Bitcoin Core: la separación entre capas de consenso, procesamiento de red y wallet; el uso de interfaces para desacoplar componentes; y el sistema de build.',
    links: [
      { label: 'Code Architecture', labelEs: 'Arquitectura del código', href: '/docs/tracks/protocol-developer/bitcoin-core-internals/code-architecture' },
    ],
  },

  'consensus-mechanisms': {
    title: 'Consensus Mechanisms',
    description: 'How Bitcoin achieves distributed consensus: Nakamoto consensus, chain selection rules, checkpoints, and the critical validation logic that every node enforces identically.',
    descriptionEs: 'Cómo Bitcoin logra el consenso distribuido: el consenso de Nakamoto, reglas de selección de cadena, checkpoints y la lógica de validación crítica que cada nodo ejecuta de forma idéntica.',
    links: [
      { label: 'Consensus Rules', labelEs: 'Reglas de Consenso', href: '/docs/tracks/protocol-developer/bitcoin-core-internals/consensus' },
    ],
  },

  'proto-languages-tools': {
    title: 'Languages & Tools',
    description: 'The languages and tooling used in protocol development: C++17/20 for Bitcoin Core, Python for the functional test framework, GDB/LLDB for debugging, and sanitizers (ASan, UBSan).',
    descriptionEs: 'Los lenguajes y herramientas usados en desarrollo de protocolo: C++17/20 para Bitcoin Core, Python para el framework de pruebas funcionales, GDB/LLDB para depuración y sanitizadores (ASan, UBSan).',
    links: [
      { label: 'Languages & Tools', labelEs: 'Languages & Tools', href: '/docs/tracks/protocol-developer/languages-tools' },
    ],
  },

  'proto-testing': {
    title: 'Testing',
    description: "Bitcoin Core's layered testing strategy: unit tests with Boost.Test, functional tests in Python, fuzz testing with libFuzzer, and test framework utilities for scenario simulation.",
    descriptionEs: 'La estrategia de testing en capas de Bitcoin Core: pruebas unitarias con Boost.Test, pruebas funcionales en Python, fuzzing con libFuzzer y utilidades del framework de pruebas para simulación de escenarios.',
    links: [
      { label: 'Testing', labelEs: 'Testing', href: '/docs/tracks/protocol-developer/testing' },
    ],
  },

  'bips': {
    title: 'BIPs',
    description: 'Bitcoin Improvement Proposals — the formal process for proposing protocol changes. Learn to read, implement, and write BIPs, and understand the lifecycle from draft to final.',
    descriptionEs: 'Bitcoin Improvement Proposals — el proceso formal para proponer cambios al protocolo. Aprende a leer, implementar y escribir BIPs, y comprende el ciclo de vida desde borrador hasta final.',
    links: [
      { label: 'BIPs', labelEs: 'BIPs', href: '/docs/tracks/protocol-developer/bips' },
    ],
  },

  'specialization-areas': {
    title: 'Specialization Areas',
    description: 'Advanced areas within protocol development: script and taproot, libsecp256k1, the P2P layer, mempool policy, fee estimation, or the UTXO set and its performance.',
    descriptionEs: 'Áreas avanzadas dentro del desarrollo de protocolo: script y taproot, libsecp256k1, la capa P2P, política del mempool, estimación de comisiones o el conjunto UTXO y su rendimiento.',
    links: [
      { label: 'Specialization Areas', labelEs: 'Áreas de especialización', href: '/docs/tracks/protocol-developer/specialization-areas' },
    ],
  },

  'security-cryptography': {
    title: 'Security & Cryptography',
    description: 'Cryptographic primitives used in Bitcoin: SHA-256, RIPEMD-160, secp256k1 elliptic curve, Schnorr signatures, MuSig2, and secure coding practices to avoid consensus bugs.',
    descriptionEs: 'Primitivas criptográficas usadas en Bitcoin: SHA-256, RIPEMD-160, curva elíptica secp256k1, firmas Schnorr, MuSig2 y prácticas de código seguro para evitar bugs de consenso.',
    links: [
      { label: 'Security & Cryptography', labelEs: 'Security & Cryptography', href: '/docs/tracks/protocol-developer/security-cryptography' },
    ],
  },

  'contributing-to-core': {
    title: 'Contributing to Core',
    description: 'How to contribute to Bitcoin Core: the review process on GitHub, writing good commit messages, the ACK/NACK culture, getting your first PR merged, and building a reputation as a reviewer.',
    descriptionEs: 'Cómo contribuir a Bitcoin Core: el proceso de revisión en GitHub, escribir buenos mensajes de commit, la cultura ACK/NACK, lograr que tu primer PR sea aceptado y construir reputación como revisor.',
    links: [
      { label: 'Contributing to Core', labelEs: 'Contribuir al Core', href: '/docs/tracks/protocol-developer/contributing-bitcoin-core' },
    ],
  },

  // ── Application Developer ─────────────────────────────────────────────────

  'application-developer': {
    title: 'Application Developer',
    titleEs: 'Desarrollador de Aplicaciones',
    description: 'Application developers build wallets, payment processors, exchanges, and other Bitcoin-powered products using RPC APIs, libraries, and SDKs — without modifying the protocol itself.',
    descriptionEs: 'Los desarrolladores de aplicaciones construyen wallets, procesadores de pago, exchanges y otros productos Bitcoin usando APIs RPC, librerías y SDKs — sin modificar el protocolo base.',
    links: [
      { label: 'Application Developer track', labelEs: 'Track de Desarrollador de Aplicaciones', href: '/docs/tracks/application-developer' },
    ],
  },

  'libraries-sdks': {
    title: 'Libraries & SDKs',
    description: 'The ecosystem of Bitcoin libraries across different languages: transaction construction, key derivation (BIP32/39/44), address encoding, and signing — without running a full node.',
    descriptionEs: 'El ecosistema de librerías Bitcoin en diferentes lenguajes: construcción de transacciones, derivación de claves (BIP32/39/44), codificación de direcciones y firma — sin ejecutar un nodo completo.',
    links: [
      { label: 'Libraries & SDKs', labelEs: 'Librerías y SDKs', href: '/docs/tracks/application-developer/libraries-sdks' },
    ],
  },

  'js-typescript': {
    title: 'JavaScript / TypeScript',
    description: 'Key JS/TS libraries: bitcoinjs-lib for transaction building, @scure/btc-signer, and the Bitcoin Dev Kit (BDK) WASM bindings. Ideal for web wallets and Node.js backends.',
    descriptionEs: 'Librerías clave de JS/TS: bitcoinjs-lib para construcción de transacciones, @scure/btc-signer y los bindings WASM del Bitcoin Dev Kit (BDK). Ideal para wallets web y backends en Node.js.',
    links: [
      { label: 'JavaScript / TypeScript', labelEs: 'JavaScript / TypeScript', href: '/docs/tracks/application-developer/libraries-sdks/javascript-typescript' },
    ],
  },

  'python': {
    title: 'Python',
    description: 'Python Bitcoin libraries: python-bitcoinlib, bit, and the bitcoin-utils package. Great for scripting, analytics, and rapid prototyping of Bitcoin applications.',
    descriptionEs: 'Librerías Bitcoin en Python: python-bitcoinlib, bit y el paquete bitcoin-utils. Perfectas para scripting, análisis y prototipado rápido de aplicaciones Bitcoin.',
    links: [
      { label: 'Python', labelEs: 'Python', href: '/docs/tracks/application-developer/libraries-sdks/python' },
    ],
  },

  'rust': {
    title: 'Rust',
    description: 'Rust is the fastest-growing language in the Bitcoin ecosystem. Key libraries: rust-bitcoin, BDK (Bitcoin Dev Kit), and LDK (Lightning Dev Kit) for memory-safe, high-performance apps.',
    descriptionEs: 'Rust es el lenguaje de más rápido crecimiento en el ecosistema Bitcoin. Librerías clave: rust-bitcoin, BDK (Bitcoin Dev Kit) y LDK (Lightning Dev Kit) para aplicaciones de alto rendimiento y memoria segura.',
    links: [
      { label: 'Rust', labelEs: 'Rust', href: '/docs/tracks/application-developer/libraries-sdks/rust' },
    ],
  },

  'go': {
    title: 'Go',
    description: "Go Bitcoin libraries: btcd for full-node functionality, btcutil for address handling, and lnd's base packages. Popular in backend infrastructure and Lightning Network tooling.",
    descriptionEs: 'Librerías Bitcoin en Go: btcd para funcionalidad de nodo completo, btcutil para manejo de direcciones y los paquetes base de lnd. Populares en infraestructura backend y herramientas de Lightning Network.',
    links: [
      { label: 'Go', labelEs: 'Go', href: '/docs/tracks/application-developer/libraries-sdks/go' },
    ],
  },

  'wallet-development': {
    title: 'Wallet Development',
    description: 'Building Bitcoin wallets: HD key derivation (BIP32/39/44), UTXO management, fee estimation, transaction signing, hardware wallet integration (PSBT), and backup/recovery flows.',
    descriptionEs: 'Construcción de wallets Bitcoin: derivación de claves HD (BIP32/39/44), gestión de UTXOs, estimación de comisiones, firma de transacciones, integración de hardware wallet (PSBT) y flujos de backup/recuperación.',
    links: [
      { label: 'Wallet Development', labelEs: 'Desarrollo de wallets', href: '/docs/tracks/application-developer/wallet-development' },
    ],
  },

  'payment-processing': {
    title: 'Payment Processing',
    description: 'Integrating Bitcoin payments: generating addresses, monitoring the mempool for incoming transactions, confirmation tracking, BIP21 payment URIs, and handling refunds.',
    descriptionEs: 'Integración de pagos Bitcoin: generación de direcciones, monitoreo del mempool para transacciones entrantes, seguimiento de confirmaciones, URIs de pago BIP21 y gestión de reembolsos.',
    links: [
      { label: 'Payment Processing', labelEs: 'Procesamiento de pagos', href: '/docs/tracks/application-developer/payment-processing' },
    ],
  },

  'exchange-trading': {
    title: 'Exchange & Trading',
    description: 'Building exchange infrastructure: hot/cold wallet architecture, atomic swaps, HTLC-based trading, liquidity management, and regulatory compliance considerations.',
    descriptionEs: 'Construcción de infraestructura de exchange: arquitectura hot/cold wallet, atomic swaps, trading basado en HTLC, gestión de liquidez y consideraciones de cumplimiento regulatorio.',
    links: [
      { label: 'Exchange & Trading', labelEs: 'Exchange & Trading', href: '/docs/tracks/application-developer/exchange-trading' },
    ],
  },

  'web3-bitcoin': {
    title: 'Web3 on Bitcoin',
    description: "Ordinals, BRC-20 tokens, Runes, and Stamps embed arbitrary data in Bitcoin block space. These protocols are widely considered spam — they bloat the blockchain, raise fees, and undermine Bitcoin's purpose as sound, censorship-resistant money. The Bitcoin standard is clear: Bitcoin is money, not a general-purpose data layer. This topic is included for awareness, not endorsement.",
    descriptionEs: 'Ordinals, tokens BRC-20, Runes y Stamps insertan datos arbitrarios en el espacio de bloques de Bitcoin. Estos protocolos son ampliamente considerados spam: inflan la blockchain, elevan las comisiones y socavan el propósito de Bitcoin como dinero sólido y resistente a la censura. El estándar Bitcoin es claro: Bitcoin es dinero, no una capa de almacenamiento de datos de propósito general. Este tema se incluye para tomar conciencia, no como respaldo.',
    links: [
      { label: 'Web3 on Bitcoin', labelEs: 'Web3 en Bitcoin', href: '/docs/tracks/application-developer/web3-bitcoin' },
    ],
    notRecommended: true,
  },

  'advanced-protocols': {
    title: 'Advanced Protocols',
    description: 'Advanced Bitcoin protocols built on top of the base layer: payment channels, DLCs (Discreet Log Contracts), multi-party computation, threshold signatures, and covenants.',
    descriptionEs: 'Protocolos Bitcoin avanzados construidos sobre la capa base: canales de pago, DLCs (Discreet Log Contracts), computación multipartidaria, firmas de umbral y covenants.',
    links: [
      { label: 'Advanced Protocols', labelEs: 'Protocolos avanzados', href: '/docs/tracks/application-developer/advanced-protocols' },
    ],
  },

  'protocols-on-bitcoin': {
    title: 'Protocols on Bitcoin',
    description: 'Layer 2 and sidechain protocols: Lightning Network for micropayments, RGB for smart contracts, Liquid for confidential transactions, and Rootstock (RSK) for EVM compatibility.',
    descriptionEs: 'Protocolos Layer 2 y sidechains: Lightning Network para micropagos, RGB para smart contracts, Liquid para transacciones confidenciales y Rootstock (RSK) para compatibilidad con EVM.',
    links: [
      { label: 'Protocols on Bitcoin', labelEs: 'Protocolos en Bitcoin', href: '/docs/tracks/application-developer/protocols-on-bitcoin' },
    ],
  },

  // ── Infrastructure Developer ───────────────────────────────────────────────

  'infrastructure-developer': {
    title: 'Infrastructure Developer',
    titleEs: 'Desarrollador de Infraestructura',
    description: 'Infrastructure developers build and maintain the services that power the Bitcoin ecosystem: block explorers, indexers, node hosting, APIs, and monitoring systems.',
    descriptionEs: 'Los desarrolladores de infraestructura construyen y mantienen los servicios que impulsan el ecosistema Bitcoin: exploradores de bloques, indexadores, hosting de nodos, APIs y sistemas de monitoreo.',
    links: [],
  },

  'block-explorers': {
    title: 'Block Explorers',
    description: 'Building block explorer services: parsing raw blocks and transactions, storing them in a queryable database, and exposing a web UI or API for users to inspect the blockchain.',
    descriptionEs: 'Construcción de servicios de explorador de bloques: parseo de bloques y transacciones, almacenamiento en base de datos consultable y exposición de una interfaz web o API para inspeccionar la blockchain.',
    links: [],
  },

  'blockchain-indexers': {
    title: 'Blockchain Indexers',
    description: 'Indexing the blockchain for fast queries: address history indexing, UTXO set snapshots, Electrum server protocol, and tools like Electrs, Fulcrum, and Esplora.',
    descriptionEs: 'Indexación de la blockchain para consultas rápidas: indexación del historial de direcciones, snapshots del conjunto UTXO, protocolo del servidor Electrum y herramientas como Electrs, Fulcrum y Esplora.',
    links: [],
  },

  'node-infrastructure': {
    title: 'Node Infrastructure',
    description: 'Running Bitcoin nodes at scale: hardware requirements, pruned vs. full vs. archival nodes, automated deployment with Docker/Kubernetes, and high-availability setups.',
    descriptionEs: 'Ejecución de nodos Bitcoin a escala: requisitos de hardware, nodos podados vs. completos vs. archivales, despliegue automatizado con Docker/Kubernetes y configuraciones de alta disponibilidad.',
    links: [],
  },

  'apis-data-services': {
    title: 'APIs & Data Services',
    description: 'Exposing Bitcoin data via APIs: RESTful and WebSocket APIs for wallet backends, fee rate oracles, mempool analytics, and on-chain metrics dashboards.',
    descriptionEs: 'Exposición de datos Bitcoin vía APIs: APIs REST y WebSocket para backends de wallet, oráculos de tasa de comisiones, análisis del mempool y dashboards de métricas on-chain.',
    links: [],
  },

  'monitoring-devops': {
    title: 'Monitoring & DevOps',
    description: 'Keeping Bitcoin infrastructure healthy: Prometheus/Grafana metrics, alerting on chain reorgs or stuck mempool, log aggregation, and incident response playbooks.',
    descriptionEs: 'Mantenimiento de la infraestructura Bitcoin: métricas con Prometheus/Grafana, alertas sobre reorganizaciones de cadena o mempool bloqueado, agregación de logs y playbooks de respuesta a incidentes.',
    links: [],
  },

  // ── Mining Developer ──────────────────────────────────────────────────────

  'mining-developer': {
    title: 'Mining Developer',
    titleEs: 'Desarrollador de Minería',
    description: 'Mining developers build and optimize the software stack that turns energy into Bitcoin: pool software, Stratum server implementations, firmware for ASICs, and analytics.',
    descriptionEs: 'Los desarrolladores de minería construyen y optimizan el stack de software que convierte energía en Bitcoin: software de pool, implementaciones del servidor Stratum, firmware para ASICs y analíticas.',
    links: [],
  },

  'stratum-protocol': {
    title: 'Stratum Protocol',
    description: 'The Stratum protocol (v1 and v2) used for pool-miner communication: job assignment, share submission, difficulty adjustment, and Stratum V2 improvements for miner sovereignty.',
    descriptionEs: 'El protocolo Stratum (v1 y v2) usado para la comunicación pool-minero: asignación de trabajos, envío de shares, ajuste de dificultad y las mejoras de Stratum V2 para la soberanía del minero.',
    links: [],
  },

  'mining-pool-software': {
    title: 'Mining Pool Software',
    description: 'Building mining pool backends: share accounting, payout schemes (PPS, PPLNS, FPPS), vardiff, database design for high-throughput share ingestion, and pool security.',
    descriptionEs: 'Construcción de backends de pools de minería: contabilidad de shares, esquemas de pago (PPS, PPLNS, FPPS), vardiff, diseño de base de datos para ingesta de shares de alto rendimiento y seguridad del pool.',
    links: [],
  },

  'asic-firmware': {
    title: 'ASIC Firmware',
    description: 'Low-level firmware development for Bitcoin mining ASICs: hashboard control, frequency tuning, thermal management, and interfacing with pool software via Stratum.',
    descriptionEs: 'Desarrollo de firmware de bajo nivel para ASICs de minería Bitcoin: control de hashboard, ajuste de frecuencia, gestión térmica e interfaz con el software del pool vía Stratum.',
    links: [],
  },

  'performance-optimization': {
    title: 'Performance Optimization',
    description: 'Maximizing mining efficiency: SHA-256 hardware optimization, overclocking, undervolting, network latency reduction for faster block propagation, and profitability modeling.',
    descriptionEs: 'Maximización de la eficiencia de minería: optimización de hardware SHA-256, overclocking, undervolting, reducción de latencia de red para propagación más rápida de bloques y modelado de rentabilidad.',
    links: [],
  },

  'mining-analytics': {
    title: 'Mining Analytics',
    description: 'Data analysis for mining operations: hashrate monitoring, pool luck tracking, difficulty adjustment forecasting, energy cost modeling, and competitive analysis dashboards.',
    descriptionEs: 'Análisis de datos para operaciones de minería: monitoreo de hashrate, seguimiento de suerte del pool, pronóstico de ajuste de dificultad, modelado de costos de energía y dashboards de análisis competitivo.',
    links: [],
  },

  // ── Cross-Cutting ─────────────────────────────────────────────────────────

  'cross-security': {
    title: 'Security',
    description: 'Security practices that apply across all Bitcoin development: key management, secure RNG, side-channel attacks, supply chain security, threat modeling, and responsible disclosure.',
    descriptionEs: 'Prácticas de seguridad aplicables a todo el desarrollo Bitcoin: gestión de claves, RNG seguro, ataques de canal lateral, seguridad de cadena de suministro, modelado de amenazas y divulgación responsable.',
    links: [
      { label: 'Security', labelEs: 'Seguridad', href: '/docs/cross-cutting/security' },
    ],
  },

  'cross-privacy': {
    title: 'Privacy',
    description: 'Bitcoin privacy techniques: CoinJoin, PayJoin, coin selection strategies, address reuse, chain analysis resistance, Tor/I2P integration, and tradeoffs between privacy and auditability.',
    descriptionEs: 'Técnicas de privacidad en Bitcoin: CoinJoin, PayJoin, estrategias de selección de monedas, reutilización de direcciones, resistencia al análisis de cadena, integración de Tor/I2P y trade-offs entre privacidad y auditabilidad.',
    links: [
      { label: 'Privacy', labelEs: 'Privacidad', href: '/docs/cross-cutting/privacy' },
    ],
  },

  'sidechains-l2': {
    title: 'Sidechains & L2',
    description: 'Layer 2 scaling solutions and sidechains: Lightning Network channels, payment routing, Liquid Network federation, drivechains, and statechains for off-chain Bitcoin transfers.',
    descriptionEs: 'Soluciones de escalado Layer 2 y sidechains: canales de Lightning Network, enrutamiento de pagos, federación de Liquid Network, drivechains y statechains para transferencias Bitcoin fuera de cadena.',
    links: [
      { label: 'Sidechains & L2', labelEs: 'Sidechains & L2', href: '/docs/cross-cutting/sidechains-l2' },
    ],
  },

  'smart-contracts': {
    title: 'Smart Contracts',
    description: "Bitcoin's approach to programmability: Script opcodes, Taproot and Tapscript, covenants (CTV, APO), DLCs for trustless derivatives, and RGB for client-side validated contracts.",
    descriptionEs: 'El enfoque de Bitcoin a la programabilidad: opcodes de Script, Taproot y Tapscript, covenants (CTV, APO), DLCs para derivados sin confianza y RGB para contratos validados del lado del cliente.',
    links: [
      { label: 'Smart Contracts', labelEs: 'Smart Contracts', href: '/docs/cross-cutting/smart-contracts' },
    ],
  },
};
