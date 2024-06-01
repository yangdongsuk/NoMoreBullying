import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h1 className="text-3xl font-bold text-center">
            사이버 폭력 통합 사이트
          </h1>
        </div>
        <div className="p-6 text-center">
          <p className="mb-4 text-lg">
            이 사이트는 사이버 폭력 예방 및 대처를 위한 다양한 정보를
            제공합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/ai_chatbot.jpg"
                alt="AI Chatbot"
                className="h-40 w-full object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-2xl font-bold mb-2">채팅 체험</h2>
              <p className="text-gray-700 mb-4">
                채팅 체험을 통해 사이버 폭력의 심각성을 느껴보세요.
              </p>
              <Link href="/enter-name">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                  채팅 체험 시작하기
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/quiz.jpg"
                alt="Quiz"
                className="h-40 w-full object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-2xl font-bold mb-2">OX 퀴즈</h2>
              <p className="text-gray-700 mb-4">
                OX 퀴즈를 통해 사이버 폭력에 대해 배워보세요!
              </p>
              <Link href="/quiz">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                  퀴즈 풀기
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/report_system.jpg"
                alt="Report System"
                className="h-40 w-full object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-2xl font-bold mb-2">
                사이버 폭력 신고 시스템
              </h2>
              <p className="text-gray-700 mb-4">
                사이버 폭력 사건을 신고하고 도움을 받을 수 있는 시스템입니다.
              </p>
              <Link href="/report">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                  신고 시스템 이용하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
