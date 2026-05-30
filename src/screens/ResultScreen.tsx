import { useEffect } from 'react'
import { submitGameData } from '../services/lark'
import { GameData } from '../App'

const BASE = '/taptap-game/assets'

const CONFETTI = [
  { color: '#39FF14', left: '8%',  delay: '0s',    dur: '2.4s', size: 9,  rot: 45  },
  { color: '#F5E000', left: '18%', delay: '0.15s', dur: '2.8s', size: 7,  rot: 120 },
  { color: '#ffffff', left: '27%', delay: '0.4s',  dur: '2.2s', size: 10, rot: 200 },
  { color: '#00A651', left: '38%', delay: '0.1s',  dur: '3.0s', size: 6,  rot: 70  },
  { color: '#39FF14', left: '48%', delay: '0.55s', dur: '2.6s', size: 11, rot: 160 },
  { color: '#F5E000', left: '58%', delay: '0.25s', dur: '2.3s', size: 8,  rot: 30  },
  { color: '#ffffff', left: '68%', delay: '0.7s',  dur: '2.9s', size: 7,  rot: 250 },
  { color: '#00A651', left: '78%', delay: '0.35s', dur: '2.5s', size: 10, rot: 90  },
  { color: '#39FF14', left: '88%', delay: '0.5s',  dur: '2.1s', size: 6,  rot: 180 },
  { color: '#F5E000', left: '13%', delay: '0.8s',  dur: '3.2s', size: 9,  rot: 320 },
  { color: '#ffffff', left: '33%', delay: '0.6s',  dur: '2.7s', size: 7,  rot: 140 },
  { color: '#39FF14', left: '53%', delay: '0.9s',  dur: '2.4s', size: 11, rot: 260 },
  { color: '#00A651', left: '73%', delay: '0.45s', dur: '2.8s', size: 8,  rot: 50  },
  { color: '#F5E000', left: '93%', delay: '0.2s',  dur: '3.1s', size: 6,  rot: 100 },
  { color: '#ffffff', left: '43%', delay: '1.0s',  dur: '2.3s', size: 9,  rot: 210 },
  { color: '#39FF14', left: '63%', delay: '0.75s', dur: '2.6s', size: 7,  rot: 330 },
  { color: '#F5E000', left: '23%', delay: '1.1s',  dur: '2.9s', size: 10, rot: 15  },
  { color: '#00A651', left: '83%', delay: '0.3s',  dur: '2.2s', size: 8,  rot: 280 },
]

interface Props {
  data: GameData
  onExit: () => void
}

function getResultBg(data: GameData): string {
  const score = (data.sip1Guess === 'pro' ? 1 : 0) + (data.sip2Guess === 'coffee' ? 1 : 0)
  if (score === 2) return '[MILO] DigitalGameSampling-10.png'
  if (score === 1) return 'End1.png'
  return 'End2.png'
}

export default function ResultScreen({ data, onExit }: Props) {
  useEffect(() => {
    submitGameData(data).catch((err) => {
      console.error('Lark submit error:', err)
    })
  }, [data])

  return (
    <div className="screen result-screen">
      <img className="screen-bg" src={`${BASE}/${getResultBg(data)}`} alt="" aria-hidden />

      {CONFETTI.map((c, i) => (
        <div key={i} className="confetti-piece" style={{
          left: c.left,
          width: c.size,
          height: c.size * 1.6,
          background: c.color,
          animationDelay: c.delay,
          animationDuration: c.dur,
          '--rot': `${c.rot}deg`,
        } as React.CSSProperties} />
      ))}

      <button className="result-home-btn" onClick={onExit} aria-label="Về trang chủ">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      </button>
    </div>
  )
}
