import React from "react";
import ReactDOM from "react-dom/client";
import FloatingChatbot from "./components/FloatingChatbot.jsx";
import "./index.css";

console.log("✅ Chatbot widget script loaded!");
const widgetDiv = document.createElement("div");
widgetDiv.id = "chatbot-widget-root";
document.body.appendChild(widgetDiv);

ReactDOM.createRoot(widgetDiv).render(React.createElement(FloatingChatbot));
