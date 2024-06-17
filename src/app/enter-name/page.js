"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useNameState from "@/hooks/useNameState";

const EnterNameContent = () => {
  const { name, setName } = useNameState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const version = searchParams.get("version");
  const inputRef = useRef(null); // input 요소에 대한 참조 생성

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // 처음 로드될 때 input에 포커스를 설정
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!version) {
      router.push(`/`);
    }
    if (version) {
      router.push(
        `/chat-experience-${version}?name=${encodeURIComponent(name)}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-lg font-bold text-center">이름 입력</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            ref={inputRef} // input 요소에 참조 할당
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
            {!version ? "설정하기" : "시작하기"}
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
