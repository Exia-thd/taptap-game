interface Props { sip: 1 | 2; onNext: () => void }

const BASE = '/taptap-game/assets'

export default function CupScreen({ sip, onNext }: Props) {
  return (
    <div className="screen cup-screen">
      <div className="cup-screen-top">
        <span className="badge">SIP {sip}</span>
        <h2 className="cup-headline">MATCH<br />THE ENERGY</h2>
      </div>

      <div className="cup-arena">
        <div className="energy-rays">
          {Array.from({ length: 8 }, (_, i) => <div key={i} className="energy-ray" />)}
        </div>
        <div className="particles">
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="particle" />)}
        </div>
        <div className="cup-wrap">
          <img className="cup-img" src={`${BASE}/cup.png`} alt="Milo cup" />
        </div>
      </div>

      <div className="cta-img-wrap">
        <img
          className="cta-img"
          src={`${BASE}/cta-yellow.png`}
          alt="Chạm để tiếp tục"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
