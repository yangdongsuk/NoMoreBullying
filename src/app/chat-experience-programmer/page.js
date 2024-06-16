"use client";
import ChatBox from "../components/ChatBox";
import { Suspense } from "react";

export default function ChatExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox apiEndpoint="/api/programmer-response" title="피곤한 개발자" />
    </Suspense>
  );
}
