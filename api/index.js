const express = require('express');
// const cors = require('cors');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const uploadMiddleware = multer({ dest: 'uploads/' })
app.use('/uploads', express.static(__dirname + '/uploads'))
const User = require('./models/User')
const Post = require('./models/Post')
const salt = bcrypt.genSaltSync(10)
const secret = 'cdscgygcdgcydcsgyc767cdsghc'
try {
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    console.log('Database Connection Successful')
} catch (e) {
    alert(e)
}
// app.use(cors())
// app.use(cors({Credentials:true,
//     origin:'http://loalhost:3000'}))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const UserDocument = await User.create({
            username, password: bcrypt.hashSync(password, salt)
        })
        res.json(UserDocument);
    } catch (e) {
        res.status(400).json(e)
    }

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            });

        })
    } else {

    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)


    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDocument = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,

        })
        res.json(postDocument)
    })


})
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {

        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath)

    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDocument = await Post.findById(id)
        const isAuthor = JSON.stringify(postDocument.author) === JSON.stringify(info.id)
        if (!isAuthor) {
            return res.status(400).json('youre not the author')
            // throw 'You are not the Author'
        }
        await postDocument.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        });

        // res.json(postDoc);
    })


})
app.get('/post', async (req, res) => {
    res.json(
   await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20))
    // res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    // res.json(req.params)
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})



app.listen(4000);