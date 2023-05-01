const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");
const Writable = require("stream").Writable;

const operation = process.argv[2];
const path = process.argv[3];

function encrypt(key, text) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  const encryptedText = cipher.update(text, "utf8", "hex");
  return encryptedText + cipher.final("hex");
}

function decrypt(key, text) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  const decryptedText = decipher.update(text, "hex", "utf8");
  return decryptedText + decipher.final("utf8");
}

function loadFileContent(path) {
  return fs.readFileSync(path, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });
}

function saveFileContent(path, content) {
  fs.writeFileSync(path, content, (err) => {
    if (err) throw err;
    console.log("The file has been saved.");
  });
}

function authOperation(cb) {
  const mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
      if (!this.muted) process.stdout.write(chunk, encoding);
      callback();
    },
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  });

  rl.question("Digite a senha: ", (key) => {
    cb(key);
    rl.close();
  });
  mutableStdout.muted = true;
}

function printError(message) {
  console.log("\n---------- [ERROR] ----------");
  console.log(message);
  console.log("-----------------------------\n");
}

if (operation === "enc") {
  try {
    authOperation((key) => {
      if (!key) {
        printError("Key not found");
        return;
      }
      const text = loadFileContent(path);
      if (!text) throw "File is empty or not found";
      const encryptedText = encrypt(key, text);
      saveFileContent(path, encryptedText);
    });
    return;
  } catch (_) {
    printError("Error encrypting file");
    return;
  }
}

if (operation === "dec") {
  try {
    authOperation((key) => {
      if (!key) {
        printError("Key not found");
        return;
      }
      const text = loadFileContent(path);
      const decryptedText = decrypt(key, text);
      saveFileContent(path, decryptedText);
    });
    return;
  } catch (_) {
    printError("Invalid key or error decrypting file");
    return;
  }
}

console.log("Invalid operation");
console.log("Usage: node encdec.js <enc | dec> <file_path>");
