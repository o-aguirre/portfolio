---
title: Fixture Alpha Box
date: 2024-03-10
platform: HackTheBox
lang: en
difficulty: Easy
tags: [linux, web]
summary: English fixture writeup used by the test suite.
vulnerabilities:
  - severity: high
    title: Fixture sudo misconfiguration
    cwe: CWE-250
    impact: A local user can run a binary as root.
    mitigation: Remove the passwordless rule.
  - severity: low
    title: Fixture banner disclosure
    cwe: 200
    impact: The service version is exposed.
    mitigation: Hide the banner.
---

## Overview

Fixture overview section.

## Fixture recon

```bash
$ nmap -sV 10.10.10.10
```

## Fixture foothold

```bash
$ nc -lvnp 4444
```

## Fixture closing notes

- Final section used to check ordering.
