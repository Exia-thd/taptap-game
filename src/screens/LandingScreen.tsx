const BASE = '/taptap-game/assets'

const STEPS = [
  { icon: '🥤', text: 'Nhận sản phẩm từ PG và thử một ngụm' },
  { icon: '📝', text: 'Chọn cảm nhận của bạn về sản phẩm vừa thử' },
  { icon: '🎯', text: 'Đoán xem bạn vừa uống sản phẩm nào' },
]

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <div className="landing-hero">
        <div className="landing-logo">MILO</div>
        <h1 className="landing-title">MILO PITCHING<br />GAME</h1>
        <p className="landing-sub">
          Thử — Cảm nhận — Đoán đúng sản phẩm<br />
          2 vòng, 2 ngụm, 1 thử thách!
        </p>
      </div>

      <div className="landing-steps">
        {STEPS.map((s, i) => (
          <div key={i} className="landing-step">
            <div className="step-num">{i + 1}</div>
            <span className="step-icon">{s.icon}</span>
            <span className="step-text">{s.text}</span>
          </div>
        ))}
      </div>

      <div className="cta-img-wrap">
        <img
          className="cta-img"
          src={`${BASE}/cta-yellow.png`}
          alt="Chạm để bắt đầu"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
