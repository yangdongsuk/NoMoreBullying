"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EnterNameContent = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const version = searchParams.get("version");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") return;

    const chatExperiencePath =
      version === "deep" ? "chat-experience-deep" : "chat-experience-basic";
    router.push(`/${chatExperiencePath}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-lg font-bold text-center">이름 입력</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요..."
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default function EnterName() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterNameContent />
    </Suspense>
  );
}
