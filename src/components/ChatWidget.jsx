import { AnimatePresence, motion } from 'framer-motion'
import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { assistantService } from '../services/assistantService'

const starterMessages = [
  {
    role: 'assistant',
    content:
      'Hello. I can help with services, doctors, booking steps, appointment questions, and clinic information.',
  },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(starterMessages)

  const sendMessage = async () => {
    const content = input.trim()
    if (!content || loading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await assistantService.chat({
        messages: nextMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      })

      setMessages((current) => [...current, { role: 'assistant', content: response.message }])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: error.response?.data?.message || 'The assistant is unavailable right now. Please try again shortly.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="luxury-gradient fixed bottom-5 right-5 z-50 flex h-15 w-15 items-center justify-center rounded-full text-white shadow-[0_22px_60px_rgba(86,61,37,0.35)]"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="glass fixed bottom-5 right-5 z-50 flex h-[min(42rem,calc(100vh-2.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem]"
          >
            <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="luxury-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-ink">AI Concierge</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Lumina assistant</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white p-2 text-ink/70">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 ${
                    message.role === 'user'
                      ? 'ml-auto bg-ink text-white'
                      : 'bg-white/80 text-ink shadow-sm'
                  }`}
                >
                  {message.content}
                </motion.div>
              ))}

              {loading && (
                <div className="inline-flex items-center gap-2 rounded-[1.5rem] bg-white/80 px-4 py-3 text-sm font-semibold text-ink/60">
                  <LoaderCircle size={16} className="animate-spin text-gold" />
                  Thinking
                </div>
              )}
            </div>

            <div className="border-t border-gold/10 p-4">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      sendMessage()
                    }
                  }}
                  rows={1}
                  placeholder="Ask about services, doctors, booking, or clinic details"
                  className="field min-h-14 resize-none"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="luxury-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
