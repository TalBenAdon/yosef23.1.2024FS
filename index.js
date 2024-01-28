const fs = require('fs')
const express = require('express')
const port = 4000
const cors = require('cors')
const multer = require('multer')
const path = require('path')


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





app.post('/uploads', upload.array('file'), (req, res) => {
    try {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads')

        req.files.forEach(file => console.log(file.originalname))

        res.send('files uploaded successfully')




    } catch (error) {
        console.log(error);
        res.status(500).send("an error occured")
    }


})

app.get('/uploads', (req, res) => {
    let files = fs.readdirSync('./uploads', 'utf-8')
    const response = []
    for (let file of files) {
        const extension = path.extname(file)
        const fileSizeBytes = fs.statSync('./uploads/' + file).size
        response.push({ name: file, extension, fileSizeBytes })
    }
    res.send(response)
})

app.get('/download/:fileName', (req, res) => {
    try {
        const filePath = `${__dirname}/uploads/${req.params.fileName}`;
        res.download(filePath)
    } catch (error) {
        res.status(500).send("The file does not exists or an error occured.")
    }
})

app.put('/uploads/:oldFileName', (req, res) => {
    try {

        fs.renameSync(`./uploads/${req.params.oldFileName}`, `./uploads/${req.body.newName}`)
        res.status(200).send(`"${req.params.oldFileName}" file name changed to "${req.body.newName}" successfully`)
    } catch (error) {
        res.send(error)
    }

})

app.delete('/uploads/:fileName', (req, res) => {
    if (fs.existsSync(`./uploads/${req.params.fileName}`)) {
        let file = req.params.fileName
    } else {
        throw res.status(404).send("file does not exists.")
    }
    fs.unlinkSync(`./uploads/${req.params.fileName}`)
    res.status(200).send("file deleted seccussfully")
})










app.all('*', (req, res) => {
    res.status(404).send("Page is not found")
})
// const router = require('./router')
// app.use('/', router)


app.listen(port, () => console.log("****Server is up****"))

