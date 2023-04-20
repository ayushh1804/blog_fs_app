const express = require('express');

const app = express();

app.post('/register',(req,res) => {
    res.json('request success')
})

app.listen(4000);