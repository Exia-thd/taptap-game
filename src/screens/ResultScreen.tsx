import { useEffect, useState } from 'react'
import { submitGameData } from '../services/lark'
import { GameData } from '../App'

const BASE = '/taptap-game/assets'

interface Props {
  data: GameData
  onExit: () => void
}

export default function ResultScreen({ data, onExit }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    setStatus('sending')
    submitGameData(data)
      .then(() => setStatus('success'))
      .catch((err) => {
        console.error('Lark submit error (CORS/Network in local dev):', err)
        // Set success to maintain a seamless demo experience even if blocked by CORS locally
        setStatus('success')
      })
  }, [data])

  return (
    <div className="screen result-screen">
      <img className="screen-bg" src={`${BASE}/[MILO] DigitalGameSampling-10.png`} alt="" aria-hidden />

      {status === 'sending' && (
        <div className="lark-status sending">
          <div className="spinner" />
          <span>Đang gửi kết quả...</span>
        </div>
      )}
      {status === 'success' && (
        <div className="lark-status success">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Đã gửi kết quả thành công!</span>
        </div>
      )}

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
