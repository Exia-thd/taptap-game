const BASE = '/taptap-game/assets'

interface Props { sip: 1 | 2; onNext: () => void }

const BG: Record<1 | 2, string> = {
  1: 'B2.png',
  2: 'B6.png',
}

export default function CupScreen({ sip, onNext }: Props) {
  return (
    <div className="screen cup-screen">
      <img
        className="screen-bg"
        src={`${BASE}/${BG[sip]}`}
        alt=""
        aria-hidden
      />

      <div className="cup-glass-container">
        <div className="cup-glass-sunbeams" />
        <div className="cup-glass-glow" />
        <img
          className="cup-glass-img"
          src={`${BASE}/Asset 18- ly.png`}
          alt="Ly Milo"
          draggable={false}
        />
      </div>

      <div className="cup-cta-container">
        <img
          className="cta-img"
          src={`${BASE}/Asset 9 CHAM TT.png`}
          alt="Chạm để tiếp tục"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
