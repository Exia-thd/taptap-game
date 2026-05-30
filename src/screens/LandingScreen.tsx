const BASE = '/taptap-game/assets'

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <img className="screen-bg" src={`${BASE}/BG1.png`} alt="" aria-hidden />

      {/* Light sweep */}
      <div className="landing-light-sweep" />

      {/* Fireflies */}
      <div className="landing-fireflies">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`landing-firefly lf${i + 1}`} />
        ))}
      </div>

      {/* Floating products */}

      <div className="landing-cta-container">
        <img
          className="cta-img"
          src={`${BASE}/Asset 16 - cham tt.png`}
          alt="Chạm để tiếp tục"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
