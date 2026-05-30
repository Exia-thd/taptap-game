import { useState } from 'react'

const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  selected: 'pro' | 'coffee' | null
  onSelect: (v: 'pro' | 'coffee') => void
  onNext: () => void
}

export default function GuessScreen({ onSelect, onNext }: Props) {
  const [picked, setPicked] = useState<'pro' | 'coffee' | null>(null)

  const pick = (type: 'pro' | 'coffee') => {
    if (picked) return
    setPicked(type)
    onSelect(type)
    setTimeout(() => onNext(), 800)
  }

  return (
    <div className="screen guess-screen">
      <img className="screen-bg" src={`${BASE}/B4.png`} alt="" aria-hidden />

      <div className="guess-products-container">
        <div
          className={`guess-product-item left${picked === 'pro' ? ' picked' : picked === 'coffee' ? ' faded' : ''}`}
          onClick={() => pick('pro')}
        >
          {picked === 'pro' && <><div className="impact-ring r1"/><div className="impact-ring r2"/><div className="impact-ring r3"/></>}
          <img className="guess-product-img" src={`${BASE}/product 3.png`} alt="MILO PRO" draggable={false} />
        </div>
        <div
          className={`guess-product-item right${picked === 'coffee' ? ' picked' : picked === 'pro' ? ' faded' : ''}`}
          onClick={() => pick('coffee')}
        >
          {picked === 'coffee' && <><div className="impact-ring r1"/><div className="impact-ring r2"/><div className="impact-ring r3"/></>}
          <img className="guess-product-img" src={`${BASE}/Artboard 4.png`} alt="MILO COFFEE" draggable={false} />
        </div>
      </div>
    </div>
  )
}
