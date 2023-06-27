import formidable from 'formidable';
import { Writable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};


const REST_SERVICE_URL = 'https://ws.firmadigital.gob.ec/servicio/appverificardocumento';

async function verificarDocumento(documento, base64) {
    const response = await fetch(REST_SERVICE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            documento: documento,
            base64: base64
        })
    });

    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Failed to verify document');
    }
}



export default async function handleRequest (req, res) {
    const form = formidable({
        fileWriteStreamHandler: () => {
            // Create an array to collect the file data
            const chunks = [];

            // Create a writable stream to collect the file data
            const writableStream = new Writable({
                write(chunk, encoding, callback) {
                    // Collect the chunk of data in the array
                    chunks.push(chunk);
                    callback();
                },
            });

            // Event handler for when the writable stream finishes
            writableStream.on('finish', () => {
                // Concatenate the chunks into a single buffer
                const fileBuffer = Buffer.concat(chunks);

                // Convert the file buffer to base64 string
                const fileData = fileBuffer.toString('base64');

                // Log or use the base64 string as needed
                verificarDocumento(fileData, "0").then((val) => {
                    res.send(val);
                });
            });

            // Return the writable stream
            return writableStream;
        },
    });

    const [fields, files] = await form.parse(req);
}
