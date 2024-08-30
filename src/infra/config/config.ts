require("dotenv").config();

interface Config { 
    apiKey: string;
    port: number | string;
    imgurClientId: string;
}

export const config: Config = {
    apiKey: process.env.GEMINI_API_KEY as string,
    port: process.env.API_PORT || 3000,
    imgurClientId: process.env.IMGUR_CLIENT_ID as string,
}
