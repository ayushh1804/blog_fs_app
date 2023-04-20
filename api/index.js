const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()


try{
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    console.log('Database Connection Successful')
}catch(e){
    console.log(e)
}

app.use(cors())
app.use(express.json())
app.post('/register',(req,res) => {
    const {username,password} = req.body;
    res.json({requestdate:{username,password}})

})

app.listen(4000);