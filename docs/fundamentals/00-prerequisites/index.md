---
sidebar_position: 1
title: Prerequisites
description: Knowledge and skills you should have before starting your Bitcoin development journey
---

# Prerequisites

Before diving into Bitcoin development, you should have a working knowledge of the following areas. You don't need to be an expert — but having a solid foundation will make everything else much smoother.

## Programming

You should be comfortable with at least one general-purpose programming language. The most common in the Bitcoin ecosystem are:

- **C++** — Bitcoin Core is written in C++. Essential for protocol development.
- **Python** — Great for scripting, testing, and rapid prototyping. Widely used in Bitcoin tooling.
- **JavaScript/TypeScript** — The go-to for web-based wallets, tools, and Lightning apps.
- **Rust** — Growing quickly in the Bitcoin space (BDK, LDK, and many new projects).
- **Go** — Used in infrastructure tools like btcd, lnd.

Beyond a specific language, you should understand:

- Data structures (arrays, hash maps, trees, linked lists)
- Algorithms (sorting, searching, graph traversal)
- Object-oriented and functional programming concepts
- Version control with Git

## Mathematics and Cryptography

Bitcoin relies heavily on cryptography. You should understand:

- **Modular arithmetic** — The foundation of most cryptographic operations
- **Hash functions** — SHA-256, RIPEMD-160, and their properties (preimage resistance, collision resistance)
- **Elliptic curve cryptography (ECC)** — Bitcoin uses the secp256k1 curve for digital signatures
- **Digital signatures** — How ECDSA and Schnorr signatures work at a high level
- **Merkle trees** — Used in block headers and transaction verification

You don't need a math degree, but being comfortable with these concepts will help you understand why Bitcoin works the way it does.

## Systems and Networking

Bitcoin is a distributed system. Familiarity with these topics will be valuable:

- **Operating systems** — Process management, file systems, memory management
- **Networking** — TCP/IP, HTTP, peer-to-peer protocols, sockets
- **Command line** — Navigating the terminal, shell scripting, package management
- **Linux/macOS** — Most Bitcoin development happens on Unix-like systems
- **Databases** — Basic understanding of key-value stores and relational databases

## Recommended Resources

- [Learn X in Y Minutes](https://learnxinyminutes.com/) — Quick language overviews
- [Khan Academy Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) — Crypto fundamentals
- [Christof Paar's Crypto Lectures](https://www.youtube.com/channel/UC1usFRN4LCMcfIV7UjHNuQg) — University-level cryptography
- [The Missing Semester (MIT)](https://missing.csail.mit.edu/) — Command line, Git, and developer tools
