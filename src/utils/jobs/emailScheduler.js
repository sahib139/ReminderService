const nodeCron = require("node-cron");

const emailScheduler = async ()=>{
    nodeCron.schedule('*/2 * * * *',()=>{

    });
}

module.exports ={
    emailScheduler,
} 