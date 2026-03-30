'use client'
import { useState } from 'react'

type GroceryItem = {
  name: string
  quantity: string
  category: 'protein' | 'produce' | 'dairy' | 'grains' | 'other'
  estimated_price: number
  selected: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  protein: 'var(--fire-bright)',
  produce: 'var(--jade-bright)',
  dairy: 'var(--cobalt-bright)',
  grains: 'var(--gold-bright)',
  other: 'var(--steel)',
}

// Mock AI-suggested list (replace with real /api/grocery call)
const INITIAL_ITEMS: GroceryItem[] = [
  { name: 'Chicken Breast', quantity: '3 lbs', category: 'protein', estimated_price: 12.99, selected: true },
  { name: 'Ground Turkey 93%', quantity: '2 lbs', category: 'protein', estimated_price: 9.99, selected: true },
  { name: 'Eggs (2 dozen)', quantity: '24ct', category: 'protein', estimated_price: 7.99, selected: true },
  { name: 'Greek Yogurt', quantity: '32oz', category: 'dairy', estimated_price: 6.49, selected: true },
  { name: 'Broccoli', quantity: '2 heads', category: 'produce', estimated_price: 3.98, selected: true },
  { name: 'Spinach', quantity: '5oz bag', category: 'produce', estimated_price: 4.29, selected: true },
  { name: 'Sweet Potato', quantity: '3 lbs', category: 'produce', estimated_price: 3.99, selected: true },
  { name: 'Banana', quantity: '1 bunch', category: 'produce', estimated_price: 1.89, selected: true },
  { name: 'White Rice', quantity: '5 lb bag', category: 'grains', estimated_price: 5.99, selected: false },
  { name: 'Oats (rolled)', quantity: '42oz', category: 'grains', estimated_price: 4.99, selected: true },
  { name: 'Olive Oil', quantity: '16oz', category: 'other', estimated_price: 8.99, selected: false },
  { name: 'Whey Protein', quantity: '2lb tub', category: 'protein', estimated_price: 34.99, selected: true },
]

type OrderStep = 'suggest' | 'review' | 'confirm' | 'done'

export default function GroceryPanel() {
  const [items, setItems] = useState<GroceryItem[]>(INITIAL_ITEMS)
  const [step, setStep] = useState<OrderStep>('suggest')
  const [store, setStore] = useState<'instacart' | 'heb'>('heb')
  const [loading, setLoading] = useState(false)

  const selectedItems = items.filter(i => i.selected)
  const total = selectedItems.reduce((s, i) => s + i.estimated_price, 0)

  const grouped = Object.entries(
    items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {} as Record<string, GroceryItem[]>)
  )

  async function handleSuggest() {
    setLoading(true)
    try {
      await fetch('/api/grocery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'suggest' }),
      })
    } catch {/* use mock data */}
    setLoading(false)
    setStep('review')
  }

  async function handleOrder() {
    setLoading(true)
    try {
      await fetch('/api/grocery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'order', store }),
      })
    } catch {/* continue */}
    setLoading(false)
    setStep('done')
  }

  function toggleItem(idx: number) {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, selected: !it.selected } : it))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header */}
      <div className="dojo-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="dojo-card-title" style={{ marginBottom: 4 }}>Grocery Order</div>
            <div style={{ fontSize: 12, color: 'var(--steel)' }}>
              AI knows what you ate. It knows what you need. 4 clicks to your door.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['heb', 'instacart'] as const).map(s => (
              <button key={s} onClick={() => setStore(s)}
                style={{
                  padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  background: store === s ? 'rgba(154, 122, 12, 0.2)' : 'transparent',
                  border: `1px solid ${store === s ? 'var(--gold)' : 'var(--border-lit)'}`,
                  color: store === s ? 'var(--gold-bright)' : 'var(--ash)',
                }}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 4, marginTop: 12, alignItems: 'center' }}>
          {([
            { key: 'suggest', label: '1 · Suggest' },
            { key: 'review', label: '2 · Review' },
            { key: 'confirm', label: '3 · Confirm' },
            { key: 'done', label: '4 · Ordered' },
          ] as { key: OrderStep; label: string }[]).map((s, i) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <div style={{ width: 20, height: 1, background: 'var(--border-lit)' }} />}
              <div style={{
                padding: '2px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700,
                background: step === s.key ? 'var(--gold)' : 'transparent',
                border: `1px solid ${step === s.key ? 'var(--gold)' : 'var(--border)'}`,
                color: step === s.key ? 'var(--paper)' : 'var(--ash)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {step === 'suggest' && (
        <div className="dojo-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{ fontSize: 13, color: 'var(--steel)', marginBottom: 8 }}>
            Based on your last 7 days of eating, Claude will build your list.
          </div>
          <div style={{ fontSize: 11, color: 'var(--ash)', marginBottom: 20 }}>
            Recent meals analyzed · Pantry inferred · Fitness goals applied
          </div>
          <button className="dojo-btn gold-btn" onClick={handleSuggest} disabled={loading}
            style={{ fontSize: 12, padding: '8px 24px' }}>
            {loading ? 'Analyzing...' : 'Generate List'}
          </button>
        </div>
      )}

      {(step === 'review' || step === 'confirm') && (
        <>
          <div className="dojo-card">
            <div className="dojo-card-header">
              <span className="dojo-card-title">
                AI Suggested List — {selectedItems.length} items · ~${total.toFixed(2)}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="dojo-btn ghost" onClick={() => setItems(prev => prev.map(i => ({ ...i, selected: true })))}>
                  Select All
                </button>
              </div>
            </div>

            {grouped.map(([cat, catItems]) => (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.15em',
                  color: CATEGORY_COLORS[cat], textTransform: 'uppercase',
                  marginBottom: 6, paddingBottom: 4,
                  borderBottom: '1px solid var(--border)',
                }}>
                  {cat}
                </div>
                {catItems.map((item, idx) => {
                  const globalIdx = items.indexOf(item)
                  return (
                    <div key={idx} onClick={() => toggleItem(globalIdx)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '5px 0', cursor: 'pointer',
                        opacity: item.selected ? 1 : 0.4,
                        transition: 'opacity 0.15s',
                      }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                        background: item.selected ? CATEGORY_COLORS[item.category] : 'transparent',
                        border: `1px solid ${item.selected ? CATEGORY_COLORS[item.category] : 'var(--border-lit)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {item.selected && <span style={{ fontSize: 8, color: '#000', fontWeight: 900 }}>✓</span>}
                      </div>
                      <span style={{ flex: 1, fontSize: 12, color: 'var(--paper)' }}>{item.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--ash)' }}>{item.quantity}</span>
                      <span style={{ fontSize: 11, color: 'var(--steel)', fontVariantNumeric: 'tabular-nums', width: 45, textAlign: 'right' }}>
                        ${item.estimated_price.toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {step === 'review' && (
            <button className="dojo-btn gold-btn" onClick={() => setStep('confirm')}
              style={{ alignSelf: 'flex-end', fontSize: 12, padding: '8px 20px' }}>
              Review Order →
            </button>
          )}

          {step === 'confirm' && (
            <div className="dojo-card">
              <div className="dojo-card-header">
                <span className="dojo-card-title">Order Summary</span>
              </div>
              <div className="dojo-kv">
                <span className="dojo-kv-key">Store</span>
                <span className="dojo-kv-val">{store.toUpperCase()}</span>
              </div>
              <div className="dojo-kv">
                <span className="dojo-kv-key">Items</span>
                <span className="dojo-kv-val">{selectedItems.length}</span>
              </div>
              <div className="dojo-kv">
                <span className="dojo-kv-key">Estimated total</span>
                <span className="dojo-kv-val">${total.toFixed(2)}</span>
              </div>
              <div className="dojo-kv">
                <span className="dojo-kv-key">Delivery</span>
                <span className="dojo-kv-val" style={{ color: 'var(--jade-bright)' }}>2-4 hours</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                <button className="dojo-btn ghost" onClick={() => setStep('review')}>Back</button>
                <button className="dojo-btn primary" onClick={handleOrder} disabled={loading}
                  style={{ background: 'var(--gold)', fontSize: 12, padding: '7px 20px' }}>
                  {loading ? 'Placing Order...' : `Order via ${store.toUpperCase()}`}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {step === 'done' && (
        <div className="dojo-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--jade-bright)', marginBottom: 4 }}>
            Order Placed
          </div>
          <div style={{ fontSize: 12, color: 'var(--steel)', marginBottom: 16 }}>
            {selectedItems.length} items · ${total.toFixed(2)} · {store.toUpperCase()} · 2-4 hour delivery
          </div>
          <div style={{ fontSize: 11, color: 'var(--ash)', marginBottom: 20 }}>
            You will receive a WhatsApp notification when your order ships.
          </div>
          <button className="dojo-btn ghost" onClick={() => setStep('suggest')}>New Order</button>
        </div>
      )}
    </div>
  )
}
