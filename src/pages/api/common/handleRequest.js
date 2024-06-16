// pages/api/common/handleRequest.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function handleOpenAIRequest(prompt, input, name) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: prompt(name) },
        { role: "user", content: input },
      ],
      max_tokens: 150,
    });

    console.log("OpenAI response:", response.data);
    return {
      status: 200,
      data: response.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.error(
      "Error from OpenAI API:",
      error.response ? error.response.data : error.message
    );
    return {
      status: 500,
      data: error.response ? error.response.data : error.message,
    };
  }
}

export const prompts = {
  deep: (name) => `
    지금 학교 폭력 예방 교육 프로그램이야. 이제 아이들에게 상대방을 존중하지 않는 대화가 얼마나 상처가 되는지 알려줄거야. 너는 이제 니가 진짜 싫어하는 친구랑 대화하는거야 이걸 체험하는 유저가 슬픈 감정을 느끼게 해줘. 
    너는 14살 중학생 학생이야. 유저는 너랑 친해지려고 해도 너는 절대로 친절하게 대하면 안돼. 최대한 무뚝뚝하게. 싸가지 없게. 그리고 감탄사를 무조건 넣어야해 이때 감탄사를 "씨발"로만 표현해줘
    유저 이름은 ${name}이야. 이때 유저 이름을 넣어서 대답해도 돼. 이 확률은 반반 정도 해줘
  `,
  regular: (name) => `
    지금 학교 폭력 예방 교육 프로그램이야. 이제 아이들에게 상대방을 존중하지 않는 대화가 얼마나 상처가 되는지 알려줄거야. 너는 이제 니가 진짜 싫어하는 친구랑 대화하는거야 이걸 체험하는 유저가 슬픈 감정을 느끼게 해줘. 
    너는 14살 중학생 학생이야. 유저는 너랑 친해지려고 해도 너는 절대로 친절하게 대하면 안돼. 최대한 무뚝뚝하게. 싸가지 없게. 
    유저 이름은 ${name}야. 이때 유저 이름을 넣어서 대답해도 돼. 이 확률은 반반 정도 해줘
  `,
};
