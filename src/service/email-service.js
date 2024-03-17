const sender = require("../config/emailConfig");
const axios = require("axios");
const { TicketRepository } = require("../repository/index");

class TicketService {

    constructor() {
        this.ticketRepository = new TicketRepository();
    }

    sendBookingMail(mailTo, mailSubject, mailBody) {
        try {
            sender.sendMail({
                to: mailTo,
                subject: mailSubject,
                text: mailBody,
            }, (error, response) => {
                if (error) {
                    console.log(error);
                }
                return response;
            });
        } catch (error) {
            console.log("something went wrong at service layer due to " + error);
        }
    }

    async create(data) {
        try {
            const response = await this.ticketRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(ticketId, data) {
        try {
            const response = await this.ticketRepository.update(ticketId, data);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchPendingMails(timeStamp) {
        try {
            let filter = {
                status: "PENDING",
            }
            if (timeStamp) {
                filter.notificationTime = timeStamp;
            }
            const tickets = await this.ticketRepository.getAll(filter);
            return tickets;
        } catch (error) {
            console.log(error);
        }
    }

    async subscribedEvents(message) {
        try {
            console.log(message.service_id);
            switch (message.service_id) {
                case "SEND_MAIL":
                    await this.sendBookingMail(message.to, message.subject, message.text);
                    message.departureTime = new Date(message.departureTime);
                    message.departureTime = message.departureTime.setHours(message.departureTime.getHours() - 24);
                    await this.create({
                        recipientEmail: message.to,
                        subject: "Reminder of Flight",
                        content: `Your Flight is at ${message.departureTime}. Travel Safe!`,
                        notificationTime: message.departureTime,
                    });
                    break;
                case "CREATE_TICKET":
                    await this.create(message.data);
                    break;
                default:
                    console.log("Wrong service code");
                    break;
            }
        } catch (error) {
            throw error;
        }
    }
}



module.exports = TicketService;

