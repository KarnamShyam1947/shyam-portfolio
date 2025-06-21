import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getColorScheme } from '../context/ThemeContext';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(input.toLowerCase());
      const botMessage: Message = { type: 'bot', content: response };
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('experience') || input.includes('work')) {
      return "I have 4 years of experience in web development, specializing in React and Node.js. I've worked on various projects including e-commerce platforms and task management systems.";
    }
    if (input.includes('skills') || input.includes('technologies')) {
      return "I'm proficient in React, TypeScript, Node.js, and various other web technologies. I also have experience with cloud platforms like AWS and database systems.";
    }
    if (input.includes('education') || input.includes('study')) {
      return "I completed my Bachelor's in Computer Science from Example University in 2023 with First Class Honours.";
    }
    if (input.includes('contact') || input.includes('hire')) {
      return "You can reach me at contact@example.com or through the contact form on my website. I'm currently available for freelance work and full-time positions.";
    }
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm Shyam's virtual assistant. How can I help you today?";
    }
    return "I'm here to help you learn more about Shyam. You can ask about his experience, skills, education, or how to contact him.";
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 p-3 ${colors.button} text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Chat Window */}
      <div className={`fixed right-0 bottom-0 w-96 bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 z-50 rounded-t-xl ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Chat with Me</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400">
              Ask me anything about Shyam!
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? `${colors.button} text-white`
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white'
                }`}>
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
            />
            <button
              onClick={handleSend}
              className={`p-2 ${colors.button} text-white rounded-lg`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;