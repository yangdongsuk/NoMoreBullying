"use client";
import ChatBox from "../components/ChatBox";
import { Suspense } from "react";

export default function ChatExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox
        apiEndpoint="/api/report-response"
        title="학교 폭력 내용을 신고해주세요"
      />
    </Suspense>
  );
}
