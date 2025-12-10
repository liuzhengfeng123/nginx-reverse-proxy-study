const express = require('express')
const bird = require('./routes/bird')
const app = express()
const PORT = 80

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})