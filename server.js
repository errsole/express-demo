/**
 * Put this Errsole code snippet at the top of your app's main file
 */
const errsole = require('errsole')
errsole.initialize({
  framework: 'express',
  token: 'b283d554-03bd-4d4d-8c1f-fae3b32f99db',
  editCode: true, // Set false in staging and production environments
  evalExpression: true // Set false in staging and production environments
})
// End of Errsole code snippet

var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path')

var app = express()
var upload = multer({ dest: 'files/' })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/get-request', function (req, res) {
  res.locals.name = req.query.name
  res.render('index')
})

app.get('/get-json', function (req, res) {
  var file = path.join(__dirname, 'files/sample.zip')
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send(err.message || err.toString())
    } else {
      res.send(JSON.parse(data))
    }
  })
})

app.post('/post-request', function (req, res) {
  var result = req.body.input[0] * req.body.input[1]
  res.send(result.toString())
})

app.post('/upload-file', upload.single('photo'), function (req, res) {
  res.send(req.file.filename)
})

app.get('/download-file', function (req, res) {
  var file = path.join(__dirname, 'sample.zip')
  res.download(file)
})

app.all('*', function (req, res) {
  res.send({})
})

app.listen(14895)
