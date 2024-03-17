const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");


const { PORT, DB_SYNC } = require("./config/serverConfig");
const ApiRoutes = require("./routers/index");

const { CreateChannel, subscribeMessage } = require("./utils/jobs/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const {TicketAndEmailService} = require("./service/index");
const {emailScheduler} = require("./utils/jobs/emailScheduler");

const setUpAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', async (req, res, next) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/isAuthenticate", undefined,
                {
                    headers: {
                        "x-access-token": req.headers["x-access-token"],
                    }
                }
            );
            if (response.data.success) {
                next();
            }
        } catch (error) {
            return res.json({
                message: "Unauthorized",
            });
        }
    });

    app.use('/reminderService/api', ApiRoutes);
    app.use('/api', ApiRoutes);

    await CreateChannel();
    await subscribeMessage(new TicketAndEmailService(),REMINDER_BINDING_KEY);
    emailScheduler();

    app.listen(PORT, () => {
        console.log(`Server started at port no. : ${PORT}`);
    });


}

setUpAndStartServer();