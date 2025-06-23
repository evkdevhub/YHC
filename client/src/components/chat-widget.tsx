import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  sessionId: string;
  shouldEncourageApplication?: boolean;
  suggestedAction?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hi! I'm here to help answer questions about driving for My Star LLC. What would you like to know about our pay, benefits, or requirements?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId] = useState(() => crypto.randomUUID());

  const sendMessage = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        sessionId
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: data.message,
        isUser: false,
        timestamp: new Date()
      }]);
    },
    onError: (error) => {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: "I'm having trouble right now. Please call us at 1-800-MYSTAR1 for immediate assistance!",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessage.mutate(inputValue);
    setInputValue("");
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessage.mutate(question);
  };

  const quickQuestions = [
    "What's the starting pay?",
    "How often am I home?",
    "What are the requirements?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gold hover:bg-yellow-600 text-navy w-16 h-16 rounded-full shadow-2xl transition-all hover:scale-110"
        size="icon"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[calc(100vh-8rem)] animate-fade-in z-40">
          <Card className="shadow-2xl border border-gray-200 flex flex-col max-h-full">
            <CardHeader className="bg-navy text-white p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <Bot className="text-navy w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Driver Assistant</h4>
                    <p className="text-xs text-gray-300">Ask me about pay, benefits, or requirements</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages min-h-64 max-h-80">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'items-start space-x-3'}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="text-navy w-4 h-4" />
                      </div>
                    )}
                    <div className={`max-w-60 ${message.isUser ? 'text-right' : ''}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.isUser
                            ? 'bg-gold text-navy'
                            : 'bg-light-gray text-navy'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.isUser ? 'You' : 'Driver Assistant'}
                      </p>
                    </div>
                  </div>
                ))}
                {sendMessage.isPending && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="text-navy w-4 h-4" />
                    </div>
                    <div className="max-w-60">
                      <div className="bg-light-gray rounded-2xl px-4 py-3">
                        <p className="text-sm text-navy">Typing...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about pay, benefits, home time..."
                    className="flex-1 rounded-full"
                    disabled={sendMessage.isPending}
                  />
                  <Button
                    type="submit"
                    className="bg-gold hover:bg-yellow-600 text-navy rounded-full flex-shrink-0"
                    size="icon"
                    disabled={sendMessage.isPending || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>

                {/* Quick Questions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickQuestions.map((question) => (
                    <Button
                      key={question}
                      onClick={() => handleQuickQuestion(question)}
                      variant="outline"
                      className="text-xs bg-gray-100 hover:bg-gold hover:text-navy text-gray-700 px-3 py-1 rounded-full transition-colors h-auto"
                      disabled={sendMessage.isPending}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
