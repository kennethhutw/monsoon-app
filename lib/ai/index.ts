// 這個檔案是所有 AI 呼叫的統一出口
// 依 AI_PROVIDER 決定用哪個實作，不要在 route 裡直接 import
// lib/ai/anthropic.ts 或 lib/ai/openrouter.ts
import { anthropicClient } from './anthropic'
import { openrouterClient } from './openrouter'
import type { AiClient } from './types'

export const aiClient: AiClient =
  process.env.AI_PROVIDER === 'openrouter' ? openrouterClient : anthropicClient

// Lets callers skip straight to the fallback when no key is configured,
// instead of attempting the call, failing, and logging a stack trace for
// something that was never going to work.
export function isAiAvailable(): boolean {
  return process.env.AI_PROVIDER === 'openrouter'
    ? Boolean(process.env.OPENROUTER_API_KEY)
    : Boolean(process.env.ANTHROPIC_API_KEY)
}

export { SYSTEM_PROMPT } from './types'
export type { AiCompleteParams, AiClient } from './types'
