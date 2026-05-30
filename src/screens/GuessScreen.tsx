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
      <img className="screen-bg" src={`${BASE}/B4.png`} alt="" aria-hidden />

      <div className="guess-products-container">
        <div className="guess-product-item left" onClick={() => pick('pro')}>
          <img
            className="guess-product-img"
            src={`${BASE}/product 3.png`}
            alt="MILO PRO"
            draggable={false}
          />
        </div>
        <div className="guess-product-item right" onClick={() => pick('coffee')}>
          <img
            className="guess-product-img"
            src={`${BASE}/Artboard 4.png`}
            alt="MILO COFFEE"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
