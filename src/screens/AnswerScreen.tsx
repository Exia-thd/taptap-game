interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = {
  1: 'pro',
  2: 'coffee',
}

const PRODUCT_META = {
  pro: {
    name: 'MILO PRO',
    tagline: 'Mạnh mẽ — Bứt phá năng lượng',
    color: 'var(--green-light)',
    bg: 'linear-gradient(160deg, #006631 0%, #00A651 50%, #00D468 100%)',
    glowClass: 'answer-glow-pro',
    nameClass: 'answer-product-name-pro',
  },
  coffee: {
    name: 'MILO COFFEE',
    tagline: 'Cà phê & Cacao — Sảng khoái tức thì',
    color: '#D4860A',
    bg: 'linear-gradient(160deg, #2C1606 0%, #7A3D10 50%, #B05A20 100%)',
    glowClass: 'answer-glow-coffee',
    nameClass: 'answer-product-name-coffee',
  },
}

export default function AnswerScreen({ sip, guess, onNext }: Props) {
  const correct = ANSWERS[sip]
  const isCorrect = guess === correct
  const meta = PRODUCT_META[correct]

  const ctaLabel = sip === 1 ? 'Tiếp tục vòng 2 →' : 'Xem kết quả cuối →'

  return (
    <div className="screen answer-screen">
      <div className="answer-top">
        <span className="badge">Vòng {sip} — Đáp án</span>
        <h2 className="answer-title">Đáp án là...</h2>
        <div className="divider" />
      </div>

      <div className="answer-stage">
        <div className="answer-product-reveal">
          <div style={{ position: 'relative' }}>
            <div className={`answer-glow ${meta.glowClass}`} />
            <div
              className="answer-product-visual"
              style={{ background: meta.bg }}
            >
              {/* Shine */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 1 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '0.06em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  MILO
                </span>
                <span style={{ fontSize: correct === 'pro' ? 18 : 13, fontWeight: 800, color: meta.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {correct === 'pro' ? 'PRO' : 'COFFEE'}
                </span>
                <div style={{ width: 50, height: 4, borderRadius: 2, background: meta.color, opacity: 0.8, marginTop: 6 }} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p className={`answer-product-name ${meta.nameClass}`}>{meta.name}</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{meta.tagline}</p>
          </div>
        </div>

        <div className={`answer-verdict ${isCorrect ? 'answer-verdict-correct' : 'answer-verdict-wrong'}`}>
          <span className="verdict-icon">{isCorrect ? '🎉' : '😅'}</span>
          <span className={`verdict-text ${isCorrect ? 'verdict-correct' : 'verdict-wrong'}`}>
            {isCorrect ? 'Đúng rồi! Chuẩn luôn!' : 'Chưa đúng lần này!'}
          </span>
          <span className="verdict-sub">
            {isCorrect
              ? `Bạn đã nhận ra ${meta.name}!`
              : `Đó là ${meta.name} — Thử lại lần sau nhé!`}
          </span>
        </div>
      </div>

      <button className="cta" onClick={onNext}>{ctaLabel}</button>
    </div>
  )
}
