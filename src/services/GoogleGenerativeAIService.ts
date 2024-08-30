import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../infra/config/config";

const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export class GoogleGenerativeAIService {
  static async extractMeasureFromImage(imageBase64: string): Promise<number> {
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    };
    const prompt =
      "Extract the meter reading from this image and just tell the meter.";
    const result = await model.generateContent([prompt, imagePart]);
    const data = result.response.text();
    const measureValue = parseInt(data, 10);
    if (isNaN(measureValue)) {
      throw new Error("Failed to extract measure value from image.");
    }
    return measureValue;
  }
}
