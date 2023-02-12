const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.send('Hello Welcome')
})
app.get('/ec2', (req, res) => {
  return res.send('Ec2 Instance - Working Fine (Created by Kudz Murefu)')
})

app.listen(3000, () => {
  console.log('Express App Started & listening...')
})