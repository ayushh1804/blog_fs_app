const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/User')


try {
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    console.log('Database Connection Successful')
} catch (e) {
    alert(e)
}

app.use(cors())
app.use(express.json())
app.post('/register', async (req, res) => {
  
        const { username, password } = req.body;
        const UserDocument =  await User.create({
             username, password
         })
         res.json(UserDocument);
 
      

   

    // res.json({ requestdate: { username, password } })

})

app.listen(4000);