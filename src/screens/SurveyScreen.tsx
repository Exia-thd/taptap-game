const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  selected: number[]
  onSelect: (v: number[]) => void
  onNext: () => void
}

const ASSETS: Record<1 | 2, string[]> = {
  1: ['Asset 3.png', 'Asset 4.png', 'Asset 5.png', 'Asset 6.png', 'Asset 7.png', 'Asset 8.png'],
  2: ['Asset 10.png', 'Asset 11.png', 'Asset 12.png', 'Asset 13.png', 'Asset 14.png', 'Asset 15.png'],
}

export default function SurveyScreen({ sip, selected, onSelect, onNext }: Props) {
  const toggle = (idx: number) => {
    const next = selected.includes(idx)
      ? selected.filter(i => i !== idx)
      : [...selected, idx]
    onSelect(next)
  }

  return (
    <div className="screen survey-screen">
      <div className="survey-grid-images">
        {ASSETS[sip].map((asset, i) => (
          <div
            key={i}
            className={`survey-img-item${selected.includes(i) ? ' selected' : ''}`}
            onClick={() => toggle(i)}
          >
            <img src={`${BASE}/${asset}`} alt="" aria-hidden draggable={false} />
          </div>
        ))}
      </div>

      <div className="survey-cta-overlay">
        <img
          className={`cta-img${selected.length === 0 ? ' disabled' : ''}`}
          src={`${BASE}/Asset 17 - xem kq.png`}
          alt="Xem kết quả của bạn ngay"
          onClick={selected.length > 0 ? onNext : undefined}
        />
      </div>
    </div>
  )
}
