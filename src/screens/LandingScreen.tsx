const BASE = '/taptap-game/assets'

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing" onClick={onNext}>
      <img
        className="screen-bg"
        src={`${BASE}/[MILO] DigitalGameSampling-01.png`}
        alt=""
        aria-hidden
      />
    </div>
  )
}
