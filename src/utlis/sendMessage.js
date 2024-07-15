const amqp = require('amqplib');

async function sendToQueue(queue, message) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending message to queue:', error);
  } 
}

module.exports = {sendToQueue}
