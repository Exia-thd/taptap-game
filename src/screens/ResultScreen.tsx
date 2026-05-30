import { useEffect } from 'react'
import { submitGameData } from '../services/lark'
import { GameData } from '../App'

const BASE = '/taptap-game/assets'

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
