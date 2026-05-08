import Doctor from '../models/Doctor.js'
import Service from '../models/Service.js'
import { siteKnowledge } from '../utils/siteKnowledge.js'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const summarizeDoctors = (doctors) =>
  doctors.length
    ? doctors
        .map(
          (doctor) =>
            `${doctor.name} - ${doctor.specialization}, ${doctor.experience} years experience, slots: ${doctor.availableSlots.join(', ')}`,
        )
        .join('\n')
    : 'No doctor records available.'

const summarizeServices = (services) =>
  services.length
    ? services
        .map(
          (service) =>
            `${service.title} - ${service.description} Price: Rs. ${service.price}. Duration: ${service.duration}.`,
        )
        .join('\n')
    : 'No service records available.'

const buildGroundingContext = async () => {
  const [doctors, services] = await Promise.all([
    Doctor.find().select('name specialization experience availableSlots').lean(),
    Service.find().select('title description price duration').lean(),
  ])

  return `
${siteKnowledge}

Live doctor data:
${summarizeDoctors(doctors)}

Live service data:
${summarizeServices(services)}
`.trim()
}

export const createAssistantReply = async ({ messages }) => {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY in environment configuration.')
  }

  const groundedContext = await buildGroundingContext()
  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'

  const payload = {
    model,
    temperature: 0.4,
    max_completion_tokens: 900,
    messages: [
      {
        role: 'system',
        content: `
You are Lumina Skin Clinic AI Assistant.

Rules:
- Answer only from the clinic website context and live clinic data provided below.
- If the answer is not present in the provided context, say you do not have that information on this website.
- Do not use web search.
- Do not invent services, doctors, prices, timings, policies, or medical claims.
- Be warm, concise, and practical.
- If helpful, guide the user toward booking, contacting the clinic, or checking the dashboard.
- Do not claim to have performed actions like booking or cancelling unless the product explicitly supports that flow.

Clinic context:
${groundedContext}
        `.trim(),
      },
      ...messages,
    ],
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Groq request failed: ${errorText}`)
  }

  const completion = await response.json()

  return {
    message: completion?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.',
    model: completion?.model || model,
  }
}
