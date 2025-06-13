"use client";
import ChatBox from "../../components/ChatBox"; // Adjusted path
import { Suspense } from "react";

export default function ChatExperiencePassiveAggressive() { // Renamed function
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox
        apiEndpoint="/api/passive-aggressive-complimenter-response"
        title="수동적 공격적인 친구와 대화"
      />
    </Suspense>
  );
}
