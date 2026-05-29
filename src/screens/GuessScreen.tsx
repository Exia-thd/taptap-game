interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

const BASE = '/taptap-game/assets'

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
              <div className="product-photo-wrap">
                <img
                  className="product-photo"
                  src={`${BASE}/milo-${type}.png`}
                  alt={type === 'pro' ? 'MILO PRO' : 'MILO COFFEE'}
                  draggable={false}
                />
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
