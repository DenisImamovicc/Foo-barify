const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const fs = require("fs")
// const mainFunc = require("./mainFunc.js")


app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'RecievedText/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

//Seem to call itself even tho i do not want it to,causes error when empty dir.
function fileContent() {
    const readDir=fs.readdirSync(`RecievedText`, "utf8", function (err, data) {
        console.log("file: " + data);
        return data
    })

    const textContent=fs.readFileSync(`RecievedText/${readDir[0]}`, "utf8", function (err, data) {
        console.log("Dir empty :( " + data);
        return data
    })
    fs.unlinkSync(`RecievedText/${readDir[0]}`)

    return textContent
}
app.post('/Text', upload.single('file'), function (req, res) {
    let text=fileContent()
    res.send(fooBarify(text)).status(200)
    // res.json({ status: 200, message: "File has been recived sucessfully" })
})
//console.log();

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

const fooBarify = function (data) {
    const wordCollection = {};
    const wordsRegex = /[A-Za-z\"'\-]+/gi
    // console.log(data);
    const textData = data.match(wordsRegex)
    if (data === undefined) {
        return console.log("null data");
    }
    textData.forEach(word => {
        //console.log(word);
        if (wordCollection.hasOwnProperty(word)) {
            wordCollection[word] = wordCollection[word] + 1
            //console.log("Add count");
        } else {
            Object.defineProperty(wordCollection, word, {
                value: 1,
                writable: true,
                enumerable: true
            });
            //console.log("Add property and count");
        }
    });

    const mostUsedWord = Object.keys(wordCollection).reduce((a, b) => wordCollection[b] > wordCollection[a] ? b : a)
    //console.log(wordCollection, mostUsedWord);

    const outputRegexWord = `${mostUsedWord}`
    const re = new RegExp(outputRegexWord, "gi")
    const output = data.replace(re, `foo${outputRegexWord}bar`);
    //console.log(output);
    return output
}
// module.exports = { fileContent };
