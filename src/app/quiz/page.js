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
  {
    question: "SNS에서 친구를 차단하면 학교폭력이 될 수 있다.",
    answer: "X",
    explanation:
      "친구를 차단하는 것은 자기 방어 수단으로 사용할 수 있으며, 단순히 차단하는 행위는 학교폭력으로 간주되지 않는다. 그러나 차단을 이용해 따돌리거나 괴롭히는 행동은 문제될 수 있다.",
  },
  {
    question:
      "SNS에 누군가에 대한 나쁜 소문을 퍼뜨리는 것은 학교폭력에 해당한다.",
    answer: "O",
    explanation:
      "악의적인 소문을 퍼뜨리는 행위는 명예훼손과 학교폭력에 해당한다.",
  },
  {
    question:
      "SNS에서 친구를 비웃는 댓글을 다는 것은 학교폭력에 해당하지 않는다.",
    answer: "X",
    explanation:
      "비웃는 댓글은 언어적 폭력의 일종으로, 학교폭력에 해당할 수 있다.",
  },
  {
    question:
      "SNS에 다른 사람의 개인정보를 공개하는 것은 학교폭력에 해당할 수 있다.",
    answer: "O",
    explanation: "개인정보 공개는 사생활 침해와 학교폭력에 해당할 수 있다.",
  },
  {
    question: "친구와 SNS 메시지로 다투는 것은 학교폭력에 포함되지 않는다.",
    answer: "X",
    explanation:
      "반복적이고 악의적인 메시지는 사이버 폭력의 형태로 간주될 수 있다.",
  },
  {
    question:
      "SNS에서 누군가를 따돌리기 위해 그룹 채팅에서 제외시키는 것은 학교폭력에 해당한다.",
    answer: "O",
    explanation: "고의적으로 따돌리는 행위는 학교폭력에 포함될 수 있다.",
  },
  {
    question:
      "친구의 굴욕 사진을 장난으로 SNS에 게시하는 것은 사이버 폭력이다.",
    answer: "O",
    explanation:
      "장난이라 할지라도 공개된 사이버 공간에 올린 글, 사진 등으로 상대가 명예를 잃거나 부정적인 이미지가 생기게 되는 경우 형법 311조에 따라 모욕죄로 처벌이 될 수 있다.",
  },
  {
    question: "SNS에서 친구의 게시물에 대해 무례한 댓글을 다는 것은 괜찮다.",
    answer: "X",
    explanation: "무례한 댓글은 언어폭력의 일종으로 학교폭력에 해당할 수 있다.",
  },
  {
    question: "SNS에서 괴롭힘을 당할 때 증거를 남겨두는 것이 중요하다.",
    answer: "O",
    explanation: "증거를 남겨두면 신고 시 중요한 자료로 사용될 수 있다.",
  },
  {
    question:
      "SNS에서 다른 사람의 계정을 해킹하는 것은 범죄이지만 학교폭력과는 무관하다.",
    answer: "X",
    explanation:
      "계정을 해킹하는 것은 범죄이며, 피해자가 학생인 경우 학교폭력의 일환으로 간주될 수 있다.",
  },
  {
    question:
      "온라인 게시물은 실제 때리는 것과 달리 상처가 남지 않기 때문에 쉽게 잊혀질 것이다.",
    answer: "X",
    explanation:
      "온라인 게시물은 빠르게 확산되기 때문에 내가 남긴 글을 지웠다고 해도 다른 곳에 남아있을 수 있어 평생 지울 수 없는 상처가 되기도 한다.",
  },
  {
    question: "1:1 채팅, 개인적 쪽지로 욕설을 보내는 것도 처벌할 수 있다.",
    answer: "O",
    explanation:
      "장난이라도 1:1 채팅 또는 쪽지로 지속적으로 욕설을 보낸다면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조 공포심이나 불안감을 유발하는 부호, 문언 등을 반복적으로 상대방에 도달하게 한 경우로 처벌할 수 있다.",
  },
  {
    question: "사이버상에서 장난으로 친구를 놀리는 것은 사이버 폭력이 아니다.",
    answer: "X",
    explanation:
      "신체적으로 또는 친구관계에서 힘이 약한 친구를 괴롭혀서는 안된다. 불평등한 관계를 당연하게 생각하고 학교나 사이버 공간에서 친구를 저격하고 망신을 주는 것은 처벌될 수 있는 폭력행위이다.",
  },
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
