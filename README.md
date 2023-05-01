# encdec

Encrypt / Decrypt files using AES + password

## NodeJS version

- 18.14.0

## Install

```txt
git clone git@github.com:YagoCrispim/encdec.git ~/.local/share/encdec
```

#### Bash

```txt
echo "\nenc() { node ~/.local/share/encdec/encdec.js enc \`pwd\`/\$1 }" >> ~/.bashrc
echo "\ndec() { node ~/.local/share/encdec/encdec.js dec \`pwd\`/\$1 }" >> ~/.bashrc
```

#### ZSH

```txt
echo "\nenc() { node ~/.local/share/encdec/encdec.js enc \`pwd\`/\$1 }" >> ~/.zshrc
echo "\ndec() { node ~/.local/share/encdec/encdec.js dec \`pwd\`/\$1 }" >> ~/.zshrc
```
