---
title: Example Machine
date: 2025-01-15
platform: HackTheBox
difficulty: Easy
tags: [linux, web, privesc]
summary: Template writeup showing the expected structure. Replace with a real one.
---

> **TEMPLATE:** this is a placeholder writeup. The site owner should replace it with real content. All IPs and commands are illustrative.

## Summary

Short overview of the machine, the attack path, and the main takeaway.

## Recon

Initial port scan against the target (`10.10.10.10`):

```bash
nmap -sC -sV -oN nmap/initial 10.10.10.10
```

| Port | Service | Notes          |
| ---- | ------- | -------------- |
| 22   | SSH     | OpenSSH        |
| 80   | HTTP    | Web app found  |

## Enumeration

Directory brute-forcing on the web server:

```bash
gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt
```

Describe interesting endpoints, versions, and credentials found.

## Foothold

Explain the vulnerability, why it works, and how it was used to get a shell.

```bash
nc -lvnp 4444
```

## Privilege Escalation

Local enumeration and the misconfiguration that led to root.

```bash
sudo -l
```

## Lessons learned

- What made the box tricky.
- How the issue could be fixed or detected.
