const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {PORT,DB_SYNC} = require("./config/serverConfig");
const ApiRoutes = require("./routers/index");

const {EmailingJobs} = require("./utils/index");

const setUpAndStartServer = async ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);

    EmailingJobs.emailScheduler();

    app.listen(PORT,()=>{
        console.log(`Server started at port no. : ${PORT}`);
    });

} 

setUpAndStartServer();