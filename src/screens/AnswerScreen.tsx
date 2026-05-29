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
  const ctaLabel = sip === 1 ? 'Tiếp tục vòng 2' : 'Xem kết quả cuối'

  return (
    <div className="screen answer-screen">
      <div className="answer-top">
        <span className="badge">Vòng {sip} — Đáp án</span>
        <h2 className="answer-title">Đáp án là...</h2>
      </div>

      <div className="answer-stage">
        <div className="answer-product-reveal">
          <div style={{ position: 'relative', display:'flex', justifyContent:'center' }}>
            <div className={`answer-glow ${meta.glowClass}`} />
            <img
              className="answer-product-img"
              src={`${BASE}/milo-${correct}.png`}
              alt={meta.label}
              draggable={false}
            />
          </div>
          <div style={{ textAlign:'center' }}>
            <p className={`answer-product-name ${meta.nameClass}`}>{meta.label}</p>
            <p style={{ fontSize:13,color:'var(--muted)',marginTop:4 }}>{meta.tagline}</p>
          </div>
        </div>

        {isCorrect ? (
          <img className="correct-banner" src={`${BASE}/correct.png`} alt="Đáp án chính xác" />
        ) : (
          <div className="wrong-banner">
            <span className="wrong-text">😅 Chưa đúng lần này!</span>
            <span className="wrong-sub">Đó là {meta.label} — Thử lại lần sau nhé!</span>
          </div>
        )}
      </div>

      <div className="cta-img-wrap">
        <img
          className="cta-img"
          src={`${BASE}/cta-green.png`}
          alt={ctaLabel}
          onClick={onNext}
        />
      </div>
    </div>
  )
}
