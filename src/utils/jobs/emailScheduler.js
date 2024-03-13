const nodeCron = require("node-cron");
const sender = require("../../config/emailConfig");
const { TicketAndEmailService } = require("../../service/index");

const Service = new TicketAndEmailService();

const emailScheduler = () => {
    nodeCron.schedule('*/2 * * * *', async () => {
        const tickets = await Service.fetchPendingMails();
        tickets.forEach((ticket) => {
            sender.sendMail({
                to: ticket.recipientEmail,
                subject: ticket.subject,
                text: ticket.content,
            }, async (error, data) => {
                if (error) {
                    console.log(error);
                }
                await Service.update(ticket.id, { status: "SUCCESS" });
            })
        })
    });
}

module.exports = {
    emailScheduler,
} 