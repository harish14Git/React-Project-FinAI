import React, { useState } from "react";

const Assistant = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  const assistantAvatar = "/src/assets/images/assistant-avatar.png";
  const userAvatar = "/src/assets/images/user-avatar.png"; // add any user image here

  // Basic smart reply logic
  const generateResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("save"))
      return "Based on your past expenses, reducing online purchases and food delivery helps save 15–20%.";

    if (msg.includes("budget"))
      return "A healthy monthly budget follows the 50-30-20 rule: Needs, Wants, Savings.";

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello! I’m your Finance Assistant. Ask me anything about expenses or savings.";

    if (msg.includes("expense"))
      return "Your expenses appear slightly high this month. Consider tracking daily spending.";

    return "Here’s a simple tip: Reviewing weekly expenses helps reduce overspending by 10–15%.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = {
      sender: "user",
      text: input,
      avatar: userAvatar,
    };

    setChat([...chat, newUserMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: generateResponse(newUserMessage.text),
        avatar: assistantAvatar,
      };

      setChat((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="page-container fade-in">
      <div className="assistant-header">
        <img src={assistantAvatar} className="assistant-img" alt="assistant" />
        <h2>Your Personal Finance Assistant</h2>
        <p>Ask anything related to budgeting, expenses, and money-saving tips.</p>
      </div>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-row ${msg.sender === "user" ? "right" : "left"}`}
          >
            {/* Avatar */}
            {msg.sender === "bot" && (
              <img src={msg.avatar} className="chat-avatar" alt="bot" />
            )}

            {/* Message bubble */}
            <div
              className={`chat-message ${
                msg.sender === "user" ? "user-msg" : "bot-msg"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <img src={msg.avatar} className="chat-avatar" alt="user" />
            )}
          </div>
        ))}

        {typing && <div className="typing">Assistant is typing...</div>}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Assistant;
