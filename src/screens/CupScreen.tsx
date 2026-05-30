const BASE = '/taptap-game/assets'

interface Props { sip: 1 | 2; onNext: () => void }

const BG: Record<1 | 2, string> = {
  1: '[MILO] DigitalGameSampling-02.png',
  2: '[MILO] DigitalGameSampling-06..png',
}

export default function CupScreen({ sip, onNext }: Props) {
  return (
    <div className="screen cup-screen" onClick={onNext}>
      <img
        className="screen-bg"
        src={`${BASE}/${BG[sip]}`}
        alt=""
        aria-hidden
      />
    </div>
  )
}
