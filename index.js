const https = require('https')
const express = require('express')
const bird = require('./routes/bird')
const app = express()
const PORT = 443

const domain = 'liuzhengfeng.xyz'

const options = {
  key: fs.readFileSync(path.join(`/etc/letsencrypt/live/${domain}`, 'privkey.pem')),    // 私钥
  cert: fs.readFileSync(path.join(`/etc/letsencrypt/live/${domain}`, 'fullchain.pem'))  // 全链证书（关键！）
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // res.header('Access-Control-Allow-Credentials', true);

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use('/bird', bird)

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port https://${domain}:${PORT}`)
})