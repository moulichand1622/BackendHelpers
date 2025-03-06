import { fal } from "@fal-ai/client";
import { downloadAudio } from "./fileUtils.js";
import dotenv from "dotenv";
dotenv.config(); // Load .env variables

fal.config({
  credentials: process.env.FAL_API_KEY
});

async function generateSpeech(text, voice, outputPath) {
    try {
        const result = await fal.subscribe("fal-ai/kokoro/american-english", {
            input: { prompt: text, voice },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        console.log("Result Data:", result.data);
        console.log("Request ID:", result.requestId);

        const audioUrl = result.data?.audio?.url;
        if (audioUrl) {
            await downloadAudio(audioUrl, outputPath);
        } else {
            console.error("No valid audio URL found in response.");
        }
    } catch (error) {
        console.error("Error generating speech:", error.response?.data || error.message);
    }
}

// Export functions
export { generateSpeech };