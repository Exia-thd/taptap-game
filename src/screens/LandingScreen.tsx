interface Props { onNext: () => void }

const STEPS = [
  { icon: '🥤', text: 'Thử sản phẩm Milo do PG hướng dẫn' },
  { icon: '📝', text: 'Ghi lại cảm nhận của bạn (6 lựa chọn)' },
  { icon: '🎯', text: 'Đoán đúng sản phẩm bạn vừa thử' },
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
          Khám phá hương vị — Đoán đúng sản phẩm<br />
          và giành phần thưởng!
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
