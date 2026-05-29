interface Props { onNext: () => void }

const STEPS = [
  { icon: '🥤', text: 'Nhận sản phẩm từ PG và thử một ngụm' },
  { icon: '📝', text: 'Chọn cảm nhận của bạn về sản phẩm vừa thử' },
  { icon: '🎯', text: 'Đoán xem bạn vừa uống sản phẩm nào' },
]

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <div className="landing-hero">
        <div className="landing-logo-wrap">
          <div className="landing-logo-ring" />
          <div className="landing-logo-ring" />
          <div className="landing-logo">
            <span className="landing-logo-text">MILO</span>
          </div>
        </div>

        <h1 className="landing-title">MILO PITCHING<br />GAME</h1>
        <div className="divider" />
        <p className="landing-sub">
          Thử — Cảm nhận — Đoán đúng sản phẩm<br />
          2 vòng, 2 ngụm, 1 thử thách!
        </p>
      </div>

      <div className="landing-steps">
        {STEPS.map((s, i) => (
          <div key={i} className="landing-step">
            <div className="step-num">{i + 1}</div>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <span className="step-text">{s.text}</span>
          </div>
        ))}
      </div>

      <button className="cta" onClick={onNext}>
        Chạm để bắt đầu ✦
      </button>
    </div>
  )
}
