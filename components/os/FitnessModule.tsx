'use client'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'

// ─── Mock data (replace with real API calls when Supabase is connected) ───────

const MOCK_WEIGHT_TREND = [
  { date: 'Feb 2', w: 186.1 }, { date: 'Feb 9', w: 185.4 }, { date: 'Feb 16', w: 184.8 },
  { date: 'Feb 23', w: 184.0 }, { date: 'Mar 2', w: 183.3 }, { date: 'Mar 9', w: 182.9 },
  { date: 'Mar 16', w: 182.5 }, { date: 'Mar 23', w: 182.1 }, { date: 'Mar 30', w: 182.4 },
]

const MOCK_RECENT_WORKOUTS = [
  {
    id: '1', date: 'Mon Mar 24', type: 'PUSH',
    exercises: [
      { name: 'Bench Press', sets: '4×5', weight: '190 lb', notes: 'PR +5' },
      { name: 'Incline DB Press', sets: '3×8', weight: '65 lb', notes: '' },
      { name: 'Tricep Dips', sets: '3×12', weight: 'BW', notes: '' },
    ]
  },
  {
    id: '2', date: 'Thu Mar 27', type: 'SQUAT',
    exercises: [
      { name: 'Back Squat', sets: '4×5', weight: '185 lb', notes: '' },
      { name: 'Romanian DL', sets: '3×8', weight: '185 lb', notes: 'tight hamstrings' },
      { name: 'Leg Press', sets: '3×12', weight: '270 lb', notes: '' },
    ]
  },
]

const MOCK_VOLUME = [
  { week: 'W8', vol: 12400 }, { week: 'W9', vol: 13800 }, { week: 'W10', vol: 11200 },
  { week: 'W11', vol: 14600 }, { week: 'W12', vol: 15100 }, { week: 'W13', vol: 9800 },
]

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
// Mon=done, Thu=done, need 1 more (Sat)
const WEEK_STATUS = ['done', 'rest', 'rest', 'done', 'rest', 'empty', 'rest']

const BODY_STATS = {
  weight: 182.4,
  delta: -3.7,
  chest: 43.5, waist: 33.0, arms: 15.5,
}

const CUSTOM_TOOLTIP = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#161616', border: '1px solid #1E1E1E', padding: '6px 10px', borderRadius: 4 }}>
      <span style={{ color: '#E8E0D0', fontSize: 12, fontWeight: 600 }}>
        {payload[0].value}
      </span>
    </div>
  )
}

type FitnessView = 'overview' | 'log' | 'body'

export default function FitnessModule() {
  const [view, setView] = useState<FitnessView>('overview')
  const [logText, setLogText] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Sub-nav */}
      <div style={{ display: 'flex', gap: 4 }}>
        {(['overview', 'log', 'body'] as FitnessView[]).map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              padding: '4px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
              background: view === v ? 'var(--fire)' : 'transparent',
              border: `1px solid ${view === v ? 'var(--fire)' : 'var(--border-lit)'}`,
              color: view === v ? 'var(--paper)' : 'var(--ash)',
              transition: 'all 0.15s',
            }}>
            {v}
          </button>
        ))}
      </div>

      {view === 'overview' && <FitnessOverview />}
      {view === 'log' && <FitnessLog logText={logText} setLogText={setLogText} />}
      {view === 'body' && <FitnessBody />}
    </div>
  )
}

function FitnessOverview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

      {/* This week */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">This Week</span>
          <span className="dojo-card-accent blood" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <span className="dojo-big-num">2</span>
          <span className="dojo-big-num-unit">/ 3 sessions</span>
        </div>
        <div className="dojo-week-dots">
          {WEEK_DAYS.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div className={`dojo-week-dot ${WEEK_STATUS[i]}`} />
              <span style={{ fontSize: 9, color: 'var(--ash)' }}>{d}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <div className="dojo-bar-track">
            <div className="dojo-bar-fill jade" style={{ width: '66%' }} />
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fire-bright)' }}>
          1 session remaining this week
        </div>
      </div>

      {/* Weight */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Weight</span>
          <span className="dojo-card-accent jade" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <span className="dojo-big-num">182.4</span>
          <span className="dojo-big-num-unit">lbs</span>
          <span className="dojo-big-num-delta down"> −3.7</span>
        </div>
        <div style={{ height: 50 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_WEIGHT_TREND}>
              <Line type="monotone" dataKey="w" stroke="#3D9A56" strokeWidth={1.5} dot={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: 'var(--ash)' }}>
          4-week trend: −3.7 lbs
        </div>
      </div>

      {/* Last workout */}
      <div className="dojo-card span-2">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Last Session — Thu Mar 27 · SQUAT DAY</span>
          <span className="dojo-tag blood">2 days ago</span>
        </div>
        <table className="dojo-table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets × Reps</th>
              <th>Load</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RECENT_WORKOUTS[1].exercises.map((ex, i) => (
              <tr key={i}>
                <td>{ex.name}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{ex.sets}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--paper)' }}>{ex.weight}</td>
                <td style={{ color: ex.notes ? 'var(--fire-bright)' : 'var(--ash)' }}>
                  {ex.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Volume trend */}
      <div className="dojo-card span-2">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Weekly Volume (lbs moved)</span>
          <span className="dojo-card-accent jade" />
        </div>
        <div style={{ height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_VOLUME} barCategoryGap="30%">
              <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Bar dataKey="vol" fill="#2A6B3A" radius={[2,2,0,0]} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                content={({ active, payload }) => active && payload?.length ? (
                  <div style={{ background: '#161616', border: '1px solid #1E1E1E', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>
                    <span style={{ color: '#3D9A56' }}>{payload[0].value?.toLocaleString()} lbs</span>
                  </div>
                ) : null}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 10, color: 'var(--ash)', marginTop: 4 }}>
          W13 incomplete (2/3 sessions). Last full week: W12 — 15,100 lbs
        </div>
      </div>
    </div>
  )
}

function FitnessLog({ logText, setLogText }: { logText: string; setLogText: (s: string) => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function handleLog() {
    if (!logText.trim()) return
    setStatus('sending')
    try {
      await fetch('/api/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: logText, exercises: [], source: 'dashboard' }),
      })
      setStatus('done')
      setTimeout(() => { setStatus('idle'); setLogText('') }, 2000)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Log Session</span>
          <span className="dojo-tag steel">Via Dashboard</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--ash)', marginBottom: 10 }}>
          Or send to WhatsApp: <span style={{ color: 'var(--paper)', fontFamily: 'monospace' }}>"trained: squat 4x5 @ 185, bench 3x8 @ 175, form good"</span>
        </div>
        <textarea
          className="dojo-input"
          style={{ minHeight: 80, resize: 'vertical' }}
          placeholder="squat 4×5 @ 185lb, deadlift 1×5 @ 225lb — lower back felt strong"
          value={logText}
          onChange={e => setLogText(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
          <button className="dojo-btn ghost" onClick={() => setLogText('')}>Clear</button>
          <button className="dojo-btn primary" onClick={handleLog} disabled={status !== 'idle'}>
            {status === 'idle' ? 'Log Session' : status === 'sending' ? 'Logging...' : 'Logged ✓'}
          </button>
        </div>
      </div>

      {/* Recent workouts list */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Session History</span>
        </div>
        <div className="dojo-scroll-list">
          {MOCK_RECENT_WORKOUTS.map(w => (
            <div key={w.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--paper)' }}>{w.date}</span>
                <span className="dojo-tag blood">{w.type}</span>
              </div>
              {w.exercises.map((ex, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--steel)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--paper)', minWidth: 140 }}>{ex.name}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{ex.sets} @ {ex.weight}</span>
                  {ex.notes && <span style={{ color: 'var(--fire-bright)' }}>{ex.notes}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FitnessBody() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Body Stats</span>
          <span className="dojo-card-accent jade" />
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Weight</span>
          <span className="dojo-kv-val">182.4 lb <span style={{ color: 'var(--jade-bright)', fontSize: 11 }}>↓ 3.7</span></span>
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Chest</span>
          <span className="dojo-kv-val">{BODY_STATS.chest}"</span>
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Waist</span>
          <span className="dojo-kv-val">{BODY_STATS.waist}"</span>
        </div>
        <div className="dojo-kv">
          <span className="dojo-kv-key">Arms</span>
          <span className="dojo-kv-val">{BODY_STATS.arms}"</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <input type="text" className="dojo-input" placeholder='Log weight: "182.4" or via WhatsApp' style={{ marginBottom: 8 }} />
          <button className="dojo-btn ghost" style={{ width: '100%', fontSize: 10 }}>Log Body Stats</button>
        </div>
      </div>

      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Weight — 9 Weeks</span>
        </div>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_WEIGHT_TREND}>
              <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[179, 188]}
                tick={{ fill: '#555', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Line type="monotone" dataKey="w" stroke="#3D9A56" strokeWidth={2} dot={{ fill: '#3D9A56', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 10, color: 'var(--ash)', marginTop: 4 }}>
          Goal: 178 lbs | Remaining: 4.4 lbs
        </div>
        <div style={{ marginTop: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--ash)' }}>Progress to goal</span>
            <span style={{ fontSize: 10, color: 'var(--jade-bright)' }}>46%</span>
          </div>
          <div className="dojo-bar-track">
            <div className="dojo-bar-fill jade" style={{ width: '46%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
