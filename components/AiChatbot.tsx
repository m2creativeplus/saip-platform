"use client";

import React, { useState } from 'react';
import { useAuth } from "@/components/AuthProvider";
import { MessageCircle, X, Send, Bot, Sparkles, Mic, MicOff } from 'lucide-react';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the SAIP Gemini Helper. How can I assist you with your Somaliland automotive search today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  if (!mounted) return null;

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInput("Where can I find Toyota parts in Hargeisa?");
      }, 3000);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      setMessages([...newMsgs, data]);
    } catch (err) {
      console.error(err);
      setMessages([...newMsgs, { role: "assistant", content: "Sorry, I encountered an error connecting to the Gemini intelligence network." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#D4AF37] hover:bg-[#F2D16B] rounded-full flex items-center justify-center text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all z-50"
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50" style={{ height: "500px", maxHeight: "80vh" }}>
          
          {/* Header */}
          <div className="bg-[#D4AF37] p-4 flex justify-between items-center text-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold font-outfit">Gemini Intelligence</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-md transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#f5f6fa]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === "user" 
                    ? "bg-[#D4AF37] text-[#0A0A0A] rounded-tr-none font-medium" 
                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-500 italic">
                  Gemini is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2 rounded-full transition-colors flex-shrink-0 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              title="Gemini Live Voice"
            >
              {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask anything..."} 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37] text-sm"
              disabled={isListening}
            />
            <button 
              type="submit" 
              disabled={loading || (!input.trim() && !isListening)}
              className="bg-[#D4AF37] hover:bg-[#F2D16B] disabled:bg-gray-300 text-[#0A0A0A] p-2 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
