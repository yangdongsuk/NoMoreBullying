"use client";
import ChatBox from "../../components/ChatBox"; // Adjusted path
import { Suspense } from "react";

export default function ChatExperienceConspiracy() { // Renamed function
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox
        apiEndpoint="/api/conspiracy-theorist-response"
        title="음모론자와 대화"
      />
    </Suspense>
  );
}
