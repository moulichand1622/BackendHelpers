import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import axios from "axios";
import {createFileObject,downloadImage} from "./fileUtils.js"
// Configure Fal AI client
fal.config({
  credentials: "381608e7-fd15-4270-9706-f1870fe50f89:30aaf8bf18344fb5bd41197849d8a82b"
});

/**
 * Processes an image for object removal using Fal AI.
 */
async function removeObject(imagePath, maskPath, outputPath) {
    try {
        const imageFile = createFileObject(imagePath);
        const maskFile = createFileObject(maskPath);

        // Upload files and get URLs
        const imageUrl = await fal.storage.upload(imageFile);
        const maskUrl = await fal.storage.upload(maskFile);

        const result = await fal.subscribe("fal-ai/bria/eraser", {
            input: { image_url: imageUrl, mask_url: maskUrl },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        console.log("Result Data:", result.data);
        console.log("Request ID:", result.requestId);

        if (result.data?.image?.url) {
            await downloadImage(result.data.image.url, outputPath);
          } else {
            console.error("No output image URL found in response.");
          }
        } catch (error) {
          console.error("Error processing image:", error);
        }
}

/**
 * Generates an image using Flux LoRA.
 */
async function generateImageFluxLora(prompt, outputPath, loraUrl, numImages = 1) {
    try {
        const result = await fal.subscribe("fal-ai/flux-lora", {
            input: {
                prompt,
                image_size: { width: 1280, height: 720 },
                seed: 42,
                loras: [{ path: loraUrl, weight: 1.0 }],
                num_images: numImages,
                output_format: "jpeg",
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        console.log("Result Data:", result.data);
        console.log("Request ID:", result.requestId);

        if (result.data?.images?.length > 0) {
            for (let i = 0; i < result.data.images.length; i++) {
                const imageOutputPath = outputPath.replace(/(\.\w+)$/, `_${i + 1}$1`);
                await downloadImage(result.data.images[i].url, imageOutputPath);
            }
        } else {
            console.error("No output image URL found in response.");
        }
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error.message);
    }
}

// Export all functions for use in other files
export {removeObject, generateImageFluxLora };
