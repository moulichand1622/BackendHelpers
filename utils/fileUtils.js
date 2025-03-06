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