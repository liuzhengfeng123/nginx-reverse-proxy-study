const fs = require('fs')
const path = require('path')
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
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501'); // 允许所有来源
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.static(path.join(__dirname, 'public')))

app.get('/getCookie', (req, res) => {
  res.cookie('song', 'chemtrails over the country club', {
    sameSite: 'None',
    secure: true
  })
  return res.send('cookie set success')
})

app.get('/getOrigin', (req, res) => {
  console.log("origin", req.headers.origin)
  return res.send('get origin success')
})

app.get('/checkCookie', (req, res) => {
  const cookie = req.headers.cookie
  console.log("cookie", cookie)
  console.log("referer", req.headers.referer)
  return res.send('check cookie success')
})

app.use('/bird', bird)

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port https://${domain}:${PORT}`)
})