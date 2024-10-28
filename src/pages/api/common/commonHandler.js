// commonHandler.js
import { handleOpenAIRequest } from "./handleRequest";

export async function commonHandler(req, res, selectedPrompt) {
  if (req.method === "POST") {
    const { input, name } = req.body;

    try {
      const stream = await handleOpenAIRequest(selectedPrompt, input, name);

      res.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      });

      for await (const part of stream) {
        const content = part.choices[0]?.delta?.content || "";
        if (content) {
          res.write(`data: ${JSON.stringify(content)}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      console.error("스트림 오류:", error);
      res.status(500).send("서버 오류가 발생했습니다.");
    }
  } else {
    res.status(405).send("허용되지 않은 메소드입니다.");
  }
}
