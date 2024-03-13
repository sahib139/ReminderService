const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {sendBasicEmail} = require("./service/email-service");
const {PORT,DB_SYNC} = require("./config/serverConfig");

const setUpAndStartServer = async ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{
        console.log(`Server started at port no. : ${PORT}`);
    });

} 

setUpAndStartServer();