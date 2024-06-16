"use client";
import { useEffect, useState } from "react";
import useNameState from "@/hooks/useNameState";
import Card from "./components/Card";

export default function HomePage() {
  const { name } = useNameState();
  const [chatExperienceBasicPath, setChatExperienceBasicPath] = useState("");
  const [chatExperienceDeepPath, setChatExperienceDeepPath] = useState("");

  useEffect(() => {
    if (name.trim() === "") {
      setChatExperienceBasicPath("/enter-name?version=basic");
      setChatExperienceDeepPath("/enter-name?version=deep");
    } else {
      setChatExperienceBasicPath(
        `/chat-experience-basic?name=${encodeURIComponent(name)}`
      );
      setChatExperienceDeepPath(
        `/chat-experience-deep?name=${encodeURIComponent(name)}`
      );
    }
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h1 className="text-3xl font-bold">사이버 폭력 통합 사이트</h1>
        </div>
        <div className="p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {name.trim() !== "" ? (
              <Card
                image="/images/user_welcome.jpg"
                title="이름 변경"
                description={`${name}님 반갑습니다!`}
                link="/enter-name"
                buttonText="이름 변경하기"
              />
            ) : (
              <Card
                image="/images/user_welcome.jpg"
                title="이름 입력"
                description="이름을 입력해주세요."
                link="/enter-name"
                buttonText="이름 입력하기"
              />
            )}
            <Card
              image="/images/ai_chatbot.jpg"
              title="기본 채팅 체험"
              description="기본 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요."
              link={chatExperienceBasicPath}
              buttonText="기본 채팅 체험 시작하기"
            />
            <Card
              image="/images/ai_chatbot.jpg"
              title="심층 채팅 체험"
              description="심층 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요. (욕설 나올 가능성이 높습니다.)"
              link={chatExperienceDeepPath}
              buttonText="심층 채팅 체험 시작하기"
            />
            <Card
              image="/images/quiz.jpg"
              title="OX 퀴즈"
              description="OX 퀴즈를 통해 사이버 폭력에 대해 배워보세요!"
              link="/quiz"
              buttonText="퀴즈 풀기"
            />
            <Card
              image="/images/report_system.jpg"
              title="사이버 폭력 신고 시스템"
              description="사이버 폭력 사건을 신고하고 도움을 받을 수 있는 시스템입니다."
              link="/report"
              buttonText="신고 시스템 이용하기"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
