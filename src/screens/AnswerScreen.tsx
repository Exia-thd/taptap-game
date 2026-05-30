interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const BASE = '/taptap-game/assets'

const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = { 1: 'pro', 2: 'coffee' }

const PRODUCT_META = {
  pro: {
    nameClass: 'answer-name-pro',
    glowClass: 'answer-glow-pro',
    label: 'MILO PRO',
    tagline: 'Mạnh mẽ — Bứt phá năng lượng',
  },
  coffee: {
    nameClass: 'answer-name-coffee',
    glowClass: 'answer-glow-coffee',
    label: 'MILO COFFEE',
    tagline: 'Cà phê & Cacao — Sảng khoái tức thì',
  },
}

export default function AnswerScreen({ sip, guess, onNext }: Props) {
  const correct = ANSWERS[sip]
  const isCorrect = guess === correct
  const meta = PRODUCT_META[correct]

  return (
    <div className="screen answer-screen">
      <div className="answer-top">
        <span className="badge">Vòng {sip} — Đáp án</span>
      </div>

      <div className="answer-stage">
        <div className="answer-product-reveal">
          <div className={`answer-glow ${meta.glowClass}`} />
          <img
            className="answer-product-img"
            src={`${BASE}/milo-${correct}.png`}
            alt={meta.label}
            draggable={false}
          />
          {isCorrect
            ? <img className="correct-banner" src={`${BASE}/correct.png`} alt="Đáp án chính xác" />
            : (
              <div className="wrong-banner">
                <span className="wrong-text">😅 Chưa đúng lần này!</span>
                <span className="wrong-sub">Đó là {meta.label}</span>
              </div>
            )
          }
        </div>
        <p style={{ fontSize:13, color:'var(--muted)', textAlign:'center' }}>{meta.tagline}</p>
      </div>

      <div className="cta-img-wrap">
        <img
          className="cta-img"
          src={`${BASE}/cta-yellow.png`}
          alt="Chạm để tiếp tục"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
