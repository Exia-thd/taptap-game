const BASE = '/taptap-game/assets'

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <div className="landing-top">
        <h1 className="landing-match">MATCH</h1>
        <h1 className="landing-energy">THE ENERGY</h1>
        <p className="landing-sub">2 vòng · 2 ngụm · Đoán đúng sản phẩm</p>
      </div>

      <div className="landing-cans">
        <img className="landing-can landing-can-pro" src={`${BASE}/milo-pro.png`} alt="MILO PRO" draggable={false} />
        <img className="landing-can landing-can-coffee" src={`${BASE}/milo-coffee.png`} alt="MILO COFFEE" draggable={false} />
      </div>

      <div className="landing-bottom">
        <div className="cta-img-wrap">
          <img className="cta-img" src={`${BASE}/cta-yellow.png`} alt="Chạm để tiếp tục" onClick={onNext} />
        </div>
        <p className="landing-tagline">MILO. Nạp năng lượng làm tới cùng</p>
      </div>
    </div>
  )
}
