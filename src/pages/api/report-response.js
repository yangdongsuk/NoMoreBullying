// pages/api/bullying-response.js
import { handleOpenAIRequest, prompts } from "./common/handleRequest";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const reportText = "학교 폭력 신고가 완료되었습니다. 곧 처리될 예정입니다.";

    setTimeout(() => {
      res.json(reportText);
    }, 500);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
