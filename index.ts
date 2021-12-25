import express from "express";
import crypto from 'crypto'
// rest of the code remains same
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  const shasum = crypto.createHash('sha1')
  const { signature, timestamp, nonce, echostr } = req.query
  const token = "XXX"
  const tmpArray = [token, timestamp, nonce]
  const sortedString = tmpArray.sort().join("")

  shasum.update(sortedString)

  const encryptedString = shasum.digest("hex")

  console.dir(req.query)
  console.log("sortedString:", sortedString)
  console.log("signature:", signature)
  console.log("encryptedString:", encryptedString)

  if (encryptedString === signature) {
    res.send(echostr)
  }

  res.send(signature)
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
