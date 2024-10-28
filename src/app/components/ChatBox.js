import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ChatBox = ({ apiEndpoint, title }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting || userInput.trim() === "") return;

    const inputText = `${name}: ${userInput.trim()}`;
    setUserInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput.trim() },
    ]);
    setIsSubmitting(true);
    setIsTyping(true);

    try {
      // 이미지를 가져옵니다
      const imageRes = await fetch("/api/get-random-image");
      const imageData = await imageRes.json();

      // 새 메시지 객체를 생성하고 상태에 추가
      const newMessage = {
        sender: "bot",
        text: "",
        image: imageData.image,
      };

      setMessages((prev) => [...prev, newMessage]);

      // 스트림 데이터 처리
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText, name }),
      });

      if (!res.ok) throw new Error("API 요청 실패");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const content = line.slice(6).trim();
            if (content === "[DONE]") {
              break;
            }
            if (content) {
              const parsedContent = JSON.parse(content);
              accumulatedText += parsedContent;

              setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.text = accumulatedText;
                return newMessages;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("오류:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "죄송합니다. 오류가 발생했습니다.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
      scrollToBottom();
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isComposing) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleComposition = (event) => {
    if (event.type === "compositionstart") {
      setIsComposing(true);
    }
    if (event.type === "compositionend") {
      setIsComposing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center">
          <h1 className="text-lg font-bold">{title}</h1>
          <Link href="/" legacyBehavior>
            <a className="text-white bg-blue-500 hover:bg-blue-700 rounded-full px-3 py-1">
              홈페이지로
            </a>
          </Link>
        </div>
        <div className="p-4 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white max-w-xs"
                    : "bg-gray-200 text-black max-w-sm"
                }`}
              >
                {msg.sender === "bot" && msg.image && (
                  <div className="mb-2">
                    <Image
                      src={msg.image}
                      alt="Bot response image"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="p-3 rounded-lg bg-gray-200 text-black flex items-center">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse mr-2"></div>
                <span>입력 중...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-4 border-t border-gray-200"
        >
          <textarea
            ref={textareaRef}
            rows="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PaperAirplaneIcon className="w-5 h-5 transform rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
