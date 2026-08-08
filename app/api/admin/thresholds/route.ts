import { NextRequest, NextResponse } from 'next/server'
import { GlobalThresholds } from '@/types/admin'

// 🔵 MOCK DATA
const MOCK_THRESHOLDS: GlobalThresholds = {
  buyerConcentrationLimit: 70,
  overdueRateRedLine: 2.0,
  singleBorrowerLimit: 15,
  updatedAt: new Date().toISOString(),
}

export async function GET() {
  try {
    // TODO（Supabase）：替換為：
    // const supabase = await createClient()
    // const { data, error } = await supabase.from('thresholds').select('*').single()
    // if (error) throw error
    // return NextResponse.json(data)

    return NextResponse.json(MOCK_THRESHOLDS)
  } catch (error) {
    console.error('[API] admin/thresholds GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch thresholds', code: 'THRESHOLDS_FETCH_ERROR' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    // TODO（Supabase）：替換為：
    // const supabase = await createClient()
    // const { data, error } = await supabase.from('thresholds').update(body).eq('id', 1)
    // if (error) throw error

    // 🔵 MOCK：直接返回更新後的數據
    return NextResponse.json({ ...MOCK_THRESHOLDS, ...body, updatedAt: new Date().toISOString() })
  } catch (error) {
    console.error('[API] admin/thresholds PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update thresholds', code: 'THRESHOLDS_UPDATE_ERROR' },
      { status: 500 }
    )
  }
}
