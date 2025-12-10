const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.send('Baby One More Time!')
})

router.get('/chemtrails', (req, res) => {
  return res.send('Chemtrails Over The Country Club!')
})


module.exports = router
