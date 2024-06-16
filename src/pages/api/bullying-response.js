// pages/api/bullying-response.js
import { handleOpenAIRequest, prompts } from "./common/handleRequest";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    console.log("Received input:", input);

    const selectedPrompt = prompts.regular;

    const result = await handleOpenAIRequest(selectedPrompt, input, name);
    console.log("Result:", result);
    res.status(result.status).json(result.data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
