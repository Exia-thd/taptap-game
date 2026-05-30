const BASE = '/taptap-game/assets'

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <img className="screen-bg" src={`${BASE}/BG1.png`} alt="" aria-hidden />
      <img className="landing-float landing-float-1" src={`${BASE}/HINH MILO.png`} alt="" aria-hidden draggable={false} />
      <img className="landing-float landing-float-2" src={`${BASE}/product 2.png`} alt="" aria-hidden draggable={false} />
      <div className="landing-cta-container">
        <img
          className="cta-img"
          src={`${BASE}/Asset 16 - cham tt.png`}
          alt="Chạm để tiếp tục"
          onClick={onNext}
        />
      </div>
    </div>
  )
}
