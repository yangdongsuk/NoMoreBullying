"use client";
import ChatBox from "../components/ChatBox";
import { Suspense } from "react";

export default function ChatExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox
        apiEndpoint="/api/bullying-deep-response"
        title="심층 채팅 체험"
      />
    </Suspense>
  );
}
