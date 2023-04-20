const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('./models/User')
const salt = bcrypt.genSaltSync(10);

try {
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    console.log('Database Connection Successful')
} catch (e) {
    alert(e)
}

app.use(cors())
app.use(express.json())
app.post('/register', async (req, res) => {
  try{
        const { username, password } = req.body;

        const UserDocument =  await User.create({
             username, password:bcrypt.hashSync(password, salt)
         })
         res.json(UserDocument);
        }catch(e){
            res.status(400).json(e)
        }

})

app.post('/login',async (req,res)=> {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
   const passOk =  bcrypt.compareSync(password, userDoc.password)
   res.json(passOk)
})

app.get('/profile', (req,res) => {
    res
})

app.listen(4000);