import { parentPort, workerData } from 'worker_threads';

const processMaterial = async (payload) => {
    // Placeholder for heavy CPU/file work (OCR, parsing, thumbnail generation, etc.)
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!payload?.materialId) {
        throw new Error('materialId missing in worker payload');
    }

    return { ok: true, materialId: payload.materialId };
};

processMaterial(workerData)
    .then((result) => {
        parentPort?.postMessage(result);
    })
    .catch((error) => {
        parentPort?.postMessage({ ok: false, error: error.message });
    });
