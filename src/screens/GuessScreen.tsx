interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

function ProductCan({ type }: { type: 'pro' | 'coffee' }) {
  const isPro = type === 'pro'
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Can lid */}
      <div style={{
        width: '55%',
        height: 14,
        background: isPro ? 'rgba(0,212,104,0.5)' : 'rgba(180,100,20,0.5)',
        borderRadius: '4px 4px 0 0',
        border: `1px solid ${isPro ? 'rgba(0,212,104,0.4)' : 'rgba(180,100,20,0.4)'}`,
      }} />
      {/* Pull tab */}
      <div style={{
        width: 18,
        height: 6,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.4)',
        marginTop: -3,
        marginBottom: 2,
      }} />
      {/* Can body */}
      <div style={{
        width: '100%',
        padding: '18px 8px 14px',
        borderRadius: '6px 6px 0 0',
        background: isPro
          ? 'linear-gradient(180deg, rgba(0,180,80,0.2) 0%, rgba(0,80,35,0.4) 100%)'
          : 'linear-gradient(180deg, rgba(100,50,10,0.3) 0%, rgba(40,15,5,0.5) 100%)',
        border: `1px solid ${isPro ? 'rgba(0,212,104,0.3)' : 'rgba(180,100,20,0.25)'}`,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: 4,
        position: 'relative' as const,
        overflow: 'hidden',
      }}>
        {/* Top shine */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        }} />
        <span style={{
          fontSize: 22, fontWeight: 900, color: '#fff',
          letterSpacing: '0.06em', textShadow: '0 1px 5px rgba(0,0,0,0.6)',
          position: 'relative', zIndex: 1,
        }}>MILO</span>
        <span style={{
          fontSize: isPro ? 14 : 11,
          fontWeight: 800,
          color: isPro ? '#7FFFB0' : '#D4A554',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          position: 'relative', zIndex: 1,
        }}>{isPro ? 'PRO' : 'COFFEE'}</span>
        <div style={{
          width: '70%', height: 3, borderRadius: 2, marginTop: 6,
          background: isPro ? 'rgba(57,255,20,0.7)' : 'rgba(255,180,50,0.7)',
          position: 'relative', zIndex: 1,
        }} />
        {/* Can ribs */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${30 + i * 22}%`,
            left: 0, right: 0,
            height: 1,
            background: 'rgba(255,255,255,0.05)',
          }} />
        ))}
      </div>
      {/* Can bottom */}
      <div style={{
        width: '100%',
        height: 12,
        background: isPro ? 'rgba(0,60,25,0.8)' : 'rgba(30,10,3,0.8)',
        borderRadius: '0 0 8px 8px',
        border: `1px solid ${isPro ? 'rgba(0,100,40,0.4)' : 'rgba(100,50,10,0.4)'}`,
        borderTop: 'none',
      }} />
    </div>
  )
}

export default function GuessScreen({ sip, selected, onSelect, onNext }: Props) {
  return (
    <div className="screen guess-screen">
      <div className="guess-top">
        <span className="badge">Vòng {sip} — Đoán sản phẩm</span>
        <h2 className="guess-title">Bạn vừa thử<br />sản phẩm nào? 🎯</h2>
        <p className="guess-sub">Chạm vào sản phẩm bạn nghĩ là đúng</p>
      </div>

      <div className="guess-products">
        {(['pro', 'coffee'] as const).map(type => {
          const cls =
            selected == null ? 'product-card'
            : selected === type ? 'product-card selected'
            : 'product-card dimmed'
          return (
            <div key={type} className={cls} onClick={() => onSelect(type)}>
              <div className={`product-visual product-visual-${type}`}>
                <ProductCan type={type} />
              </div>
              <span className={`product-name product-tag-${type}`}>
                {type === 'pro' ? 'MILO PRO' : 'MILO COFFEE'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="guess-footer">
        {selected == null && (
          <p className="guess-hint">Hãy chọn trước khi xem kết quả</p>
        )}
        <button className="cta" onClick={onNext} disabled={!selected}>
          Xem kết quả →
        </button>
      </div>
    </div>
  )
}
