const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

export default function GuessScreen({ sip, selected, onSelect, onNext }: Props) {
  return (
    <div className="screen guess-screen">
      <img className="screen-bg" src={`${BASE}/4-8.png`} alt="" aria-hidden />

      <div className="guess-zones">
        {(['pro', 'coffee'] as const).map(type => (
          <div
            key={type}
            className={`guess-zone${selected === type ? ' selected' : ''}`}
            onClick={() => onSelect(type)}
          />
        ))}
      </div>

      <div className="guess-cta">
        <img
          className={`cta-img${!selected ? ' disabled' : ''}`}
          src={`${BASE}/Asset 17 - xem kq.png`}
          alt="Xem kết quả của bạn ngay"
          onClick={selected ? onNext : undefined}
        />
      </div>
    </div>
  )
}
