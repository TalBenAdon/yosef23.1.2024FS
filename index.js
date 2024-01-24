const fs = require('fs')
const express = require('express')
const port = 4000
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const app = express()
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {

    res.send("hi")
    console.log('hi');
})

app.post('/uploads', upload.array('file'), (req, res) => {
    try {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads')
        res.send('files uploaded successfully')


    } catch (error) {
        res.status(500).send("an error occured")
    }


})











app.all('*', (req, res) => {
    res.status(404).send("Page is not found")
})
// const router = require('./router')
// app.use('/', router)


app.listen(port, () => console.log("****Server is up****"))

