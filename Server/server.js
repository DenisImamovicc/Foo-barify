const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const fs= require("fs")
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
const Latestfiles=fs.readdirSync(`RecievedText`)

app.post('/Text', upload.single('file'), function (req, res) {
    fs.readFile(`RecievedText/${Latestfiles[0]}`,"utf8",function(err,data){
        console.log("Read file: "+ data);
    })
  res.json({status:200,message:"File has been recived sucessfully"})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
