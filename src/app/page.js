"use client";
import { useEffect, useState } from "react";
import useNameState from "@/hooks/useNameState";
import Card from "./components/Card";

export default function HomePage() {
  const { name } = useNameState();
  const [chatExperiencePaths, setChatExperiencePaths] = useState({
    basic: "",
    deep: "",
    victim: "",
    counseling: "",
    programmer: "",
    girlfriend: "",
    bully: "",
    nasdaq: "",
  });

  useEffect(() => {
    const generatePath = (version) =>
      name.trim() === ""
        ? `/enter-name?version=${version}`
        : `/chat-experience-${version}?name=${encodeURIComponent(name)}`;

    setChatExperiencePaths({
      basic: generatePath("basic"),
      deep: generatePath("deep"),
      bully: generatePath("bully"),
      victim: generatePath("victim"),
      counseling: generatePath("counseling"),
      programmer: generatePath("programmer"),
      girlfriend: generatePath("girlfriend"),
      nasdaq: generatePath("nasdaq"),
    });
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-slate-200 to-slate-300">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h1 className="text-3xl font-bold">사이버 폭력 통합 사이트</h1>
        </div>
        <div className="p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {name.trim() !== "" ? (
              <Card
                image="/images/user_welcome.jpg"
                icon="public/images/user.svg"
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
              icon="public/images/chat-bubble-left-right.svg"
              title="기본 채팅 체험"
              description="기본 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요."
              link={chatExperiencePaths.basic}
              buttonText="기본 채팅 체험 시작하기"
            />
            <Card
              image="/images/deep_ai_chatbot.jpg"
              icon="public/images/chat-bubble-left-ellipsis.svg"
              title="심층 채팅 체험"
              description="심층 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요. (욕설 나올 가능성이 높습니다.)"
              link={chatExperiencePaths.deep}
              buttonText="심층 채팅 체험 시작하기"
            />
            <Card
              image="/images/bully.jpg"
              icon="public/images/chat-bubble-oval-left-ellipsis.svg"
              title="일진 채팅 체험"
              description="일진 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요."
              link={chatExperiencePaths.bully}
              buttonText="일진 채팅 체험 시작하기"
            />
            <Card
              image="/images/bully.jpg"
              icon="public/images/arrow-trending-down.svg"
              title="나스닥 물린 일진 채팅 체험"
              description="나스닥 물린 일진 채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요."
              link={chatExperiencePaths.nasdaq}
              buttonText="나스닥 물린 일진 채팅 체험 시작하기"
            />
            <Card
              image="/images/victim.jpg"
              icon="public/images/heart.svg"
              title="피해자 위로해주기"
              description="학교 폭력 피해자를 채팅으로 위로해주세요."
              link={chatExperiencePaths.victim}
              buttonText="피해자 위로 시작하기"
            />
            <Card
              image="/images/counseling.jpg"
              icon="public/images/lifebuoy.svg"
              title="학교 폭력 상담"
              description="학교 폭력 상담입니다. 자신의 이야기를 들려주세요."
              link={chatExperiencePaths.counseling}
              buttonText="상담 시작하기"
            />
            <Card
              image="/images/programmer.jpg"
              icon="public/images/cpu-chip.svg"
              title="피곤한 개발자"
              description="대규모 장애 때매 3일간 잠을 못 잔 백엔드 개발자랑 이야기하며 행복해져보세요."
              link={chatExperiencePaths.programmer}
              buttonText="대화 시작하기"
            />
            <Card
              image="/images/girlfriend.jpg"
              icon="public/images/user.svg"
              title="여자친구"
              description="여자친구랑 이야기하며 행복해져보세요."
              link={chatExperiencePaths.girlfriend}
              buttonText="대화 시작하기"
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
