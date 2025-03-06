import { removeObject, generateImageFluxLora } from "./utils/imageProcessor.js";

// Example usage for object removal
const imagePath = "objectRemovalTestingImages/testCase-1/image1.jpg";
const maskPath = "objectRemovalTestingImages/testCase-1/mask1.png";
const outputPath = "outputs/objectRemovalOutputs/output.jpg";
removeObject(imagePath, maskPath, outputPath);

// Example usage for Flux LoRA image generation
const prompt = "in cognimstyle, a girl is climbing a tree";
const loraUrl = "https://huggingface.co/moulichand/cognimstyle/resolve/main/lora.safetensors";
generateImageFluxLora(prompt, "outputs/fluxLoraOutputs/output.jpg", loraUrl, 2); // Generate 2 images
 