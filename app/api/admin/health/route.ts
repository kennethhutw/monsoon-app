import { NextResponse } from 'next/server'
import { SystemHealth } from '@/types/admin'

export async function GET() {
  try {
    // TODO（正式版）：實際呼叫 Sepolia RPC 與 Claude API 健康檢查
    // 目前回傳 mock 狀態

    // 🔵 MOCK DATA：
    const health: SystemHealth = {
      sepoliaConnected: false,        // mock 模式不連接真實鏈
      claudeApiStatus: process.env.ANTHROPIC_API_KEY ? 'ok' : 'down',
      claudeApiLatencyMs: 320,
      lastUpdated: new Date().toISOString(),
      errors24h: 0,
    }

    return NextResponse.json(health)
  } catch (error) {
    console.error('[API] admin/health error:', error)
    return NextResponse.json(
      { error: 'Health check failed', code: 'HEALTH_CHECK_ERROR' },
      { status: 500 }
    )
  }
}
