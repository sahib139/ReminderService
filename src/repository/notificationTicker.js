const {NotificationTicket} = require("../models/index");
const { Op } = require("sequelize");

class TicketRepository{

    async create(data){
        try {
            const response = await NotificationTicket.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async get(ticketId){
        try {
            const ticket = await NotificationTicket.findByPK(ticketId);
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(filter){
        try {

            const tickets = await NotificationTicket.findAll({
                where:{
                    status:filter.status,
                    notificationTime:{
                        [Op.lte]:(filter.timestamp)?filter.timestamp:new Date(),
                    }
                }
            });
            return tickets;
        } catch (error) {
            console.log(error);
        }
    }

    async update(ticketId,data){
        try {
            
            const ticket = await NotificationTicket.findByPk(ticketId);
            if(data.status)
                ticket.status=data.status;
            await ticket.save();
            return ticket;

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports=TicketRepository;