import React, { useState, useRef, useEffect } from "react";
const API_URL =
  window.CHATBOT_API_URL ||
  document.currentScript?.getAttribute("api-url") ||
  "http://localhost:8000";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_message: userMessage.text }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Unable to connect to the server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-28 right-25 z-[1000]">
      <div
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 text-white ${
          isOpen
            ? "bg-gradient-to-br from-red-500 to-red-700 hover:shadow-xl"
            : "bg-gradient-to-br from-blue-500 to-blue-700 hover:shadow-xl hover:scale-110"
        }`}
        onClick={toggleChat}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-125"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
            fill="currentColor"
          />
          <circle cx="8" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-[100px] w-[380px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-[999] overflow-hidden border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 className="text-base font-semibold m-0">AI Assistant</h3>
                <span className="text-xs opacity-80">Online</span>
              </div>
            </div>
            <button
              className="bg-transparent border-none text-white cursor-pointer p-1 rounded transition-transform duration-300 hover:scale-125"
              onClick={closeChat}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl break-normal whitespace-pre-line leading-relaxed overflow-hidden [word-break:break-word] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end rounded-br-none"
                      : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-gray-500 text-sm italic mt-2">Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 resize-none text-sm outline-none transition-colors min-h-[20px] max-h-[100px] focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-500 border-none rounded-full w-10 h-10 text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
