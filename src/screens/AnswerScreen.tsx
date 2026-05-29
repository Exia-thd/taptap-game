interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const BASE = '/taptap-game/assets'

const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = { 1: 'pro', 2: 'coffee' }

const PRODUCT_META = {
  pro: {
    bg: 'linear-gradient(160deg,#004020,#00A651 50%,#00D468)',
    nameClass: 'answer-name-pro',
    glowClass: 'answer-glow-pro',
    label: 'MILO PRO',
    tagline: 'Mạnh mẽ — Bứt phá năng lượng',
    variantColor: '#7FFFB0',
    variantSize: 18,
    stripeColor: 'rgba(57,255,20,.7)',
  },
  coffee: {
    bg: 'linear-gradient(160deg,#1A0A03,#5C3010 50%,#B05A20)',
    nameClass: 'answer-name-coffee',
    glowClass: 'answer-glow-coffee',
    label: 'MILO COFFEE',
    tagline: 'Cà phê & Cacao — Sảng khoái tức thì',
    variantColor: '#D4A554',
    variantSize: 13,
    stripeColor: 'rgba(255,180,50,.7)',
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
          <div style={{ position: 'relative' }}>
            <div className={`answer-glow ${meta.glowClass}`} />
            <div className="answer-product-visual" style={{ background: meta.bg }}>
              <div style={{ position:'absolute',top:0,left:0,right:0,height:'42%',background:'linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 100%)' }} />
              <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,zIndex:1 }}>
                <span style={{ fontSize:26,fontWeight:900,color:'#fff',letterSpacing:'.06em',textShadow:'0 2px 8px rgba(0,0,0,.5)' }}>MILO</span>
                <span style={{ fontSize:meta.variantSize,fontWeight:800,color:meta.variantColor,letterSpacing:'.12em',textTransform:'uppercase' }}>
                  {correct === 'pro' ? 'PRO' : 'COFFEE'}
                </span>
                <div style={{ width:44,height:3,borderRadius:2,background:meta.stripeColor,marginTop:5 }} />
              </div>
            </div>
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
