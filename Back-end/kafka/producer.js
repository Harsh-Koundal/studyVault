import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'studyvault-api',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();
let producerConnected = false;

export const connectProducer = async () => {
    if (producerConnected) return;
    await producer.connect();
    producerConnected = true;
}

export const publishEvent = async (topic, message) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
};
