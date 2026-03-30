'use client'

// ─── Seasons — circular long-term visualization ────────────────────────────────
// The year as a wheel: 4 seasons × 3 months each.
// Outer ring = current year. Inner ring = previous year.
// Color intensity = composite performance score.

type MonthData = {
  month: string
  score: number        // 0–100 composite (fitness + finance + habits)
  workouts: number
  spend: number
  budgetPct: number    // spend / budget * 100
  weight?: number
  note?: string
}

// 2025 (inner ring) — previous year
const PREV_YEAR: MonthData[] = [
  { month: 'Jan', score: 42, workouts: 6, spend: 4100, budgetPct: 91 },
  { month: 'Feb', score: 55, workouts: 8, spend: 3900, budgetPct: 87 },
  { month: 'Mar', score: 60, workouts: 10, spend: 3700, budgetPct: 82 },
  { month: 'Apr', score: 48, workouts: 7, spend: 4300, budgetPct: 96 },
  { month: 'May', score: 52, workouts: 9, spend: 4000, budgetPct: 89 },
  { month: 'Jun', score: 38, workouts: 5, spend: 4600, budgetPct: 102, note: 'travel' },
  { month: 'Jul', score: 33, workouts: 4, spend: 5100, budgetPct: 113, note: 'vacation' },
  { month: 'Aug', score: 51, workouts: 9, spend: 3800, budgetPct: 84 },
  { month: 'Sep', score: 62, workouts: 11, spend: 3600, budgetPct: 80 },
  { month: 'Oct', score: 70, workouts: 12, spend: 3500, budgetPct: 78 },
  { month: 'Nov', score: 58, workouts: 10, spend: 4200, budgetPct: 93, note: 'holiday' },
  { month: 'Dec', score: 45, workouts: 7, spend: 4800, budgetPct: 107, note: 'holiday' },
]

// 2026 (outer ring) — current year, Jan–Mar filled, rest projected
const CUR_YEAR: MonthData[] = [
  { month: 'Jan', score: 61, workouts: 11, spend: 3800, budgetPct: 84, weight: 186.1 },
  { month: 'Feb', score: 68, workouts: 12, spend: 3600, budgetPct: 80, weight: 184.8 },
  { month: 'Mar', score: 72, workouts: 10, spend: 3147, budgetPct: 70, weight: 182.4, note: 'in progress' },
  // Projected months (lighter)
  { month: 'Apr', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'May', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Jun', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Jul', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Aug', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Sep', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Oct', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Nov', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
  { month: 'Dec', score: 0, workouts: 0, spend: 0, budgetPct: 0 },
]

const SEASON_COLORS = {
  winter: '#2A4A6B',  // Jan, Feb, Dec
  spring: '#3A6B2A',  // Mar, Apr, May
  summer: '#9A7A0C',  // Jun, Jul, Aug
  autumn: '#8B3A0C',  // Sep, Oct, Nov
}

const SEASON_LABELS = ['WINTER', 'WINTER', 'SPRING', 'SPRING', 'SPRING', 'SUMMER', 'SUMMER', 'SUMMER', 'AUTUMN', 'AUTUMN', 'AUTUMN', 'WINTER']

function getSeasonColor(monthIndex: number): string {
  const s = SEASON_LABELS[monthIndex].toLowerCase() as keyof typeof SEASON_COLORS
  return SEASON_COLORS[s]
}

function scoreToOpacity(score: number): number {
  if (score === 0) return 0.05
  return 0.15 + (score / 100) * 0.75
}

type RadialSegmentProps = {
  cx: number; cy: number
  innerR: number; outerR: number
  startAngle: number; endAngle: number
  color: string; opacity: number
  isActive?: boolean
}

function RadialSegment({ cx, cy, innerR, outerR, startAngle, endAngle, color, opacity, isActive }: RadialSegmentProps) {
  const toRad = (deg: number) => (deg - 90) * Math.PI / 180
  const s1 = toRad(startAngle), e1 = toRad(endAngle)

  const x1 = cx + outerR * Math.cos(s1), y1 = cy + outerR * Math.sin(s1)
  const x2 = cx + outerR * Math.cos(e1), y2 = cy + outerR * Math.sin(e1)
  const x3 = cx + innerR * Math.cos(e1), y3 = cy + innerR * Math.sin(e1)
  const x4 = cx + innerR * Math.cos(s1), y4 = cy + innerR * Math.sin(s1)
  const large = endAngle - startAngle > 180 ? 1 : 0

  return (
    <path
      d={`M${x1},${y1} A${outerR},${outerR} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 ${large} 0 ${x4},${y4} Z`}
      fill={color}
      fillOpacity={opacity}
      stroke={isActive ? color : '#0F0F0F'}
      strokeWidth={isActive ? 2 : 0.5}
      strokeOpacity={isActive ? 0.8 : 1}
    />
  )
}

export default function SeasonsView() {
  const cx = 200, cy = 200
  const segAngle = 360 / 12
  const currentMonth = 2 // March (0-indexed), current

  const rings = [
    { data: PREV_YEAR, label: '2025', innerR: 80, outerR: 120, year: 2025 },
    { data: CUR_YEAR, label: '2026', innerR: 125, outerR: 175, year: 2026 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header */}
      <div className="dojo-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="dojo-card-title" style={{ marginBottom: 4 }}>The Seasons — Long Arc</div>
            <div style={{ fontSize: 13, color: 'var(--steel)' }}>
              Discipline compounds. Every month leaves a mark.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {Object.entries(SEASON_COLORS).map(([s, c]) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c, opacity: 0.7 }} />
                <span style={{ fontSize: 9, color: 'var(--ash)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>

        {/* Radial chart */}
        <div className="dojo-card" style={{ flex: '0 0 420px' }}>
          <svg width={400} height={400} style={{ display: 'block', margin: '0 auto' }}>
            {/* Season quadrant backgrounds */}
            {[
              { label: 'WINTER', start: -60, end: 60, color: SEASON_COLORS.winter },    // Nov-Feb arc
              { label: 'SPRING', start: 60, end: 150, color: SEASON_COLORS.spring },
              { label: 'SUMMER', start: 150, end: 240, color: SEASON_COLORS.summer },
              { label: 'AUTUMN', start: 240, end: 300, color: SEASON_COLORS.autumn },
            ].map(q => (
              <RadialSegment
                key={q.label}
                cx={cx} cy={cy}
                innerR={50} outerR={185}
                startAngle={q.start} endAngle={q.end}
                color={q.color} opacity={0.04}
              />
            ))}

            {/* Data rings */}
            {rings.map(ring => (
              ring.data.map((m, i) => {
                const start = i * segAngle - 90 + segAngle / 2
                const end = start + segAngle - 1
                const isCurrentMonth = ring.year === 2026 && i === currentMonth
                return (
                  <RadialSegment
                    key={`${ring.year}-${i}`}
                    cx={cx} cy={cy}
                    innerR={ring.innerR} outerR={ring.outerR}
                    startAngle={start} endAngle={end}
                    color={getSeasonColor(i)}
                    opacity={scoreToOpacity(m.score)}
                    isActive={isCurrentMonth}
                  />
                )
              })
            ))}

            {/* Month labels (outer ring) */}
            {CUR_YEAR.map((m, i) => {
              const angle = (i * segAngle - 90 + segAngle / 2) * Math.PI / 180
              const r = 192
              const x = cx + r * Math.cos(angle)
              const y = cy + r * Math.sin(angle)
              return (
                <text
                  key={i} x={x} y={y}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={8} fill={i === currentMonth ? '#E8E0D0' : '#444'}
                  fontWeight={i === currentMonth ? 700 : 400}
                >
                  {m.month.substring(0,3).toUpperCase()}
                </text>
              )
            })}

            {/* Year labels */}
            <text x={cx} y={cy - 16} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="#555" letterSpacing="2">2025</text>
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="#888" fontWeight={700} letterSpacing="1">2026</text>
            <text x={cx} y={cy + 18} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="#444">THE ARC</text>

            {/* Current position indicator */}
            {(() => {
              const angle = (currentMonth * segAngle - 90 + segAngle / 2) * Math.PI / 180
              const r = 178
              const x = cx + r * Math.cos(angle)
              const y = cy + r * Math.sin(angle)
              return (
                <>
                  <circle cx={x} cy={y} r={4} fill="#B22222" opacity={0.9} />
                  <circle cx={x} cy={y} r={8} fill="none" stroke="#B22222" strokeWidth={1} opacity={0.4} />
                </>
              )
            })()}

            {/* Ring separator circles */}
            <circle cx={cx} cy={cy} r={80} fill="none" stroke="#1E1E1E" strokeWidth={0.5} />
            <circle cx={cx} cy={cy} r={120} fill="none" stroke="#1E1E1E" strokeWidth={0.5} />
            <circle cx={cx} cy={cy} r={125} fill="none" stroke="#2A2A2A" strokeWidth={0.5} />
            <circle cx={cx} cy={cy} r={175} fill="none" stroke="#1E1E1E" strokeWidth={0.5} />
          </svg>
        </div>

        {/* Monthly breakdown table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="dojo-card">
            <div className="dojo-card-title" style={{ marginBottom: 10 }}>2026 Progress</div>
            {CUR_YEAR.slice(0, 3).map((m, i) => {
              const seasonColor = getSeasonColor(i)
              return (
                <div key={m.month} style={{
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  opacity: m.score === 0 ? 0.3 : 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i === currentMonth ? 'var(--paper)' : 'var(--steel)' }}>
                      {m.month} {i === currentMonth && <span style={{ color: 'var(--fire-bright)', fontSize: 9 }}>● NOW</span>}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: seasonColor }}>
                      {m.score > 0 ? `${m.score}/100` : '—'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--ash)' }}>
                    <span>{m.workouts} sessions</span>
                    {m.spend > 0 && <span>${m.spend.toLocaleString()} spent ({m.budgetPct}%)</span>}
                    {m.weight && <span>{m.weight} lbs</span>}
                    {m.note && <span style={{ color: 'var(--gold-bright)' }}>{m.note}</span>}
                  </div>
                  {m.score > 0 && (
                    <div className="dojo-bar-track" style={{ marginTop: 5 }}>
                      <div className="dojo-bar-fill" style={{ width: `${m.score}%`, background: seasonColor }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Year comparison */}
          <div className="dojo-card">
            <div className="dojo-card-title" style={{ marginBottom: 10 }}>Q1 Comparison</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 4 }}>2025 Q1 AVG SCORE</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#555' }}>52</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 4 }}>2026 Q1 AVG SCORE</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#3D9A56' }}>
                  67
                  <span style={{ fontSize: 11, color: 'var(--jade-bright)', marginLeft: 4 }}>+15</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 2 }}>2025 Q1 workouts</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--steel)' }}>24</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'var(--ash)', marginBottom: 2 }}>2026 Q1 workouts</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--jade-bright)' }}>
                  33 <span style={{ fontSize: 10 }}>+9</span>
                </div>
              </div>
            </div>
            <div className="dojo-alert good" style={{ marginTop: 10, marginBottom: 0 }}>
              Best Q1 on record. Discipline is compounding.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
