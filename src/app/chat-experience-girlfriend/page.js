"use client";
import ChatBox from "../components/ChatBox";
import { Suspense } from "react";

export default function ChatExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox apiEndpoint="/api/girlfriend-response" title="여자친구" />
    </Suspense>
  );
}
