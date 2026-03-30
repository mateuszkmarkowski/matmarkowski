'use client'

// ─── The Garden — habits rendered as living plants ────────────────────────────
// Each habit is a plant. Streak = growth. Neglect = wither.
// Bamboo (fitness) · Oak (finance) · Lotus (mindset) · Vine (income growth)

type PlantData = {
  id: string
  name: string
  type: 'bamboo' | 'oak' | 'lotus' | 'vine'
  category: string
  streak: number       // current streak (days or sessions)
  maxStreak: number    // best ever
  lastLogged: string   // e.g. "2 days ago"
  alive: boolean       // false = recently abandoned
  color: string
}

// Mock data — replace with real Supabase fetch
const PLANTS: PlantData[] = [
  {
    id: '1', name: 'Strength Training', type: 'bamboo', category: 'FITNESS',
    streak: 7, maxStreak: 12, lastLogged: '3 days ago', alive: true, color: '#3D9A56',
  },
  {
    id: '2', name: 'Finance Review', type: 'oak', category: 'FINANCE',
    streak: 4, maxStreak: 8, lastLogged: 'Today', alive: true, color: '#C4A020',
  },
  {
    id: '3', name: 'No Phone Morning', type: 'lotus', category: 'MINDSET',
    streak: 3, maxStreak: 14, lastLogged: 'Today', alive: true, color: '#7A9AB0',
  },
  {
    id: '4', name: 'Income Building', type: 'vine', category: 'GROWTH',
    streak: 0, maxStreak: 3, lastLogged: '9 days ago', alive: false, color: '#8B3A0C',
  },
]

function Bamboo({ streak, alive }: { streak: number; alive: boolean }) {
  const segments = Math.min(streak, 10)
  const segH = 18
  const height = 20 + segments * segH
  const color = alive ? '#3D9A56' : '#444'
  const leafColor = alive ? '#2A7A40' : '#333'

  return (
    <svg width="40" height={height + 20} viewBox={`0 0 40 ${height + 20}`} style={{ overflow: 'visible' }}>
      {/* Stalk */}
      {Array.from({ length: segments }).map((_, i) => {
        const y = height - (i + 1) * segH
        return (
          <g key={i}>
            <rect x={17} y={y} width={6} height={segH - 2} rx={2} fill={color} opacity={alive ? 1 : 0.5} />
            <rect x={16} y={y + segH - 3} width={8} height={3} rx={1} fill={alive ? '#2A6B3A' : '#333'} />
          </g>
        )
      })}
      {/* Leaves on top */}
      {segments > 0 && alive && (
        <>
          <ellipse cx={12} cy={height - segments * segH + 4} rx={10} ry={4} fill={leafColor} transform={`rotate(-30, 12, ${height - segments * segH + 4})`} />
          <ellipse cx={28} cy={height - segments * segH + 4} rx={10} ry={4} fill={leafColor} transform={`rotate(30, 28, ${height - segments * segH + 4})`} />
        </>
      )}
      {/* Base */}
      <ellipse cx={20} cy={height + 4} rx={8} ry={3} fill={alive ? '#2A6B3A' : '#2A2A2A'} opacity={0.6} />
    </svg>
  )
}

function Oak({ streak, alive }: { streak: number; alive: boolean }) {
  const size = 20 + Math.min(streak, 10) * 5
  const trunkH = 20 + Math.min(streak, 6) * 3
  const color = alive ? '#C4A020' : '#444'
  const leafColor = alive ? '#9A7A0C' : '#333'

  return (
    <svg width={50} height={trunkH + size + 10} viewBox={`0 0 50 ${trunkH + size + 10}`} style={{ overflow: 'visible' }}>
      {/* Trunk */}
      <rect x={22} y={trunkH} width={6} height={trunkH} rx={2} fill={alive ? '#6B4A0C' : '#333'} />
      {/* Canopy */}
      {streak > 0 && (
        <>
          <circle cx={25} cy={trunkH - size / 2 + 5} r={size / 2} fill={leafColor} opacity={alive ? 0.8 : 0.3} />
          <circle cx={15} cy={trunkH - size / 2 + 12} r={size / 2 * 0.8} fill={leafColor} opacity={alive ? 0.7 : 0.2} />
          <circle cx={35} cy={trunkH - size / 2 + 12} r={size / 2 * 0.8} fill={leafColor} opacity={alive ? 0.7 : 0.2} />
        </>
      )}
      {/* Coins on leaves */}
      {alive && streak > 2 && Array.from({ length: Math.min(streak - 2, 5) }).map((_, i) => (
        <circle
          key={i}
          cx={15 + i * 7}
          cy={trunkH - size / 2 + 8 + (i % 2) * 6}
          r={3}
          fill={color}
          opacity={0.9}
        />
      ))}
      {/* Base */}
      <ellipse cx={25} cy={trunkH * 2 + 4} rx={8} ry={3} fill={alive ? '#6B4A0C' : '#2A2A2A'} opacity={0.5} />
    </svg>
  )
}

function Lotus({ streak, alive }: { streak: number; alive: boolean }) {
  const petals = Math.min(streak > 0 ? 3 + streak : 0, 8)
  const open = streak > 0 ? Math.min(streak / 5, 1) : 0
  const color = alive ? '#7A9AB0' : '#333'
  const centerColor = alive ? '#B0C4D8' : '#444'

  return (
    <svg width={50} height={60} viewBox="0 0 50 60" style={{ overflow: 'visible' }}>
      {/* Water */}
      <ellipse cx={25} cy={52} rx={18} ry={5} fill={alive ? '#1A3A4A' : '#1A1A1A'} opacity={0.6} />
      <path d="M10 48 Q25 40 40 48" stroke={alive ? '#2A5A6B' : '#222'} strokeWidth={1} fill="none" />
      {/* Stem */}
      <path d={`M25 52 Q22 44 25 ${30 + open * 10}`} stroke={alive ? '#2A6B3A' : '#333'} strokeWidth={2} fill="none" />
      {/* Petals */}
      {petals > 0 && Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI * 2 - Math.PI / 2
        const openDist = 10 + open * 8
        const px = 25 + Math.cos(angle) * openDist
        const py = 22 + Math.sin(angle) * openDist * 0.5
        return (
          <ellipse
            key={i}
            cx={px} cy={py}
            rx={6} ry={10}
            fill={color}
            opacity={alive ? 0.7 + i * 0.03 : 0.2}
            transform={`rotate(${(angle * 180 / Math.PI) + 90}, ${px}, ${py})`}
          />
        )
      })}
      {/* Center */}
      {streak > 0 && <circle cx={25} cy={22} r={5} fill={centerColor} opacity={alive ? 0.9 : 0.3} />}
    </svg>
  )
}

function Vine({ streak, alive }: { streak: number; alive: boolean }) {
  const height = 60
  const progress = Math.min(streak / 10, 1)
  const climbY = height - progress * (height - 10)
  const color = alive ? '#8B3A0C' : '#333'
  const leafColor = alive ? '#6B5A0C' : '#2A2A2A'

  return (
    <svg width={40} height={height + 10} viewBox={`0 0 40 ${height + 10}`} style={{ overflow: 'visible' }}>
      {/* Trellis */}
      <rect x={18} y={0} width={2} height={height} fill="#1E1E1E" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1={12} y1={i * 14 + 4} x2={26} y2={i * 14 + 4} stroke="#1E1E1E" strokeWidth={1} />
      ))}
      {/* Vine path */}
      {streak > 0 && (
        <path
          d={`M19 ${height} Q14 ${height - 10} 19 ${height - 20} Q24 ${height - 30} 19 ${climbY}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
          opacity={alive ? 1 : 0.4}
        />
      )}
      {/* Leaves along vine */}
      {alive && streak > 0 && Array.from({ length: Math.min(streak, 4) }).map((_, i) => {
        const ly = height - (i + 1) * 14
        const side = i % 2 === 0 ? -1 : 1
        return (
          <ellipse
            key={i}
            cx={19 + side * 8} cy={ly + 3}
            rx={7} ry={4}
            fill={leafColor}
            opacity={0.8}
            transform={`rotate(${side * -30}, ${19 + side * 8}, ${ly + 3})`}
          />
        )
      })}
      {/* Base soil */}
      <ellipse cx={19} cy={height + 4} rx={8} ry={3} fill={alive ? '#4A2A0C' : '#2A2A2A'} opacity={0.5} />
    </svg>
  )
}

function PlantCard({ plant }: { plant: PlantData }) {
  const plantHeight = plant.type === 'bamboo' ? 130 : plant.type === 'vine' ? 90 : 80

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 8px',
      background: plant.alive ? 'var(--floor)' : 'rgba(255,255,255,0.01)',
      border: `1px solid ${plant.alive ? 'var(--border)' : 'var(--border)'}`,
      borderRadius: 6,
      position: 'relative',
      transition: 'all 0.3s ease',
    }}>
      {/* Category label */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        fontSize: 8, fontWeight: 700, letterSpacing: '0.15em',
        color: plant.alive ? plant.color : 'var(--ash)',
      }}>
        {plant.category}
      </div>

      {/* Streak badge */}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        fontSize: 10, fontWeight: 700,
        color: plant.alive ? plant.color : 'var(--ash)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {plant.streak > 0 ? `${plant.streak}×` : '—'}
      </div>

      {/* Plant SVG */}
      <div style={{ height: plantHeight, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: 20 }}>
        {plant.type === 'bamboo' && <Bamboo streak={plant.streak} alive={plant.alive} />}
        {plant.type === 'oak' && <Oak streak={plant.streak} alive={plant.alive} />}
        {plant.type === 'lotus' && <Lotus streak={plant.streak} alive={plant.alive} />}
        {plant.type === 'vine' && <Vine streak={plant.streak} alive={plant.alive} />}
      </div>

      {/* Name */}
      <div style={{
        marginTop: 8, fontSize: 11, fontWeight: 600, textAlign: 'center',
        color: plant.alive ? 'var(--paper)' : 'var(--ash)',
      }}>
        {plant.name}
      </div>

      {/* Last logged */}
      <div style={{ fontSize: 9, color: 'var(--ash)', marginTop: 2, textAlign: 'center' }}>
        {plant.lastLogged}
      </div>

      {/* Dead indicator */}
      {!plant.alive && (
        <div style={{
          marginTop: 6, fontSize: 9, color: 'var(--fire-bright)',
          fontWeight: 700, letterSpacing: '0.1em',
        }}>
          NEGLECTED
        </div>
      )}
    </div>
  )
}

export default function GardenView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Garden header */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--floor)',
        border: '1px solid var(--border)',
        borderRadius: 6,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ash)', marginBottom: 4 }}>
              THE GARDEN — WEEK 13 OF 2026
            </div>
            <div style={{ fontSize: 13, color: 'var(--steel)' }}>
              3 of 4 habits growing.{' '}
              <span style={{ color: 'var(--fire-bright)' }}>
                Income Building is withering — 9 days without water.
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--paper)' }}>75%</div>
            <div style={{ fontSize: 9, color: 'var(--ash)' }}>habits alive</div>
          </div>
        </div>
      </div>

      {/* Garden ground scene */}
      <div style={{
        background: 'linear-gradient(180deg, #080808 0%, #0A0A08 60%, #0C0B07 100%)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        padding: '20px 20px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Moon */}
        <div style={{
          position: 'absolute', top: 12, right: 20,
          width: 24, height: 24,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 40%, #E8E0D0, #C0B090)',
          opacity: 0.4,
        }} />
        {/* Stars */}
        {[{x:15,y:15},{x:35,y:8},{x:55,y:20},{x:70,y:10},{x:85,y:18},{x:25,y:25}].map((s,i) => (
          <div key={i} style={{
            position: 'absolute', left: `${s.x}%`, top: s.y,
            width: 1, height: 1, background: 'var(--paper)', opacity: 0.3, borderRadius: '50%',
          }} />
        ))}

        {/* Plants row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {PLANTS.map(plant => <PlantCard key={plant.id} plant={plant} />)}
        </div>

        {/* Ground */}
        <div style={{
          marginTop: 0,
          height: 20,
          background: 'linear-gradient(180deg, #0C0B07, #1A1208)',
          borderTop: '1px solid #2A2010',
        }} />
      </div>

      {/* Habit streaks detail */}
      <div className="dojo-card">
        <div className="dojo-card-header">
          <span className="dojo-card-title">Habit Records</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {PLANTS.map(p => (
            <div key={p.id} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: 'var(--ash)', letterSpacing: '0.1em', marginBottom: 4 }}>
                {p.name.toUpperCase().substring(0, 8)}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: p.alive ? p.color : 'var(--ash)', fontVariantNumeric: 'tabular-nums' }}>
                {p.streak}
              </div>
              <div style={{ fontSize: 9, color: 'var(--ash)' }}>streak</div>
              <div style={{ marginTop: 4, fontSize: 9, color: 'var(--ash)' }}>
                best: {p.maxStreak}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
