import { Kafka } from 'kafkajs';
import { Worker } from 'worker_threads';
import StudyMaterial from '../model/StudyMaterial.js';

const kafka = new Kafka({
    clientId: 'studyvault-worker',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID || 'material-workers',
});

const MATERIAL_TOPIC = process.env.KAFKA_MATERIAL_TOPIC || 'material.uploaded';

const runMaterialWorker = (payload) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('../workers/materialWorker.js', import.meta.url), {
            workerData: payload,
        });

        worker.on('message', (message) => {
            if (message?.ok) resolve(message);
            else reject(new Error(message?.error || 'Worker failed'));
        });

        worker.on('error', reject);

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
};

export const startMaterialConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: MATERIAL_TOPIC, fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) return;

            const payload = JSON.parse(message.value.toString());
            const { materialId } = payload;

            if (!materialId) return;

            try {
                await runMaterialWorker(payload);
                await StudyMaterial.findByIdAndUpdate(materialId, {
                    status: 'COMPLETED',
                    processedAt: new Date(),
                    processingError: null,
                });
            } catch (error) {
                console.error('Material worker failed:', error);
                await StudyMaterial.findByIdAndUpdate(materialId, {
                    status: 'FAILED',
                    processingError: error.message,
                });
            }
        },
    });
};
