const amqplib = require("amqplib");
const {MESSAGE_BROKER_URL,EXCHANGE_NAME} = require("../../config/serverConfig");

let connection,channel;

const CreateChannel = async ()=>{
    try {
        connection = await amqplib.connect(MESSAGE_BROKER_URL);
        channel = await connection.createChannel();
        channel.assertExchange(EXCHANGE_NAME,'direct');
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (service,binding_key)=>{
    try {
        applicationQueue = await channel.assertQueue('REMINDER_QUEUE');
        await channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
        await channel.consume(applicationQueue.queue,(msg)=>{
            console.log("Received data");
            service.subscribedEvents(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}   

const publishMessage = async (binding_key,message)=>{
    try {
        await channel.assertQueue('BOOKING_QUEUE');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports={
    CreateChannel,
    subscribeMessage,
    publishMessage,
}