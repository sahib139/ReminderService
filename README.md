# Welcome to Reminder Service

## Project Setup 
- clone the project on your local 
- Execute `npm i` in the root directory.
- Install `Rabbitmq` in your system.
- Create `.env` file in the root directory and add the following environment 
    - `PORT = 3003`
    - `EMAIL_ID = <Your email using which ou want to send the mail(for using mailing service)>`
    - `EMAIL_PASS = <Your email app password key fro authentication purpose>`
    - `MESSAGE_BROKER_URL = amqp://localhost`
    - `EXCHANGE_NAME = AIRLINE_BOOKING`
    - `REMINDER_BINDING_KEY = REMINDER_KEY`
    - `BOOKING_BINDING_KEY = BOOKING_KEY`

- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json code

```
{
  "development": {
    "username": "<database_username>",
    "password": "<database_password>",
    "database": "REMINDER_SERVICE_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "<database_name (example-> mysql) >"
  }
}

```

- Once you've added your db config file as listed above ,  go to the src folder form your terminal and execute
    `npx sequelize db:create`
- After creating database , now create all the tables by executing `npx sequelize db:migrate:all`

```
- DB design
    - NotificationTicket Table


```
- Finally, Run the `npm start` in the root directory to run the Server.

- Note -> In this service i use my gmail id to send mail , if you are using other mailing service ,then do changes in `config/emailConfig.js`
file.

```
In `config/emailConfig.js` ->

const sender = nodemailer.createTransport({
    service:'<Your service provider name (example -> 'Gmail')>',
    auth:{
        user:EMAIL_ID,
        pass:EMAIL_PASS,
    }
});

```
 
