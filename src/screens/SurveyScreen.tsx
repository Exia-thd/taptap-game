const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  selected: number[]
  onSelect: (v: number[]) => void
  onNext: () => void
}

const BG: Record<1 | 2, string> = {
  1: '[MILO] DigitalGameSampling-03.png',
  2: '[MILO] DigitalGameSampling-07.png',
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
      <img className="screen-bg" src={`${BASE}/${BG[sip]}`} alt="" aria-hidden />

      {/* Transparent hit zones — positioned to cover the 6 boxes in the background */}
      <div className="survey-grid-overlay">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`survey-hit${selected.includes(i) ? ' selected' : ''}`}
            onClick={() => toggle(i)}
          />
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
