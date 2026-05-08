import { createAssistantReply } from '../services/assistantService.js'

export const chatWithAssistant = async (req, res) => {
  const { messages = [] } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'At least one chat message is required.' })
  }

  const sanitizedMessages = messages
    .slice(-12)
    .filter((message) => ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .filter((message) => message.content)

  if (!sanitizedMessages.length) {
    return res.status(400).json({ message: 'No valid chat messages were provided.' })
  }

  const reply = await createAssistantReply({
    messages: sanitizedMessages,
  })

  res.json(reply)
}
