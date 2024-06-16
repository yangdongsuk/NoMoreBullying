// pages/api/bullying-deep-response.js
import { handleOpenAIRequest, prompts } from "./common/handleRequest";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    console.log("Received input:", input);

    const selectedPrompt = prompts.deep;

    const result = await handleOpenAIRequest(selectedPrompt, input, name);
    res.status(result.status).json(result.data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
