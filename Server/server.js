const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
// const fs = require("fs")
const fs = require('fs-extra')

// const mainFunc = require("./mainFunc.js")
let text
const allowedFormatRegex = /(\.txt|\.rtf|\.md|\.file)$/i

app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'RecievedText/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

function postContent() {
  const readDir = fs.readdirSync('RecievedText', 'utf8', function (err, data) {
    console.log('file: ' + data)
    return data
  })

  const textContent = fs.readFileSync(`RecievedText/${readDir[0]}`, 'utf8', function (err, data) {
    console.log('Dir empty :( ' + data)
    return data
  })
  fs.move(`RecievedText/${readDir[0]}`, 'SentText/write.txt', { overwrite: true })
    .then(() => console.log('File moved to the destination' +
      ' folder successfully'))
    .catch((e) => console.log(e))
  // fs.unlinkSync(`RecievedText/${readDir[0]}`)
  return textContent
}

const validateFile = (request, res) => {
  console.log(allowedFormatRegex.test(request.file.originalname))
  if (allowedFormatRegex.test(request.file.originalname) && request.file.size > 0) {
    text = postContent()
  }else{
    fs.unlink(`RecievedText/${fs.readdirSync('RecievedText')}`)
    throw new Error('Validate file func detected faulty file and removed it from senttext folder.')
  }
}

app.post('/Text', upload.single('file'), function (req, res) {
  try {
    validateFile(req, res)
    return res.status(200).send({text:'Post req succesful,processing file now.'})
  } catch (error) {
    return res.status(400).send({ text:'Illegitimate format!Please choose a non empty file with approved format.'})
  }
})

app.get('/getmodifedfile', function (req, res) {
  try {
    res.status(200).send({ text: fooBarify(text) })
  } catch (error) {
    res.status(400).send({ text:'Illegitimate format!Stopping get req'})
  }
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

const fooBarify = function (data) {
  const wordCollection = {}
  const wordsRegex = /[A-Za-z]+/ig
  // console.log(data);
  const textData = data.match(wordsRegex)
  if (data === undefined) {
    return console.log('null data')
  }
  textData.forEach(word => {
    // console.log(word);
    if (wordCollection.hasOwnProperty(word)) {
      wordCollection[word] = wordCollection[word] + 1
      // console.log("Add count");
    } else {
      Object.defineProperty(wordCollection, word, {
        value: 1,
        writable: true,
        enumerable: true
      })
      // console.log("Add property and count");
    }
  })

  const mostUsedWord = Object.keys(wordCollection).reduce((a, b) => wordCollection[b] > wordCollection[a] ? b : a)
  console.log(wordCollection, mostUsedWord)

  const outputRegexWord = `${mostUsedWord}`
  const re = new RegExp("\\b" + outputRegexWord + "\\b", 'gi')
  const output = data.replace(re, `foo${outputRegexWord}bar`)
  console.log(output);
  return output
}
// module.exports = { fileContent };
