"use client";

import { useState } from "react";
import Link from "next/link";

const quizData = [
  {
    question: "SNS에서 누군가에 대한 나쁜 소문을 퍼뜨리거나 허위 사실을 공유하는 것은 학교폭력에 해당한다.",
    answer: "O",
    explanation:
        "악의적인 소문이나 허위 사실을 퍼뜨리는 행위는 명예훼손에 해당하며, 심각한 학교폭력 사안으로 처리될 수 있습니다.",
  },
  {
    question: "친구의 사진이나 개인정보를 본인 동의 없이 SNS에 게시하는 것은 장난이라도 괜찮다.",
    answer: "X",
    explanation:
        "장난이라 하더라도 타인의 동의 없이 개인정보나 사진을 공개하는 것은 사생활 침해이자 학교폭력에 해당할 수 있으며, 법적 처벌의 대상이 될 수 있습니다.",
  },
  {
    question: "SNS에서 특정 학생을 고의적으로 단체 채팅방에서 제외하거나 따돌리는 행위는 학교폭력이다.",
    answer: "O",
    explanation:
        "온라인상에서의 따돌림이나 고의적인 배제 행위는 명백한 학교폭력이며, 피해 학생에게 심각한 정서적 피해를 줄 수 있습니다.",
  },
  {
    question: "1:1 채팅이나 개인 메시지로 지속적인 욕설이나 협박을 보내는 것은 법적 처벌이 가능하다.",
    answer: "O",
    explanation:
        "개인 메시지라도 지속적인 욕설이나 협박은 정보통신망법 위반으로 처벌될 수 있으며, 심각한 사이버 폭력 사례로 간주됩니다.",
  },
  {
    question: "SNS에 올린 게시물은 삭제하면 완전히 사라지므로 큰 문제가 되지 않는다.",
    answer: "X",
    explanation:
        "온라인에 한 번 게시된 내용은 캡처나 저장 등으로 완전한 삭제가 불가능할 수 있으며, 빠른 확산으로 인해 영구적인 피해를 초래할 수 있습니다.",
  }
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setShowExplanation(true);
      if (answer === currentQuestion.answer) {
        setScore(score + 1);
        setAnswerStatus("correct");
      } else {
        setAnswerStatus("incorrect");
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswerStatus("");
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center">
          <h1 className="text-lg font-bold text-center">OX 퀴즈</h1>
          <Link href="/" legacyBehavior>
            <a className="text-white bg-blue-500 hover:bg-blue-700 rounded-full px-3 py-1">
              홈페이지로
            </a>
          </Link>
        </div>
        <div
          className={`p-4 ${
            answerStatus === "correct"
              ? "bg-green-100"
              : answerStatus === "incorrect"
              ? "bg-red-100"
              : ""
          }`}
        >
          <div className="text-center mb-4">
            <div className="mb-2 text-black font-semibold">
              {currentQuestion.question}
            </div>
            <button
              onClick={() => handleAnswer("O")}
              className={`px-4 py-2 mr-2 rounded-lg ${
                selectedAnswer === "O"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              } ${selectedAnswer !== null ? "cursor-not-allowed" : ""}`}
              disabled={selectedAnswer !== null}
            >
              O
            </button>
            <button
              onClick={() => handleAnswer("X")}
              className={`px-4 py-2 rounded-lg ${
                selectedAnswer === "X"
                  ? "bg-red-700 text-white"
                  : "bg-red-500 text-white"
              } ${selectedAnswer !== null ? "cursor-not-allowed" : ""}`}
              disabled={selectedAnswer !== null}
            >
              X
            </button>
          </div>
          {showExplanation && (
            <div className="mt-4 text-black">
              <div>
                <strong>정답:</strong> {currentQuestion.answer}
              </div>
              <div>
                <strong>해설:</strong> {currentQuestion.explanation}
              </div>
              <div className="mt-2 text-lg font-bold">
                {answerStatus === "correct" ? "맞았습니다!" : "틀렸습니다!"}
              </div>
              {currentQuestionIndex < quizData.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                  다음 문제
                </button>
              ) : (
                <div className="mt-4">
                  <div>
                    <strong>최종 점수:</strong> {score} / {quizData.length}
                  </div>
                  <Link href="/">
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                      홈페이지로
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    진행도
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {currentQuestionIndex + 1} / {quizData.length}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
