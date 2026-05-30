const BASE = '/taptap-game/assets'

interface Props {
  onExit: () => void
}

export default function ResultScreen({ onExit }: Props) {
  return (
    <div className="screen result-screen">
      <img
        className="screen-bg"
        src={`${BASE}/[MILO] DigitalGameSampling-10.png`}
        alt=""
        aria-hidden
      />
      <div className="result-replay">
        <button className="result-exit" onClick={onExit}>Chơi lại</button>
      </div>
    </div>
  )
}
