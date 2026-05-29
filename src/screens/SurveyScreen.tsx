interface Props {
  sip: 1 | 2
  selected: number[]
  onSelect: (v: number[]) => void
  onNext: () => void
}

const OPTIONS_SIP1 = [
  { icon: '💪', label: 'Vị đậm đà' },
  { icon: '🍫', label: 'Hương cacao' },
  { icon: '🌊', label: 'Cảm giác mịn' },
  { icon: '⚡', label: 'Nhiều năng lượng' },
  { icon: '🍬', label: 'Vị ngọt vừa' },
  { icon: '✨', label: 'Hậu vị thơm' },
]

const OPTIONS_SIP2 = [
  { icon: '☕', label: 'Hương cà phê' },
  { icon: '🍫', label: 'Vị cacao đậm' },
  { icon: '⚡', label: 'Tỉnh táo, sảng khoái' },
  { icon: '🌊', label: 'Độ mịn cao' },
  { icon: '🍬', label: 'Vị đắng nhẹ' },
  { icon: '💫', label: 'Hậu vị kéo dài' },
]

export default function SurveyScreen({ sip, selected, onSelect, onNext }: Props) {
  const options = sip === 1 ? OPTIONS_SIP1 : OPTIONS_SIP2

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
        <h2 className="survey-title">Bạn cảm nhận gì? 🤔</h2>
        <p className="survey-sub">Chọn một hoặc nhiều cảm nhận</p>
        <div className="divider" />
      </div>

      <div className="survey-grid">
        {options.map((opt, i) => {
          const isSelected = selected.includes(i)
          return (
            <button
              key={i}
              className={`survey-box${isSelected ? ' selected' : ''}`}
              onClick={() => toggle(i)}
            >
              {isSelected && <span className="selected-check">✓</span>}
              <span className="survey-box-icon">{opt.icon}</span>
              <span className="survey-box-label">{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="survey-footer">
        <p className="survey-count">
          Đã chọn: <span>{selected.length}</span> / {options.length}
        </p>
        <button
          className="cta"
          onClick={onNext}
          disabled={selected.length === 0}
        >
          Tiếp theo →
        </button>
      </div>
    </div>
  )
}
