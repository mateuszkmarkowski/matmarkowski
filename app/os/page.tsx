'use client'
import { useState } from 'react'
import FitnessModule from '@/components/os/FitnessModule'
import FinanceModule from '@/components/os/FinanceModule'
import GardenView from '@/components/os/GardenView'
import SeasonsView from '@/components/os/SeasonsView'
import FoodModule from '@/components/os/FoodModule'
import GroceryPanel from '@/components/os/GroceryPanel'

// ─── Nav Items ─────────────────────────────────────────────────────────────────

type Module = 'overview' | 'fitness' | 'finance' | 'garden' | 'seasons' | 'food' | 'grocery' | 'messages'

const NAV_ITEMS: { id: Module; icon: string; label: string; color?: string }[] = [
  { id: 'overview', icon: '⊞', label: 'Overview' },
  { id: 'fitness', icon: '⚔', label: 'The Dojo', color: '#B22222' },
  { id: 'finance', icon: '◈', label: 'The Vault', color: '#C4A020' },
  { id: 'food', icon: '◉', label: 'The Table', color: '#3D9A56' },
  { id: 'grocery', icon: '◫', label: 'Provisions' },
  { id: 'garden', icon: '❧', label: 'The Garden', color: '#3D9A56' },
  { id: 'seasons', icon: '◑', label: 'Seasons' },
  { id: 'messages', icon: '⌘', label: 'WhatsApp' },
]

// ─── Overview quick-stats ──────────────────────────────────────────────────────

const OVERVIEW_STATS = {
  weight: 182.4,
  weightDelta: -3.7,
  weekWorkouts: 2,
  weekTarget: 3,
  monthSpend: 3147,
  monthBudget: 4500,
  streak: 7,
  dayOfYear: 89,
}

// ─── Recent WhatsApp log ───────────────────────────────────────────────────────

const WA_LOG = [
  { dir: 'in', time: '15:42', body: 'trained: squat 4x5 @ 185, rdl 3x8 @ 185, leg press 3x12 @ 270' },
  { dir: 'out', time: '15:42', body: 'Training logged.\nSQ 4×5 @ 185 | RDL 3×8 @ 185 | LP 3×12 @ 270\n\nWeek: 2/3. One session remaining.\nLeg day done. What\'s tomorrow\'s focus?' },
  { dir: 'in', time: '09:15', body: 'weight 182.4' },
  { dir: 'out', time: '09:15', body: 'Weight logged: 182.4 lbs\n4-week trend: −3.7 lbs. Direction is correct.\nDon\'t lose the training volume chasing the scale.' },
  { dir: 'out', time: '06:30', body: '[Mon Mar 30 · 06:30]\n\nDay 89. Week 13.\nTraining: 2/3 this week.\nWeight: 182.4 (trend ↓)\nMarch spend: $3,147 / $4,500 — on track.\n\nOne session left this week. Finish what you started.' },
]

// ─── Overview Module ───────────────────────────────────────────────────────────

function Overview({ onNavigate }: { onNavigate: (m: Module) => void }) {
  const spendPct = Math.round(OVERVIEW_STATS.monthSpend / OVERVIEW_STATS.monthBudget * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Main obsession banner */}
      <div style={{
        padding: '12px 16px',
        background: 'linear-gradient(90deg, rgba(139,26,26,0.12) 0%, transparent 100%)',
        border: '1px solid rgba(139,26,26,0.2)',
        borderLeft: '3px solid #8B1A1A',
        borderRadius: '0 6px 6px 0',
      }}>
        <div style={{ display: 'flex', gap: 24 }}>
          {['I. DISCIPLINE', 'II. PRESENT MOMENT', 'III. LONG TERM'].map((o, i) => (
            <div key={i} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: i === 0 ? '#B22222' : '#333' }}>
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* 6-panel grid */}
      <div className="dojo-grid">

        {/* THE BODY */}
        <div className="dojo-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('fitness')}>
          <div className="dojo-card-header">
            <span className="dojo-card-title">The Body</span>
            <span className="dojo-card-accent blood" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <div>
              <div className="dojo-big-num" style={{ fontSize: 28 }}>{OVERVIEW_STATS.weight}</div>
              <div style={{ fontSize: 10, color: 'var(--ash)' }}>
                lbs <span style={{ color: 'var(--jade-bright)' }}>↓{Math.abs(OVERVIEW_STATS.weightDelta)}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--paper)' }}>
                {OVERVIEW_STATS.weekWorkouts}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--ash)' }}>/3</span>
              </div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>sessions this week</div>
            </div>
          </div>
          <div className="dojo-week-dots" style={{ marginBottom: 8 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div className={`dojo-week-dot ${i === 0 || i === 3 ? 'done' : i === 5 ? 'today' : 'rest'}`} />
                <span style={{ fontSize: 8, color: 'var(--ash)' }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'var(--fire-bright)' }}>1 session remaining this week →</div>
        </div>

        {/* THE VAULT */}
        <div className="dojo-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('finance')}>
          <div className="dojo-card-header">
            <span className="dojo-card-title">The Vault</span>
            <span className="dojo-card-accent gold" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <span className="dojo-big-num" style={{ fontSize: 28 }}>${OVERVIEW_STATS.monthSpend.toLocaleString()}</span>
            <span className="dojo-big-num-unit"> / ${OVERVIEW_STATS.monthBudget.toLocaleString()}</span>
          </div>
          <div style={{ marginBottom: 6 }}>
            <div className="dojo-bar-track">
              <div className="dojo-bar-fill gold" style={{ width: `${spendPct}%` }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
            <span style={{ color: 'var(--ash)' }}>March · {spendPct}% of budget</span>
            <span style={{ color: 'var(--jade-bright)' }}>Net worth ↑ $940</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 10, color: 'var(--gold-bright)' }}>
            Food $247 over budget →
          </div>
        </div>

        {/* THE MIND */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">The Mind</span>
            <span className="dojo-card-accent cobalt" />
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--fire-bright)' }}>
                {OVERVIEW_STATS.streak}
              </div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>Discipline Streak</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--cobalt-bright)' }}>3</div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>No-Phone Mornings</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--steel)' }}>0</div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>Income Building</div>
            </div>
          </div>
          <div className="dojo-alert warn" style={{ marginBottom: 0 }}>
            Income building habit: 9 days silent. The vine is dying.
          </div>
        </div>

        {/* THE TABLE */}
        <div className="dojo-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('food')}>
          <div className="dojo-card-header">
            <span className="dojo-card-title">The Table</span>
            <span className="dojo-card-accent jade" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
            <div>
              <div className="dojo-big-num" style={{ fontSize: 28 }}>1,340</div>
              <div style={{ fontSize: 10, color: 'var(--ash)' }}>kcal today / 2,200</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--fire-bright)' }}>144g</div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>protein / 180g</div>
            </div>
          </div>
          <div className="dojo-bar-track" style={{ marginBottom: 6 }}>
            <div className="dojo-bar-fill jade" style={{ width: '61%' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)' }}>
            3 meals logged · Dinner not yet recorded →
          </div>
        </div>

        {/* THE GARDEN THUMBNAIL */}
        <div className="dojo-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('garden')}>
          <div className="dojo-card-header">
            <span className="dojo-card-title">The Garden</span>
            <span className="dojo-card-accent jade" />
          </div>
          {/* Mini garden */}
          <div style={{
            background: 'linear-gradient(180deg, #080808 0%, #0C0B07 100%)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '8px 4px 0',
            marginBottom: 8,
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'flex-end' }}>
              {[
                { h: 50, color: '#3D9A56', label: 'Fitness' },
                { h: 35, color: '#C4A020', label: 'Finance' },
                { h: 28, color: '#7A9AB0', label: 'Mindset' },
                { h: 8, color: '#444', label: 'Income' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
                  <div style={{
                    width: '60%', height: p.h,
                    background: p.color,
                    borderRadius: '50% 50% 0 0',
                    opacity: i === 3 ? 0.3 : 0.7,
                  }} />
                  <div style={{ height: 8, background: 'var(--border)' }} />
                  <span style={{ fontSize: 7, color: 'var(--ash)' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)' }}>
            3/4 habits alive · Income building needs attention →
          </div>
        </div>

        {/* INDEPENDENCE */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Independence</span>
            <span className="dojo-card-accent steel" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <span className="dojo-big-num" style={{ fontSize: 24, color: 'var(--ash)' }}>$0</span>
            <span className="dojo-big-num-unit"> / $2,000 / mo target</span>
          </div>
          <div style={{ marginBottom: 6 }}>
            <div className="dojo-bar-track">
              <div className="dojo-bar-fill" style={{ width: '0%', background: 'var(--ash)' }} />
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)', marginBottom: 8 }}>
            Week 13 of 39 remaining in 2026
          </div>
          <div style={{ fontSize: 10, color: 'var(--ash)' }}>
            Status: <span style={{ color: 'var(--gold-bright)' }}>Exploring</span>
          </div>
          <div className="dojo-alert warn" style={{ marginTop: 8, marginBottom: 0 }}>
            No income logs. No income. These are the same thing.
          </div>
        </div>
      </div>

      {/* Recent WhatsApp activity */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">WhatsApp — Recent</span>
          <button
            className="dojo-btn ghost"
            style={{ fontSize: 9, padding: '2px 8px' }}
            onClick={() => onNavigate('messages')}
          >
            View All
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {WA_LOG.slice(0, 3).map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              opacity: i > 0 ? 0.7 - i * 0.1 : 1,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                background: msg.dir === 'in' ? 'var(--wall)' : 'rgba(139,26,26,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: msg.dir === 'in' ? 'var(--ash)' : '#8B1A1A',
                fontWeight: 700, border: '1px solid var(--border)',
              }}>
                {msg.dir === 'in' ? 'M' : 'OS'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 2 }}>
                  {msg.time} · {msg.dir === 'in' ? 'Mateusz' : 'The System'}
                </div>
                <div style={{
                  fontSize: 11, color: 'var(--steel)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {msg.body.split('\n')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── WhatsApp Log Module ───────────────────────────────────────────────────────

function MessagesModule() {
  return (
    <div className="dojo-card">
      <div className="dojo-card-header">
        <span className="dojo-card-title">WhatsApp Log</span>
        <div style={{ display: 'flex', gap: 8, fontSize: 10, color: 'var(--ash)' }}>
          <span>Entry point to the system</span>
        </div>
      </div>

      <div style={{ marginBottom: 12, padding: '8px 12px', background: 'var(--wall)', borderRadius: 4, fontSize: 11, color: 'var(--ash)' }}>
        <div style={{ fontWeight: 700, color: 'var(--paper)', marginBottom: 4 }}>WhatsApp Commands</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {[
            ['trained: squat 5x5 @ 135, bench 3x8 @ 185', 'Log workout'],
            ['weight 183.5', 'Log body weight'],
            ['ate chicken and rice for lunch', 'Log meal'],
            ['spent $67 HEB groceries', 'Log expense'],
            ['status', 'Quick report'],
            ['report', 'Weekly report'],
            ['order groceries', 'Start grocery order'],
            ['photo (send image)', 'AI estimates food'],
          ].map(([cmd, desc], i) => (
            <div key={i} style={{ marginBottom: 2 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--paper)' }}>{cmd}</span>
              <span style={{ color: '#333', fontSize: 10 }}> · {desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {WA_LOG.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: msg.dir === 'in' ? 'row' : 'row-reverse',
            gap: 8,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 4, flexShrink: 0,
              background: msg.dir === 'in' ? 'var(--wall)' : 'rgba(139,26,26,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: msg.dir === 'in' ? 'var(--ash)' : '#8B1A1A',
              fontWeight: 700, border: '1px solid var(--border)',
            }}>
              {msg.dir === 'in' ? 'M' : 'OS'}
            </div>
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: 6,
              background: msg.dir === 'in' ? 'var(--wall)' : 'rgba(139,26,26,0.08)',
              border: `1px solid ${msg.dir === 'in' ? 'var(--border)' : 'rgba(139,26,26,0.15)'}`,
            }}>
              <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 3 }}>
                {msg.time}
              </div>
              <div style={{ fontSize: 12, color: 'var(--paper)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                {msg.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function OsDashboard() {
  const [activeModule, setActiveModule] = useState<Module>('overview')

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  const MODULE_TITLES: Record<Module, string> = {
    overview: 'Overview',
    fitness: 'The Dojo — Strength & Body',
    finance: 'The Vault — Wealth & Flow',
    garden: 'The Garden — Habits & Discipline',
    seasons: 'The Seasons — Long Arc',
    food: 'The Table — Nutrition',
    grocery: 'Provisions — Grocery Order',
    messages: 'WhatsApp — System Log',
  }

  return (
    <div className="dojo-root">

      {/* Sidebar */}
      <nav className="dojo-sidebar">
        <div className="dojo-sidebar-logo">M</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`dojo-nav-item ${activeModule === item.id ? 'active' : ''}`}
            data-tooltip={item.label}
            onClick={() => setActiveModule(item.id)}
            style={{ color: activeModule === item.id && item.color ? item.color : undefined }}
          >
            {item.icon}
          </button>
        ))}
        <div className="dojo-sidebar-spacer" />
        <button
          className="dojo-nav-item"
          data-tooltip="Sign out"
          onClick={async () => {
            await fetch('/api/auth', { method: 'DELETE' })
            window.location.href = '/os/login'
          }}
          style={{ fontSize: 14 }}
        >
          ⏏
        </button>
      </nav>

      {/* Main */}
      <div className="dojo-main">

        {/* Top bar */}
        <div className="dojo-topbar">
          <span className="dojo-topbar-title">{MODULE_TITLES[activeModule]}</span>
          <div className="dojo-topbar-sep" />
          <div className="dojo-stat-chip">
            <span className="dojo-stat-chip-label">Streak</span>
            <span className="dojo-stat-chip-value fire">7d</span>
          </div>
          <div className="dojo-stat-chip">
            <span className="dojo-stat-chip-label">Weight</span>
            <span className="dojo-stat-chip-value">182.4 lb</span>
          </div>
          <div className="dojo-stat-chip">
            <span className="dojo-stat-chip-label">Week</span>
            <span className="dojo-stat-chip-value jade">2/3</span>
          </div>
          <div className="dojo-stat-chip">
            <span className="dojo-stat-chip-label">March</span>
            <span className="dojo-stat-chip-value gold">$3,147</span>
          </div>
          <div className="dojo-topbar-spacer" />
          <span className="dojo-topbar-date">{dateStr}</span>
        </div>

        {/* Content */}
        <div className="dojo-content">
          {activeModule === 'overview' && <Overview onNavigate={setActiveModule} />}
          {activeModule === 'fitness' && <FitnessModule />}
          {activeModule === 'finance' && <FinanceModule />}
          {activeModule === 'garden' && <GardenView />}
          {activeModule === 'seasons' && <SeasonsView />}
          {activeModule === 'food' && <FoodModule />}
          {activeModule === 'grocery' && <GroceryPanel />}
          {activeModule === 'messages' && <MessagesModule />}
        </div>
      </div>
    </div>
  )
}
