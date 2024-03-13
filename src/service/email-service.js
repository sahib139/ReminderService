const sender = require("../config/emailConfig");
const {TicketRepository} = require("../repository/index");

class TicketService{
    
    constructor(){
        this.ticketRepository = new TicketRepository();
    }

    sendBasicEmail(mailTo,mailSubject,mailBody){
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

    async create(data){
        try {
            const response = await this.ticketRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(ticketId,data){
        try {
            const response= await this.ticketRepository.update(ticketId,data);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchPendingMails(timeStamp){
        try {
            let filter = {
                status:"PENDING",
            }
            if(timeStamp){
                filter.notificationTime = timeStamp;
            }
            const tickets = await this.ticketRepository.getAll(filter);
            return tickets;
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = TicketService;

