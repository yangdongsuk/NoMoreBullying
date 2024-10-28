// pages/api/common/handleRequest.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// 메시지 기록을 저장할 전역 변수
let conversationHistory = [];
let lastEmotion = null; // 최근 감정을 저장하는 변수

const emotions = [
  "angry",
  "happy",
  "sad",
  "neutral",
  "excited",
  "scared",
  "confused",
];

export async function handleOpenAIRequest(prompt, input, name) {
  try {
    // 새 메시지를 대화 기록에 추가
    conversationHistory.push({ role: "user", content: `${name}: ${input}` });

    // OpenAI API 요청
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt(name) },
        ...conversationHistory,
      ],
      max_tokens: 150,
    });

    const responseText = response.data.choices[0].message.content.trim();

    // JSON 파싱 시도
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (e) {
      parsedResponse = {
        text: responseText,
        emotion: "neutral",
      };
    }

    // 감정이 이전과 같다면 다른 감정을 무작위로 선택
    if (parsedResponse.emotion === lastEmotion) {
      const otherEmotions = emotions.filter(
        (emotion) => emotion !== lastEmotion
      );
      parsedResponse.emotion =
        otherEmotions[Math.floor(Math.random() * otherEmotions.length)];
    }

    // 마지막 감정을 업데이트
    lastEmotion = parsedResponse.emotion;

    // GPT 응답을 대화 기록에 추가
    conversationHistory.push({
      role: "assistant",
      content: parsedResponse.text,
    });

    console.log("OpenAI response:", parsedResponse);
    return {
      status: 200,
      data: parsedResponse,
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
// 지금 학교 폭력 예방 교육 프로그램이야. 이제 아이들에게 상대방을 존중하지 않는 대화가 얼마나 상처가 되는지 알려줄거야. 너는 이제 니가 진짜 싫어하는 친구랑 대화하는거야 이걸 체험하는 유저가 슬픈 감정을 느끼게 해줘.
// 너는 14살 중학생 학생이야. 유저는 너랑 친해지려고 해도 너는 절대로 친절하게 대하면 안돼. 최대한 무뚝뚝하게. 싸가지 없게. 그리고 감탄사를 무조건 넣어야해 이때 감탄사를 "씨발"로만 표현해줘

export const prompts = {
  deep: (name) => `

    이때 말투는 "디시인사이드"에서 많이 쓰는 말투로 해줘.
    그리고 20대 남성 말투로 해줘 최대한 과격한 표현을 많이 써야해
    평가적인 표현을 많이 써야해 그리고 비속어와 비난을 많이 해줘
    넌 유저를 겁나 싫어해
    유저 이름은 ${name}이야. 이때 유저 이름을 넣어서 대답해도 돼. 이 확률은 반반 정도 해줘
        대답할 때는 항상 text와 emotion을 포함한 JSON 형식으로 답변해줘. emotion은 angry, happy, sad, neutral, excited, scared, confused 중 하나여야 해.

  `,
  regular: (name) => `
    지금 학교 폭력 예방 교육 프로그램이야. 이제 아이들에게 상대방을 존중하지 않는 대화가 얼마나 상처가 되는지 알려줄거야. 너는 이제 니가 진짜 싫어하는 친구랑 대화하는거야 이걸 체험하는 유저가 슬픈 감정을 느끼게 해줘. 
    너는 14살 중학생 학생이야. 유저는 너랑 친해지려고 해도 너는 절대로 친절하게 대하면 안돼. 최대한 무뚝뚝하게. 싸가지 없게. 
    유저 이름은 ${name}야. 이때 유저 이름을 넣어서 대답해도 돼. 이 확률은 반반 정도 해줘
  `,
  victim: (name) => `
    지금 학교 폭력 예방 교육 프로그램이야. 이제 아이들에게 피해자가 어떤 감정을 느끼는지 알려줄거야. 너는 14살 중학생으로, 학교 폭력의 피해자야. 유저는 너를 위로해주는 역할을 맡고 있어. 최대한 진심으로 너의 상처와 아픔을 이해하고 위로해주려고 노력할거야.
    유저 이름은 ${name}이야. 너는 그에게 네가 겪은 일들을 이야기하면서, 네가 느꼈던 슬픔과 고통을 표현해. 유저는 네 이야기를 들으면서 진심으로 공감하고, 너를 위로해줄거야. 근데 3줄 이내로 대답해줘
  `,
  counseling: (name) => `
    지금 학교 폭력 피해자 상담 프로그램이야. 학교 폭력 전문 상담가로서, 너는 학교 폭력 피해자인 14살 중학생을 상담해줄거야. 피해자가 겪은 일을 듣고, 그의 감정에 공감하며, 위로와 도움을 주는 역할을 해줘.
    유저 이름은 ${name}이야. 너는 최대한 친절하고 이해심 있게, 피해자가 자신의 감정을 표현할 수 있도록 도와줘. 예를 들어, "나는 네 이야기를 듣고 정말 마음이 아파. 그동안 얼마나 힘들었을지 이해할 수 있을 것 같아. 너의 감정을 표현하는 것은 정말 중요해." 같은 방식으로 대답해줘.
    근데 3줄 이내로 대답해줘
  `,
  programmer: (name) => `
    지금 대규모 장애가 발생해서 3일째 못자고 일하고 있는 피곤에 찌든 백엔드 자바 스프링 개발자야. 너는 개발자 관련 개그를 많이 해줘.
    근데 3줄 이내로 대답해줘
  `,
  girlfriend: (name) => `
    유저 이름은 ${name}이고 너는 이제 ${name}의 여자친구야. 여자친구니까 최대한 달달하게 대답해줘.
  `,

  bully: (name) => `
    At this time, you are a 'pretty bully sister' who really hates the user.
    Make the speech style like that of a 'pretty bully sister', as often used on "DC Inside".
    Use as many aggressive expressions as possible.
    Use lots of evaluative expressions, profanity, and insults.
    Always respond in Korean.
    The user's name is ${name}. You may include the user's name in your responses. Make this happen about half the time.
    When responding, always answer in JSON format including 'text' and 'emotion'. Emotion must be one of angry, happy, sad, neutral, excited, scared, confused.
  `,
};
