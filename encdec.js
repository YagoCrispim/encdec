// NodeJS 18.14.0
const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");

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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Digite a senha: ", (key) => {
    cb(key);
    rl.close();
  });
}

try {
  const operation = process.argv[2];
  const path = process.argv[3];

  if (operation === "enc") {
    authOperation((key) => {
      const text = loadFileContent(path);
      if (!text) throw "File is empty or not found";
      const encryptedText = encrypt(key, text);
      saveFileContent(path, encryptedText);
    });
    return;
  }

  if (operation === "dec") {
    authOperation((key) => {
      const text = loadFileContent(path);
      const decryptedText = decrypt(key, text);
      saveFileContent(path, decryptedText);
    });
    return;
  }

  console.log("Invalid operation");
  console.log("Usage: node encdec.js <enc | dec> <file_path>");
} catch (error) {
  console.log("\n---------- [ERROR] ----------");
  console.log("Error executing the program");
  console.log("Error message: " + error);
  console.log("-----------------------------\n");
}
