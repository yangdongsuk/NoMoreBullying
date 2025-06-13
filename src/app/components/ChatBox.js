import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ChatBox = ({ apiEndpoint, title }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
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
      { sender: "system", type: "loading", text: "상대방이 입력중입니다..." },
    ]);
    setIsSubmitting(true);

    // Helper function to remove loading messages
    const removeLoadingMessage = () => {
      setMessages((prev) => prev.filter(msg => msg.type !== "loading"));
    };

    try {
      removeLoadingMessage(); // Clear previous loading messages before new operation
      // 이미지를 가져옵니다
      // 엔드포인트를 쿼리 파람으로 전달하여 이미지를 가져옵니다
      // GET /api/get-random-image?type=/api/counseling-response
      const imageRes = await fetch(`/api/get-random-image?type=${apiEndpoint}`);
      const imageData = await imageRes.json();

      removeLoadingMessage(); // Remove loading message once image is fetched

      // 이미지 메시지를 분리하여 추가
      const imageMessage = {
        sender: "bot",
        image: imageData.image,
      };

      setMessages((prev) => [...prev, imageMessage]);

      // 텍스트 메시지를 초기화하고 추가
      const textMessage = {
        sender: "bot",
        text: "",
      };

      setMessages((prev) => [...prev, textMessage]);

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
                // 마지막으로 추가된 봇의 텍스트 메시지를 업데이트
                const lastMessageIndex = newMessages
                  .slice()
                  .reverse()
                  .findIndex((msg) => msg.sender === "bot" && !msg.image);
                if (lastMessageIndex !== -1) {
                  const indexToUpdate =
                    newMessages.length - 1 - lastMessageIndex;
                  newMessages[indexToUpdate].text = accumulatedText;
                }
                return newMessages;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("오류:", error);
      removeLoadingMessage();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      removeLoadingMessage(); // Ensure loading is removed in finally
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="flex flex-col w-full h-screen md:h-[900px] md:w-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-bold">{title}</h1>
          <Link href="/" legacyBehavior>
            <a className="text-white bg-blue-500 hover:bg-blue-700 rounded-full px-2 py-1 text-sm sm:px-3 sm:py-1">
              홈페이지로
            </a>
          </Link>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {msg.sender === "bot" && (
                <Image
                  src="/images/avatars/bot_avatar.svg"
                  alt="Bot Avatar"
                  width={32}
                  height={32}
                  className="rounded-full mr-2 sm:mr-3"
                />
              )}
              {msg.type === "loading" ? (
                <div className="text-sm text-gray-500 italic p-2 sm:p-3">
                  {msg.text}
                </div>
              ) : (
                <div
                  className={`max-w-[70%] sm:max-w-[65%] p-2 sm:p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : msg.sender === "bot"
                      ? "bg-gray-300 text-black"
                      : "" // Should not happen with current logic
                  } break-words`}
                >
                  {msg.image ? (
                    <Image
                      src={msg.image}
                      alt="Bot response image"
                      width={200}
                      height={200}
                      className="rounded-lg w-full h-auto"
                    />
                  ) : msg.text ? (
                    msg.text
                  ) : null}
                </div>
              )}
              {msg.sender === "user" && (
                <Image
                  src="/images/avatars/user_avatar.svg"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full ml-2 sm:ml-3"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-2 sm:p-4 border-t border-gray-200"
        >
          <textarea
            ref={textareaRef}
            rows="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="submit"
            className="ml-2 sm:ml-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center"
          >
            <PaperAirplaneIcon className="w-6 h-6 transform rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
