export interface AuditLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  detail?: string
  timestamp: string
}

export interface SystemHealth {
  sepoliaConnected: boolean
  claudeApiStatus: 'ok' | 'degraded' | 'down'
  claudeApiLatencyMs?: number
  lastUpdated: string
  errors24h: number
}

export interface GlobalThresholds {
  buyerConcentrationLimit: number   // %，預設 70
  overdueRateRedLine: number        // %，預設 2.0
  singleBorrowerLimit: number       // 億，預設 15
  updatedAt: string
}
