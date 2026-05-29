interface Props {
  sip: 1 | 2
  selected: number[]
  onSelect: (v: number[]) => void
  onNext: () => void
}

const BASE = '/taptap-game/assets'

const BOXES: Record<1 | 2, string[]> = {
  1: ['s1-1','s1-2','s1-3','s1-4','s1-5','s1-6'],
  2: ['s2-1','s2-2','s2-3','s2-4','s2-5','s2-6'],
}

export default function SurveyScreen({ sip, selected, onSelect, onNext }: Props) {
  const boxes = BOXES[sip]

  const toggle = (idx: number) => {
    const next = selected.includes(idx)
      ? selected.filter(i => i !== idx)
      : [...selected, idx]
    onSelect(next)
  }

  return (
    <div className="screen survey-screen">
      <div className="survey-top">
        <span className="badge">Vòng {sip} — Khảo sát</span>
        <p className="survey-question"><>ĐÂU LÀ 'RIGHT MOMENT'<br />"CHO NGỤM NÀY"</></p>
        <p className="survey-hint">Bạn có thể chọn nhiều hơn 1 hoạt động</p>
      </div>

      <div className="survey-grid">
        {boxes.map((name, i) => {
          const isSelected = selected.includes(i)
          return (
            <button
              key={i}
              className={`survey-box${isSelected ? ' selected' : ''}`}
              onClick={() => toggle(i)}
            >
              <img src={`${BASE}/${name}.png`} alt={`option-${i+1}`} />
              {isSelected && <span className="survey-check">✓</span>}
            </button>
          )
        })}
      </div>

      <div className="survey-footer">
        <div className="cta-img-wrap">
          <img
            className={`cta-img${selected.length === 0 ? ' disabled' : ''}`}
            src={`${BASE}/cta-xemkq.png`}
            alt="Chạm để tiếp tục"
            onClick={selected.length > 0 ? onNext : undefined}
          />
        </div>
      </div>
    </div>
  )
}
