"use server"

import { createStreamableValue } from "ai/rsc"
import { CoreMessage, streamText } from "ai"
import { ollama } from "ollama-ai-provider"

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: ollama("phi3"),
    messages,
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}

export async function summarizeContent(prompt: string) {
  const result = await streamText({
    model: ollama("phi3"),
    messages: [
      {
        role: "system",
        content: "Summarize the user content in short way less than 3 sentence",
      },
      { role: "user", content: prompt },
    ],
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}

export async function continueWriting(
  prompt: string,
  systemPrompt = `Your Job is to write a task based on the user content. Make it as detailed as possible.`
) {
  const result = await streamText({
    model: ollama("phi3"),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    maxTokens: 400,
    topP: 0.9,
    temperature: 0.5,
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}

export async function generateContent(
  prompt: string,
  systemPrompt = `Your Job is to generate a content based on the user prompt. Make it as detailed as possible.`,
  model = "phi3",
  maxTokens = 300,
  temperature = 0.5
) {
  try {
    const result = await streamText({
      model: ollama(model),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      maxTokens,
      temperature,
    })

    const stream = createStreamableValue(result.textStream)
    return stream.value
  } catch (error) {
    console.error(error)
    return "Sorry, I can't generate content for you at the moment."
  }
}
