import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;
      
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add initial assistant message
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantContent;
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Compact Messages Display */}
          {messages.length > 0 && (
            <div className="max-h-48 overflow-y-auto p-3 space-y-2 border-b border-gray-200">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    {message.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-snug">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-4">
            <div className="relative max-w-3xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message about Dhanush's experience, skills, projects..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm shadow-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
