'use client'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

// ─── Mock data ────────────────────────────────────────────────────────────────

const BUDGET = 4500
const MONTH_SPEND = 3147
const DAYS_ELAPSED = 29
const DAYS_IN_MONTH = 31

const PROJECTED = Math.round(MONTH_SPEND / DAYS_ELAPSED * DAYS_IN_MONTH)
const OVER_BUDGET = PROJECTED > BUDGET

const CATEGORIES = [
  { name: 'Housing', amount: 1800, budget: 1800, color: '#2A4A6B' },
  { name: 'Food', amount: 847, budget: 600, color: '#8B3A0C' },
  { name: 'Transport', amount: 187, budget: 200, color: '#2A6B3A' },
  { name: 'Entertainment', amount: 145, budget: 150, color: '#6B2A6B' },
  { name: 'Health', amount: 89, budget: 150, color: '#2A6B5A' },
  { name: 'Other', amount: 79, budget: 100, color: '#555' },
]

const NET_WORTH_TREND = [
  { month: 'Oct', nw: 12400 }, { month: 'Nov', nw: 13200 }, { month: 'Dec', nw: 12800 },
  { month: 'Jan', nw: 14100 }, { month: 'Feb', nw: 15300 }, { month: 'Mar', nw: 16240 },
]

const RECENT_TXNS = [
  { date: 'Mar 30', desc: 'Whole Foods', cat: 'Food', amount: -67 },
  { date: 'Mar 29', desc: 'Shell Gas Station', cat: 'Transport', amount: -52 },
  { date: 'Mar 28', desc: 'Chick-fil-A', cat: 'Food', amount: -14 },
  { date: 'Mar 28', desc: 'Netflix', cat: 'Entertainment', amount: -16 },
  { date: 'Mar 27', desc: 'Salary Deposit', cat: 'Income', amount: 4200 },
  { date: 'Mar 26', desc: 'HEB Grocery', cat: 'Food', amount: -134 },
  { date: 'Mar 25', desc: 'Rent', cat: 'Housing', amount: -1800 },
]

type FinanceView = 'overview' | 'transactions' | 'add'

export default function FinanceModule() {
  const [view, setView] = useState<FinanceView>('overview')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {(['overview', 'transactions', 'add'] as FinanceView[]).map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              padding: '4px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
              background: view === v ? 'var(--gold)' : 'transparent',
              border: `1px solid ${view === v ? 'var(--gold)' : 'var(--border-lit)'}`,
              color: view === v ? 'var(--paper)' : 'var(--ash)',
              transition: 'all 0.15s',
            }}>
            {v}
          </button>
        ))}
      </div>

      {view === 'overview' && <FinanceOverview />}
      {view === 'transactions' && <FinanceTransactions />}
      {view === 'add' && <FinanceAdd />}
    </div>
  )
}

function FinanceOverview() {
  const spendPct = Math.round(MONTH_SPEND / BUDGET * 100)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

      {/* Month spend */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">March Spend</span>
          <span className="dojo-card-accent gold" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <span className="dojo-big-num">${MONTH_SPEND.toLocaleString()}</span>
          <span className="dojo-big-num-unit"> / ${BUDGET.toLocaleString()}</span>
        </div>
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--ash)' }}>{spendPct}% of budget</span>
            <span style={{ fontSize: 10, color: OVER_BUDGET ? 'var(--fire-bright)' : 'var(--jade-bright)' }}>
              Projected: ${PROJECTED.toLocaleString()}
            </span>
          </div>
          <div className="dojo-bar-track">
            <div className={`dojo-bar-fill ${spendPct > 90 ? 'blood' : 'gold'}`} style={{ width: `${Math.min(spendPct, 100)}%` }} />
          </div>
        </div>
        {OVER_BUDGET && (
          <div className="dojo-alert warn" style={{ marginBottom: 0, marginTop: 6 }}>
            Projected ${PROJECTED.toLocaleString()} exceeds $4,500 budget by ${(PROJECTED - BUDGET).toLocaleString()}
          </div>
        )}
      </div>

      {/* Net worth */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Net Worth</span>
          <span className="dojo-card-accent gold" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <span className="dojo-big-num">$16,240</span>
          <span className="dojo-big-num-delta up"> +$940</span>
        </div>
        <div style={{ height: 55 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={NET_WORTH_TREND}>
              <Line type="monotone" dataKey="nw" stroke="#C4A020" strokeWidth={1.5} dot={false} />
              <Tooltip
                content={({ active, payload }) => active && payload?.length ? (
                  <div style={{ background: '#161616', border: '1px solid #1E1E1E', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>
                    <span style={{ color: '#C4A020' }}>${payload[0].value?.toLocaleString()}</span>
                  </div>
                ) : null}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 10, color: 'var(--ash)', marginTop: 2 }}>
          6-month trend: +$3,840
        </div>
      </div>

      {/* Category breakdown */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">By Category</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            {CATEGORIES.map(c => {
              const pct = Math.round(c.amount / c.budget * 100)
              const over = c.amount > c.budget
              return (
                <div key={c.name} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: over ? 'var(--fire-bright)' : 'var(--steel)' }}>{c.name}</span>
                    <span style={{ fontSize: 10, fontVariantNumeric: 'tabular-nums', color: over ? 'var(--fire-bright)' : 'var(--paper)' }}>
                      ${c.amount} / ${c.budget}
                    </span>
                  </div>
                  <div className="dojo-bar-track">
                    <div
                      className="dojo-bar-fill"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        background: over ? 'var(--fire)' : c.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ width: 80, height: 80, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORIES} dataKey="amount" cx="50%" cy="50%" innerRadius={22} outerRadius={38} strokeWidth={0}>
                  {CATEGORIES.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Food spending alert */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Income Streams</span>
          <span className="dojo-card-accent gold" />
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Primary (Salary)</span>
          <span className="dojo-kv-val jade" style={{ color: 'var(--jade-bright)' }}>Active</span>
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Independence Project</span>
          <span className="dojo-kv-val" style={{ color: 'var(--gold-bright)' }}>Exploring</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--ash)', marginBottom: 4 }}>
            Target: $2,000/mo secondary income by Dec 2026
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)' }}>Week 13 of 39</div>
          <div className="dojo-bar-track" style={{ marginTop: 6 }}>
            <div className="dojo-bar-fill gold" style={{ width: '15%' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)', marginTop: 4 }}>
            Current secondary: $0/mo · 15% through the year
          </div>
        </div>
        <div className="dojo-alert warn" style={{ marginTop: 10, marginBottom: 0 }}>
          No secondary income logged yet. The goal dies without action.
        </div>
      </div>
    </div>
  )
}

function FinanceTransactions() {
  return (
    <div className="dojo-card">
      <div className="dojo-card-header">
        <span className="dojo-card-title">March Transactions</span>
        <span style={{ fontSize: 10, color: 'var(--ash)' }}>
          Or send via WhatsApp: <span style={{ color: 'var(--paper)', fontFamily: 'monospace' }}>"spent $47 HEB groceries"</span>
        </span>
      </div>
      <table className="dojo-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {RECENT_TXNS.map((t, i) => (
            <tr key={i}>
              <td style={{ color: 'var(--ash)', width: 70 }}>{t.date}</td>
              <td>{t.desc}</td>
              <td><span className={`dojo-tag ${t.cat === 'Income' ? 'jade' : t.cat === 'Food' ? 'blood' : 'steel'}`}>{t.cat}</span></td>
              <td style={{
                textAlign: 'right', fontVariantNumeric: 'tabular-nums',
                color: t.amount > 0 ? 'var(--jade-bright)' : 'var(--paper)',
                fontWeight: 600,
              }}>
                {t.amount > 0 ? '+' : ''}{t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FinanceAdd() {
  const [form, setForm] = useState({ amount: '', description: '', category: 'Food', type: 'expense' })
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle')

  async function save() {
    if (!form.amount || !form.description) return
    setStatus('saving')
    try {
      await fetch('/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      setStatus('done')
      setTimeout(() => { setStatus('idle'); setForm({ amount: '', description: '', category: 'Food', type: 'expense' }) }, 1500)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <div className="dojo-card" style={{ maxWidth: 480 }}>
      <div className="dojo-card-header">
        <span className="dojo-card-title">Log Transaction</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="dojo-input" style={{ width: 120, flexShrink: 0 }}
            value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="investment">Investment</option>
          </select>
          <input className="dojo-input" type="number" placeholder="Amount ($)" style={{ flex: 1 }}
            value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
        </div>
        <input className="dojo-input" type="text" placeholder="Description"
          value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <select className="dojo-input"
          value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
          <option>Housing</option><option>Food</option><option>Transport</option>
          <option>Entertainment</option><option>Health</option><option>Other</option>
          <option>Income</option><option>Investment</option>
        </select>
        <button className="dojo-btn gold-btn" onClick={save} disabled={status !== 'idle'}>
          {status === 'idle' ? 'Log Transaction' : status === 'saving' ? 'Saving...' : 'Saved ✓'}
        </button>
      </div>
    </div>
  )
}
