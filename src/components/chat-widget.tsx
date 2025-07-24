"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    const trimmed = newMessage.trim()
    if (!trimmed) return

    const userMsg = { role: "user" as const, text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setNewMessage("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()
      const botMsg = { role: "bot" as const, text: data.reply || "Sorry, I didn’t understand that." }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Error. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-80 max-w-[90vw] bg-white border shadow-xl rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
              <span className="font-semibold text-sm text-gray-900">Ask a Question</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={18} />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm text-gray-800 max-h-96">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-3 py-2 w-fit max-w-[85%] ${
                    msg.role === "user" ? "ml-auto bg-cyan-100 text-gray-900" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && <div className="text-gray-400 italic">Typing...</div>}
            </div>

            <div className="flex items-center gap-2 p-3 border-t bg-white">
              <Input
                className="flex-1"
                value={newMessage}
                placeholder="Type a message..."
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="icon" variant="ghost" onClick={handleSendMessage}>
                <Send className="w-4 h-4 text-cyan-700" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          size="icon"
          className="rounded-full bg-cyan-700 text-white hover:bg-cyan-800 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
