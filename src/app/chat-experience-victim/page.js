"use client";
import ChatBox from "../components/ChatBox";
import { Suspense } from "react";

export default function ChatExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox apiEndpoint="/api/victim-response" title="피해자 위로" />
    </Suspense>
  );
}
