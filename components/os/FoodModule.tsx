'use client'
import { useState } from 'react'

const CAL_TARGET = 2200
const PROTEIN_TARGET = 180

const TODAY_MEALS = [
  { time: '7:30', type: 'Breakfast', desc: '4 eggs + 2 strips bacon + black coffee', cal: 420, protein: 34, carbs: 2, fat: 32 },
  { time: '12:15', type: 'Lunch', desc: 'Chicken breast 8oz + white rice 1c + broccoli', cal: 580, protein: 58, carbs: 52, fat: 8 },
  { time: '15:30', type: 'Snack', desc: 'Greek yogurt + whey shake', cal: 340, protein: 52, carbs: 18, fat: 4 },
]

const todayCal = TODAY_MEALS.reduce((s, m) => s + m.cal, 0)
const todayProtein = TODAY_MEALS.reduce((s, m) => s + m.protein, 0)
const todayCarbs = TODAY_MEALS.reduce((s, m) => s + m.carbs, 0)
const todayFat = TODAY_MEALS.reduce((s, m) => s + m.fat, 0)

const CAL_REMAINING = CAL_TARGET - todayCal
const PROTEIN_REMAINING = PROTEIN_TARGET - todayProtein

const WEEK_AVG = { cal: 2080, protein: 162 }

export default function FoodModule() {
  const [quickLog, setQuickLog] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle')

  async function logMeal() {
    if (!quickLog.trim()) return
    setStatus('saving')
    try {
      await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: quickLog, source: 'dashboard' }),
      })
      setStatus('done')
      setTimeout(() => { setStatus('idle'); setQuickLog('') }, 1500)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* WhatsApp tip */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(42, 107, 58, 0.06)',
        border: '1px solid rgba(42, 107, 58, 0.2)',
        borderRadius: 4,
        fontSize: 11,
        color: 'var(--ash)',
      }}>
        Fastest logging: <span style={{ color: 'var(--paper)', fontFamily: 'monospace' }}>send a photo</span> or text to WhatsApp.
        AI estimates macros automatically.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

        {/* Calories today */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Calories Today</span>
            <span className="dojo-card-accent jade" />
          </div>
          <div>
            <span className="dojo-big-num">{todayCal}</span>
            <span className="dojo-big-num-unit"> / {CAL_TARGET}</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <div className="dojo-bar-track">
              <div className="dojo-bar-fill jade" style={{ width: `${Math.min(todayCal / CAL_TARGET * 100, 100)}%` }} />
            </div>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: CAL_REMAINING > 0 ? 'var(--ash)' : 'var(--fire-bright)' }}>
            {CAL_REMAINING > 0 ? `${CAL_REMAINING} cal remaining` : `${Math.abs(CAL_REMAINING)} over target`}
          </div>
        </div>

        {/* Macros */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Macros</span>
            <span className="dojo-card-accent jade" />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Protein', val: todayProtein, target: PROTEIN_TARGET, unit: 'g', color: 'var(--fire-bright)' },
              { label: 'Carbs', val: todayCarbs, target: 200, unit: 'g', color: 'var(--gold-bright)' },
              { label: 'Fat', val: todayFat, target: 70, unit: 'g', color: 'var(--cobalt-bright)' },
            ].map(m => (
              <div key={m.label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: m.color, fontVariantNumeric: 'tabular-nums' }}>
                  {m.val}
                </div>
                <div style={{ fontSize: 9, color: 'var(--ash)' }}>{m.label}</div>
                <div style={{ fontSize: 9, color: 'var(--ash)' }}>/ {m.target}{m.unit}</div>
                <div className="dojo-bar-track" style={{ marginTop: 4 }}>
                  <div className="dojo-bar-fill" style={{
                    width: `${Math.min(m.val / m.target * 100, 100)}%`,
                    background: m.color,
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: PROTEIN_REMAINING > 0 ? 'var(--fire-bright)' : 'var(--jade-bright)' }}>
            {PROTEIN_REMAINING > 0 ? `Protein: need ${PROTEIN_REMAINING}g more` : 'Protein goal hit ✓'}
          </div>
        </div>

        {/* Today's meals */}
        <div className="dojo-card span-2">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Today's Log</span>
            <span style={{ fontSize: 10, color: 'var(--ash)' }}>3 of 4 meals</span>
          </div>
          {TODAY_MEALS.map((meal, i) => (
            <div key={i} style={{
              padding: '8px 0',
              borderBottom: i < TODAY_MEALS.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}>
              <div style={{ width: 35, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: 'var(--ash)', fontVariantNumeric: 'tabular-nums' }}>{meal.time}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--paper)', marginBottom: 2 }}>{meal.desc}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--ash)' }}>
                  <span style={{ color: 'var(--steel)' }}>{meal.cal} kcal</span>
                  <span style={{ color: 'var(--fire-bright)' }}>{meal.protein}g pro</span>
                  <span>{meal.carbs}g carb</span>
                  <span>{meal.fat}g fat</span>
                </div>
              </div>
              <span className={`dojo-tag ${meal.type === 'Breakfast' ? 'gold' : meal.type === 'Lunch' ? 'jade' : 'steel'}`}>
                {meal.type}
              </span>
            </div>
          ))}

          {/* Quick log input */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <input
              className="dojo-input"
              placeholder="dinner: grilled salmon 6oz + sweet potato + salad"
              value={quickLog}
              onChange={e => setQuickLog(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && logMeal()}
              style={{ flex: 1 }}
            />
            <button className="dojo-btn primary" onClick={logMeal} disabled={status !== 'idle'}
              style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
              {status === 'idle' ? 'Log' : status === 'saving' ? '...' : '✓'}
            </button>
          </div>
        </div>

        {/* Week avg */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Week Average</span>
          </div>
          <div className="dojo-kv">
            <span className="dojo-kv-key">Avg calories</span>
            <span className="dojo-kv-val">{WEEK_AVG.cal} / {CAL_TARGET}</span>
          </div>
          <div className="dojo-kv">
            <span className="dojo-kv-key">Avg protein</span>
            <span className="dojo-kv-val" style={{ color: WEEK_AVG.protein >= PROTEIN_TARGET ? 'var(--jade-bright)' : 'var(--fire-bright)' }}>
              {WEEK_AVG.protein}g / {PROTEIN_TARGET}g
            </span>
          </div>
          <div className="dojo-kv">
            <span className="dojo-kv-key">Meals logged</span>
            <span className="dojo-kv-val">18 / 21</span>
          </div>
          {WEEK_AVG.protein < PROTEIN_TARGET && (
            <div className="dojo-alert warn" style={{ marginTop: 8, marginBottom: 0 }}>
              Protein {PROTEIN_TARGET - WEEK_AVG.protein}g/day below target. Muscle building requires precision.
            </div>
          )}
        </div>

        {/* Eating out tracker */}
        <div className="dojo-card">
          <div className="dojo-card-header">
            <span className="dojo-card-title">Eating Out — March</span>
          </div>
          {[
            { date: 'Mar 28', place: "Chick-fil-A", est: 820, spent: 14 },
            { date: 'Mar 25', place: 'Torchys Tacos', est: 1100, spent: 22 },
            { date: 'Mar 22', place: 'Whole Foods hot bar', est: 740, spent: 18 },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '6px 0',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--paper)' }}>{r.place}</div>
                <div style={{ fontSize: 9, color: 'var(--ash)' }}>{r.date} · ~{r.est} kcal</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--fire-bright)', fontVariantNumeric: 'tabular-nums' }}>
                −${r.spent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
