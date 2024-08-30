import axios from "axios";
import { config } from "../infra/config/config";

export class ImageProcessingService {
  static async uploadImageToImgur(imageBase64: string): Promise<string> {
    const imgurResponse = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: imageBase64,
        type: "base64",
      },
      {
        headers: {
          Authorization: `Client-ID ${config.imgurClientId}`,
        },
      }
    );
    if (!imgurResponse.data.data || !imgurResponse.data.data.link) {
      throw new Error("Failed to upload image to Imgur.");
    }
    return imgurResponse.data.data.link;
  }
}
