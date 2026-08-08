import { NextRequest, NextResponse } from 'next/server'
import { aiClient, isAiAvailable, SYSTEM_PROMPT } from '@/lib/ai'
import { AI_FALLBACKS } from '@/lib/aiFallbacks'

export async function POST(request: NextRequest) {
  if (!isAiAvailable()) {
    return NextResponse.json({ evaluation: AI_FALLBACKS.case, isFallback: true }, { status: 200 })
  }
  try {
    const { caseData, question } = await request.json()

    const userMessage = question
      ? `${question}\n\nCase data: ${JSON.stringify(caseData)}`
      : `Assess the risk of the following financing case and give a review recommendation:\n${JSON.stringify(caseData)}`

    const text = await aiClient.complete({ system: SYSTEM_PROMPT, message: userMessage, maxTokens: 800 })

    return NextResponse.json({ evaluation: text, isFallback: false })
  } catch (error) {
    console.error('[AI] case error:', error)
    return NextResponse.json(
      { evaluation: AI_FALLBACKS.case, isFallback: true },
      { status: 200 }
    )
  }
}
