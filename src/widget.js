import React from "react";
import { createRoot } from "react-dom/client";
import FloatingChatbot from "./components/FloatingChatbot.jsx";

function initChatbotWidget() {
  const container = document.createElement("div");
  container.id = "scrobits-chatbot-widget";
  document.body.appendChild(container);

  createRoot(container).render(<FloatingChatbot />);
}

if (typeof window !== "undefined") {
  window.initChatbotWidget = initChatbotWidget;
  initChatbotWidget();
}
