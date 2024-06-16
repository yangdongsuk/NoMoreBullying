// commonHandler.js
import { handleOpenAIRequest } from "./handleRequest";

export async function commonHandler(req, res, selectedPrompt) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    console.log("Received input:", input);

    const result = await handleOpenAIRequest(selectedPrompt, input, name);
    console.log("Result:", result);
    res.status(result.status).json(result.data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
