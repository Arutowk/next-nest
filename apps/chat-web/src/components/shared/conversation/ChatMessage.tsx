"use client";

type ChatMessageProps = {
  localMessages: string[];
};

export default function ChatMessage({ localMessages }: ChatMessageProps) {
  const messages = [
    "Hello! How can I assist you today?",
    "I am an AI assistant. I can help with a variety of tasks such as answering questions, providing information, and assisting with problem-solving. How may I assist you today?",
    "Sure! What specific task would you like assistance with?",
  ];

  const allMessages = [...messages, ...localMessages];
  return (
    <div className="">
      {allMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
