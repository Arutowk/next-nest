"use client";
import type { Dispatch, RefObject } from "react";
import { useState } from "react";

type MessageInputProps = {
  sendMessage: Dispatch<string>;
  ref: RefObject<HTMLInputElement | null>;
};

export default function MessageInput({ sendMessage, ref }: MessageInputProps) {
  const [inputText, setInputText] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
  };

  return (
    <div className="flex-none w-full relative group">
      {/* Decorative Backing */}
      <div className="absolute inset-0 bg-black transform -skew-x-6 translate-x-2 translate-y-2 clip-input opacity-80"></div>

      <div className="relative flex items-stretch transform -skew-x-6 bg-white clip-input border-2 border-black p-1">
        <input
          ref={ref}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="SEND A CALLING CARD..."
          className="grow bg-transparent border-none outline-none px-6 py-4 font-p5-body text-xl font-bold placeholder-gray-500 text-black transform skew-x-6"
          autoFocus
        />

        <button
          onClick={handleSend}
          className={`
                bg-[#d90000] text-white font-p5-header text-2xl tracking-widest px-8
                hover:bg-black hover:text-[#d90000] transition-colors duration-200
                clip-input flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
        >
          <span className="transform skew-x-6">GO</span>
        </button>
      </div>
    </div>
  );
}
