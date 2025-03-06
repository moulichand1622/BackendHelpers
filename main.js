import { removeObject, generateImageFluxLora,inpaintImage } from "./utils/imageProcessor.js";
import {generateSpeech} from "./utils/audioProcessor.js"
// Example usage for object removal
const imagePath = "objectRemovalTestingImages/testCase-1/image1.jpg";
const maskPath = "objectRemovalTestingImages/testCase-1/mask1.png";
const outputPath = "outputs/objectRemovalOutputs/output.jpg";
// removeObject(imagePath, maskPath, outputPath);

const prompt = "in cognimstyle, a girl is standing";
const loraUrl = "https://huggingface.co/moulichand/cognimstyle/resolve/main/lora.safetensors";
// generateImageFluxLora(prompt, outputPath, loraUrl, 2); // Generate 2 images
const inputInpaintImage="image.jpg"
const inputMaskImage = "mask.png"

// inpaintImage(prompt, inputInpaintImage, maskPath, outputPath,loraUrl,3);
 const text = "The future belongs to those who believe in the beauty of their dreams. So, dream big, work hard, and make it happen!";
const voice = "af_heart"; // Choose a voice model
const outputPath_audio = "speech_output.mp3"; // Output file path

// generateSpeech(text, voice, outputPath_audio);