//ASYNCHROMOUS COMUNICATION => LOSELY COUPLED : agar ride service chal rhi hai but captain service fail hojaati hai 
                                            // tb bhi uska ride service prr koi asar nhi padega
//{npm i amqplib} isko hrr service mein install krna padega
//RABBITMQ -> IT IS USER FOR ASYNCHRONOUS COMMUNICATION BETWEEN SERVICES 
const amqp = require("amqplib");
const RABBITMQ_URL = process.env.RABBIT_URL;

let connection , channel;

async function connect() {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ")
}

async function subscribeToQueue(queueName , callback) {
    if(!channel) {
        await connect();
    }
    await channel.assertQueue(queueName);
    channel.consume(queueName , (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}


async function publishToQueue(queueName , data) {
    if(!channel) {
        await connect();
    }
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName , Buffer.from(data));
}


module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect
}

