const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const secret= 'cdscgygcdgcydcsgyc767cdsghc'
try {
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    console.log('Database Connection Successful')
} catch (e) {
    alert(e)
}

app.use(cors({Credentials:true,origin:'http://loalhost:3000'}))
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
   if (passOk){
            jwt.sign({username,id:userDoc._id},secret,{}, (err,token)=>{
                    if (err) throw err;
                    res.cookie('token',token).json('ok')
            })
   }else{

   }
})

app.get('/profile', (req,res) => {
    res
})

app.listen(4000);