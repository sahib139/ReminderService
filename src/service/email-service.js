const sender = require("../config/emailConfig");
const {EMAIL_ID} = require("../config/serverConfig");

const sendBasicEmail =(mailTo,mailSubject,mailBody)=>{
    try {
        sender.sendMail({
            to:mailTo,
            subject:mailSubject,
            text:mailBody,
        },(error,response)=>{
            if(error){
                console.log(error);
            }
            return response;
        });
    } catch (error) {
        console.log("something went wrong at service layer due to "+error);
    }
}


module.exports = { 
    sendBasicEmail,
}

