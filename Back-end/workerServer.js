import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startMaterialConsumer } from './kafka/consumer.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing. Please check your .env file.');
    process.exit(1);
}

const bootstrapWorker = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Worker connected to MongoDB');

        await startMaterialConsumer();
        console.log('Material Kafka consumer is running in worker process');
    } catch (error) {
        console.error('Worker bootstrap failed:', error.message);
        process.exit(1);
    }
};

bootstrapWorker();
