const express = require('express')
const AWS = require('aws-sdk')
const app = express()
require('dotenv').config()

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

let s3 = new AWS.S3({apiVersion: '2006-03-01'})

app.get('/', (req, res) => {
  res.send('<b style="font-size: 50px">EC2 & Docker Tutorial v1.05</b>')
})

app.get('/bucketsList', (req, res) => {
  const response = { data: null, error: null}
  s3.listBuckets((err, data) => {
    if (err) response.error = err
    else response.data = data.Buckets
    res.send(response)
  })
})

app.get('/listObjects/:bucket', ({params: {bucket}}, res) => {
  const response = { data: null, error: null}
  const params = { Bucket: bucket }
  s3.listObjects(params, (err, data) => {
    if (err) response.error = err
    else response.data = data
    res.send(response)
  })

})

app.get('/getObject/:bucket/:id', ({params: {bucket, id}}, res) => res.send({ 
  url: `https://${bucket}.s3.us-east-2.amazonaws.com/${id}`
}))

app.get('/setAcl/:bucket', ({params: { bucket }}, res) => {
  const response = { data: null, error: null}
  const params = { Bucket: bucket, ACL: 'public-read' }
  s3.putBucketAcl(params, (err, data) => {
    if (err) response.error = err
    else response.data = data
    res.send({ ...response })
  })
})

app.listen('3000', () => console.log('S3 server started....'))
