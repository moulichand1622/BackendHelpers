import fs from "fs";
import path from "path";
import axios from "axios";

export function createFileObject(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const mimeType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";
    return new File([fileBuffer], fileName, { type: mimeType });
}
export async function downloadImage(imageUrl, outputPath) {
    try {
        const response = await axios({ url: imageUrl, responseType: "arraybuffer" });
        fs.writeFileSync(outputPath, response.data);
        console.log("Output image saved at:", outputPath);
    } catch (error) {
        console.error("Error downloading image:", error.message);
    }
}
export async function downloadAudio(audioUrl, outputPath) {
    if (!audioUrl || !audioUrl.startsWith("http")) {
        console.error("Invalid audio URL:", audioUrl);
        return;
    }

    try {
        console.log("Downloading audio from:", audioUrl);
        const response = await axios({
            url: audioUrl,
            method: "GET",
            responseType: "stream",
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                console.log("Audio file saved at:", outputPath);
                resolve();
            });
            writer.on("error", reject);
        });

    } catch (error) {
        console.error("Error downloading audio:", error.message);
    }
}