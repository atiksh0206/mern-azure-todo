const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const path = require('path');
//looks for the .env file in server folder
//allows for the application to be easily configured 
dotenv.config();
const app = express();

//allows this to process json requests
app.use(express.json());
//allows me to access api on port 8080 while server is on port 3000
app.use(cors());
//logs whatever requests are made 
app.use(morgan('tiny'));

app.use(router);

//production script
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('starting on port 8080')
    //where you can access a server at a specific port (8080)
    app.listen(8080);
})

