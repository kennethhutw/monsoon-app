'use client'
import { useEffect, useState } from 'react'
import { PageLayout } from '@/components/shared/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlobalThresholds } from '@/types/admin'
import { CheckCircle2 } from 'lucide-react'

export default function AdminThresholdsPage() {
  const [data, setData] = useState<GlobalThresholds | null>(null)
  const [saved, setSaved] = useState(false)
  useEffect(() => { fetch('/api/admin/thresholds').then(r => r.json()).then(setData) }, [])

  const handleSave = () => {
    if (!data) return
    fetch('/api/admin/thresholds', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(() => { setSaved(true); setTimeout(() => setSaved(false), 2000) })
  }

  if (!data) return <PageLayout title="Threshold Settings"><p className="text-body-md text-ink-faint">Loading...</p></PageLayout>
  return (
    <PageLayout title="Threshold Settings" subtitle="Global risk control thresholds">
      <div className="max-w-md space-y-4">
        <div className="bg-surface rounded-xl border border-border-subtle shadow-card p-6 space-y-5">
          {[
            { label: 'Buyer Concentration Limit (%)', key: 'buyerConcentrationLimit' as keyof GlobalThresholds },
            { label: 'Overdue Rate Red Line (%)', key: 'overdueRateRedLine' as keyof GlobalThresholds },
            { label: 'Single Borrower Limit ($100M)', key: 'singleBorrowerLimit' as keyof GlobalThresholds },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="text-label-md text-on-surface-variant mb-1.5 block font-mono">{label}</label>
              <Input type="number" value={data[key] as number} onChange={e => setData(d => d ? { ...d, [key]: parseFloat(e.target.value) } : d)} className="h-11 bg-surface-container-low border-border-subtle" />
            </div>
          ))}
          <Button onClick={handleSave} className="w-full h-11 flex items-center gap-2">
            {saved && <CheckCircle2 size={16} />} {saved ? 'Saved' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
