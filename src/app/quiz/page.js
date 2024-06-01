"use client";

import { useState } from "react";
import Link from "next/link";

const quizData = [
  {
    question: "학교 폭력은 모든 학교에서 발생한다.",
    answer: "O",
    explanation:
      "모든 학교에서 학교 폭력이 발생할 가능성이 있으며, 이를 예방하기 위한 교육이 필요합니다.",
  },
  {
    question: "학교 폭력은 피해자에게만 영향을 미친다.",
    answer: "X",
    explanation:
      "학교 폭력은 피해자뿐만 아니라 가해자, 목격자 등 모든 학생에게 부정적인 영향을 미칩니다.",
  },
  // 추가 문제를 여기에 정의
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-lg font-bold text-center">OX 퀴즈</h1>
        </div>
        <div className="p-4">
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
              } hover:bg-blue-700`}
            >
              O
            </button>
            <button
              onClick={() => handleAnswer("X")}
              className={`px-4 py-2 rounded-lg ${
                selectedAnswer === "X"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-700`}
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
