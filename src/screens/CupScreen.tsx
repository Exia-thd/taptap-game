interface Props { sip: 1 | 2; onNext: () => void }

function MiloCupSVG() {
  return (
    <svg className="cup-svg" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Straw */}
      <rect x="72" y="4" width="10" height="46" rx="5"
        fill="url(#strawGrad)" />

      {/* Lid */}
      <ellipse cx="80" cy="50" rx="44" ry="12"
        fill="url(#lidGrad)" />
      <ellipse cx="80" cy="50" rx="44" ry="12"
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

      {/* Cup body */}
      <path d="M38 50 L28 168 Q28 180 40 180 L120 180 Q132 180 132 168 L122 50 Z"
        fill="url(#cupGrad)" />

      {/* Shine overlay on cup */}
      <path d="M38 50 L28 168 Q28 180 40 180 L60 180 L52 50 Z"
        fill="url(#shineGrad)" opacity="0.35" />

      {/* Brand band */}
      <path d="M30 100 L130 100 L128 116 L32 116 Z"
        fill="rgba(0,0,0,0.2)" />

      {/* MILO logo on cup */}
      <text x="80" y="113" textAnchor="middle" fontSize="18" fontWeight="900"
        fontFamily="Be Vietnam Pro, sans-serif" fill="white" letterSpacing="3"
        opacity="0.95">MILO</text>

      {/* Wave decoration at bottom of cup */}
      <path d="M32 150 Q45 144 58 150 Q71 156 84 150 Q97 144 110 150 Q123 156 128 150"
        stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />

      {/* Cup bottom ellipse */}
      <ellipse cx="80" cy="180" rx="40" ry="8"
        fill="url(#bottomGrad)" />

      {/* Small bubbles / steam effect */}
      <circle cx="60" cy="135" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="95" cy="125" r="4" fill="rgba(255,255,255,0.1)" />
      <circle cx="75" cy="145" r="2.5" fill="rgba(255,255,255,0.12)" />

      <defs>
        <linearGradient id="strawGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C85A" />
          <stop offset="100%" stopColor="#00FF80" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D468" />
          <stop offset="100%" stopColor="#006631" />
        </linearGradient>
        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00C45E" />
          <stop offset="40%"  stopColor="#00A651" />
          <stop offset="100%" stopColor="#004D25" />
        </linearGradient>
        <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#006631" />
          <stop offset="100%" stopColor="#003318" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function CupScreen({ sip, onNext }: Props) {
  return (
    <div className="screen cup-screen">
      <div className="cup-screen-top">
        <span className="badge">Vòng {sip} / 2</span>
        <p className="cup-screen-title">Sip {sip}</p>
        <h2 className="cup-screen-headline">
          {sip === 1
            ? 'Bạn vừa thử\nmột ngụm Milo!'
            : 'Một ngụm nữa\nnào!'}
        </h2>
      </div>

      <div className="cup-arena">
        {/* Rotating energy rays */}
        <div className="energy-rays">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="energy-ray" />
          ))}
        </div>

        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        {/* Cup with float + glow */}
        <div className="cup-wrap">
          <MiloCupSVG />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', zIndex: 1 }}>
        <p style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center' }}>
          Hãy để cảm nhận hương vị<br />lắng đọng trong vài giây...
        </p>
        <button className="cta" onClick={onNext}>
          Tiếp tục →
        </button>
      </div>
    </div>
  )
}
