const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

export default function GuessScreen({ onSelect, onNext }: Props) {
  const pick = (type: 'pro' | 'coffee') => {
    onSelect(type)
    onNext()
  }

  return (
    <div className="screen guess-screen">
      <img className="screen-bg" src={`${BASE}/4-8.png`} alt="" aria-hidden />
      <div className="guess-zones">
        <div className="guess-zone" onClick={() => pick('pro')} />
        <div className="guess-zone" onClick={() => pick('coffee')} />
      </div>
    </div>
  )
}
