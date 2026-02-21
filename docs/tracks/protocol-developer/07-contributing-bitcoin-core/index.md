---
sidebar_position: 7
title: Contributing to Bitcoin Core
description: How to contribute to Bitcoin Core - review process, PR workflow, and community norms
---

# Contributing to Bitcoin Core

Contributing to Bitcoin Core is one of the most impactful things you can do as a protocol developer. The project is open source, permissionless to contribute to, and always needs thoughtful reviewers and developers.

## Start with Review

The single best way to start contributing is **reviewing pull requests**. Review is:

- The most valuable and scarce resource in Bitcoin Core
- How you learn the codebase and conventions
- How you build trust with other contributors
- Required before your own PRs will get attention

### How to Review

1. Pick a PR from the [pull request list](https://github.com/bitcoin/bitcoin/pulls)
2. Read the PR description and linked issues
3. Check out the branch locally and build it
4. Read the code changes carefully
5. Run the tests
6. Leave constructive feedback

### Review Signals

| Signal | Meaning |
|--------|---------|
| **ACK** | Tested, reviewed code, agree with the change |
| **NACK** | Disagree with the approach (must explain why) |
| **utACK** | Reviewed code, didn't test, agree with approach |
| **Concept ACK** | Agree with the goal, haven't reviewed code |
| **Approach ACK** | Agree with the technical approach |

```
# Example review comment
ACK abc1234

Tested on Ubuntu 22.04. Built with CMake, ran unit tests and
relevant functional tests (feature_block.py, p2p_segwit.py).
Code review looks good. One minor suggestion below.
```

## Making Your First PR

### Before You Start

1. **Read the contributor guidelines**: `CONTRIBUTING.md` in the repo
2. **Read the developer notes**: `doc/developer-notes.md`
3. **Start small** — Documentation fixes, test improvements, minor refactors
4. **One logical change per commit** — Keep PRs focused

### PR Workflow

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/bitcoin.git
cd bitcoin
git remote add upstream https://github.com/bitcoin/bitcoin.git

# Create a feature branch
git checkout -b your-feature-branch

# Make changes, commit
git add -A
git commit -m "short: Description of change"

# Push and create PR
git push origin your-feature-branch
```

### Commit Messages

Bitcoin Core follows a specific commit message format:

```
subsystem: Short description (max ~50 chars)

Longer explanation of what and why (not how).
Wrap at 72 characters.

Can reference issues: Fixes #12345
```

Subsystem prefixes: `consensus`, `net`, `wallet`, `rpc`, `test`, `build`, `doc`, `refactor`, `ci`, etc.

### What Makes a Good PR

- **Focused** — One logical change, not a kitchen sink
- **Well-tested** — Include unit and/or functional tests
- **Well-documented** — Clear description of what and why
- **Rebased** — Clean history on top of current master
- **Patient** — Review takes time; don't expect immediate merging

## The Review Process

1. **CI runs** — Automated builds and tests must pass
2. **Concept review** — Maintainers assess if the change is desirable
3. **Code review** — Multiple reviewers examine the code
4. **Testing** — Reviewers test the changes locally
5. **Iteration** — Address feedback, update PR
6. **Merge** — A maintainer merges after sufficient review

There is **no fixed number** of reviews required. Consensus-critical changes need more review than minor refactors. Some PRs take weeks; others take months or years.

## Community Norms

- **Be patient and respectful** — Everyone is a volunteer
- **Don't bump your PR** — Reviewers will get to it
- **Respond to feedback constructively** — Even if you disagree
- **Don't take rejection personally** — NACKs are about the code, not you
- **Review others' PRs** — It's the best way to earn review of your own

## Getting Help

- [Bitcoin Core PR Review Club](https://bitcoincore.reviews/) — Weekly guided review sessions
- [Delving Bitcoin](https://delvingbitcoin.org/) — Technical discussions
- [Bitcoin IRC Channels](https://bitcoin.org/en/development#irc-channels) — `#bitcoin-core-dev` on Libera Chat
- [Bitcoin Optech](https://bitcoinops.org/) — Weekly protocol development updates

## Recommended Path

1. Build Bitcoin Core from source
2. Run the test suite
3. Join PR Review Club for a few weeks
4. Review 5-10 PRs (leave comments, test, provide ACK/NACK)
5. Find a "good first issue" or small improvement
6. Submit your first PR
7. Continue reviewing while waiting for feedback
