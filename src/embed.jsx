import React from "react";
import ReactDOM from "react-dom/client";
import FloatingChatbot from "./components/FloatingChatbot.jsx";
import "./index.css";

const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://chatbot-ui-chi-beryl.vercel.app/chatbot-widget.css"; 
document.head.appendChild(cssLink);

const widgetDiv = document.createElement("div");
widgetDiv.id = "chatbot-widget-root";
document.body.appendChild(widgetDiv);

ReactDOM.createRoot(widgetDiv).render(React.createElement(FloatingChatbot));
