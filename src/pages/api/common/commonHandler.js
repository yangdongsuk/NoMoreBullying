// commonHandler.js
import { handleOpenAIRequest } from "./handleRequest";

export async function commonHandler(req, res, selectedPrompt) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    console.log("Received input:", input);

    // 1.jpg~12.jpg 이미지 파일 랜덤으로 선택
    const randomImage = Math.floor(Math.random() * 12) + 1;
    const imagePath = `/images/karina/${randomImage}.jpg`;

    const result = await handleOpenAIRequest(selectedPrompt, input, name);
    const response = {
      text: result.data,
      image: imagePath,
    };
    console.log("Result:", result);
    console.log("Response:", response);
    res.status(result.status).json(response);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
