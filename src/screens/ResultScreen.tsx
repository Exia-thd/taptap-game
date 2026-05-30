const BASE = '/taptap-game/assets'

interface Props { onExit: () => void }

export default function ResultScreen({ onExit }: Props) {
  return (
    <div className="screen result-screen">
      <img className="screen-bg" src={`${BASE}/[MILO] DigitalGameSampling-10.png`} alt="" aria-hidden />
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
