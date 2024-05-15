import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Set chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: "VqlZDcsfQxYRqJS6lRxeA",
      domain: "www.chatbase.co",
    };

    // Create script for chatbot
    const chatbotScript = document.createElement("script");
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.setAttribute("chatbotId", "VqlZDcsfQxYRqJS6lRxeA");
    chatbotScript.setAttribute("domain", "www.chatbase.co");
    chatbotScript.defer = true;
    document.body.appendChild(chatbotScript);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(chatbotScript);
    };
  }, []);

  return null;
};

export default Chatbot;
