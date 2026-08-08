import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Server-side credential check against public.users. Previously this
// comparison ran client-side against a hardcoded array (data/mockUsers.ts),
// which shipped every demo password into the browser bundle — this route
// replaces that without changing the client-facing AppUser shape.
// See docs/changes/20260806_使用者管理真實化.md

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string }
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role, name, organization')
      .ilike('email', email)
      .eq('password', password)
      .maybeSingle()
    if (error) throw error
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('[API] auth/login error:', error)
    return NextResponse.json({ error: 'Login failed', code: 'LOGIN_ERROR' }, { status: 500 })
  }
}
