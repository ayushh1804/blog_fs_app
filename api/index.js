const express = require('express');
// const cors = require('cors');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./models/User')
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

app.listen(4000);