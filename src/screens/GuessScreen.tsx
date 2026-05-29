interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

const BASE = '/taptap-game/assets'

function ProductCan({ type }: { type: 'pro' | 'coffee' }) {
  const isPro = type === 'pro'
  return (
    <div className="can-wrap">
      <div className="can-lid" />
      <div className={`can-body ${isPro ? 'can-body-pro' : 'can-body-coffee'}`}>
        <span className="can-brand">MILO</span>
        <span className="can-variant" style={{ fontSize: isPro ? 14 : 11, color: isPro ? '#7FFFB0' : '#D4A554' }}>
          {isPro ? 'PRO' : 'COFFEE'}
        </span>
        <div className="can-stripe" style={{ background: isPro ? 'rgba(57,255,20,.7)' : 'rgba(255,180,50,.7)' }} />
      </div>
      <div className="can-bottom" />
    </div>
  )
}

export default function GuessScreen({ sip, selected, onSelect, onNext }: Props) {
  return (
    <div className="screen guess-screen">
      <div className="guess-top">
        <span className="badge">Vòng {sip} — Đoán sản phẩm</span>
        <h2 className="guess-title">Bạn vừa thử<br />sản phẩm nào?</h2>
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
              <span className={`product-name product-name-${type}`}>
                {type === 'pro' ? 'MILO PRO' : 'MILO COFFEE'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="guess-footer">
        {selected == null && <p className="guess-hint">Hãy chọn trước khi xem kết quả</p>}
        <div className="cta-img-wrap">
          <img
            className={`cta-img${!selected ? ' disabled' : ''}`}
            src={`${BASE}/cta-xemkq.png`}
            alt="Xem kết quả"
            onClick={selected ? onNext : undefined}
          />
        </div>
      </div>
    </div>
  )
}
