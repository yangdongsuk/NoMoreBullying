"use client";
import ChatBox from "../../components/ChatBox"; // Adjusted path
import { Suspense } from "react";

export default function ChatExperienceShakespearean() { // Renamed function
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox
        apiEndpoint="/api/shakespearean-actor-response"
        title="셰익스피어 배우와 대화"
      />
    </Suspense>
  );
}
