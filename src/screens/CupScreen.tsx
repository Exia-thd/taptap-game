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
        <div className="cup-glass-ring-1" />
        <div className="cup-glass-ring-2" />
        <div className="cup-sparkle s1" />
        <div className="cup-sparkle s2" />
        <div className="cup-sparkle s3" />
        <div className="cup-sparkle s4" />
        <div className="cup-sparkle s5" />
        <div className="cup-sparkle s6" />
        <div className="cup-sparkle s7" />
        <div className="cup-sparkle s8" />
        <div className="cup-sparkle s9" />
        <div className="cup-sparkle s10" />
        <div className="cup-sparkle s11" />
        <div className="cup-sparkle s12" />
        <div className="cup-sparkle s13" />
        <div className="cup-sparkle s14" />
        <div className="cup-sparkle s15" />
        <div className="cup-sparkle s16" />
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
