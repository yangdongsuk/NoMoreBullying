// commonHandler.js
import { handleOpenAIRequest } from "./handleRequest";

// 감정에 따른 이미지 매핑
const emotionToImage = {
  angry: "/images/emotions/angry.jpg",
  happy: "/images/emotions/happy.jpg",
  sad: "/images/emotions/sad.jpg",
  neutral: "/images/emotions/neutral.jpg",
  excited: "/images/emotions/excited.jpg",
  scared: "/images/emotions/scared.jpg",
  confused: "/images/emotions/confused.jpg",
};

export async function commonHandler(req, res, selectedPrompt) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    console.log("Received input:", input);

    const result = await handleOpenAIRequest(selectedPrompt, input, name);

    if (result.status === 200) {
      const answer = {
        text: result.data.text,
        image:
          emotionToImage[result.data.emotion] || "/images/emotions/neutral.jpg",
      };
      console.log("Final response:", answer);
      res.status(200).json(answer);
    } else {
      console.error("Error in handler:", result);
      res.status(result.status).json({
        text: "죄송합니다. 오류가 발생했습니다.",
        image: emotionToImage.confused,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
