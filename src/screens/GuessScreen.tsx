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
      <img className="guess-bg" src={`${BASE}/img-4-8.png`} alt="" aria-hidden />

      <div className="guess-header">
        <span className="badge">Vòng {sip} — Đoán sản phẩm</span>
      </div>

      <div className="guess-zones">
        {(['pro', 'coffee'] as const).map(type => (
          <div
            key={type}
            className={`guess-zone${selected === type ? ' selected' : ''}`}
            onClick={() => onSelect(type)}
          />
        ))}
      </div>

      <div className="guess-footer">
        {selected == null && <p className="guess-hint">Chạm vào sản phẩm bạn vừa thử</p>}
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
