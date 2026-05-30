const BASE = '/taptap-game/assets'

interface Props { onNext: () => void }

export default function LandingScreen({ onNext }: Props) {
  return (
    <div className="screen landing">
      <img className="landing-bg" src={`${BASE}/img-4-8.png`} alt="" aria-hidden />
      <div className="landing-footer">
        <div className="cta-img-wrap">
          <img className="cta-img" src={`${BASE}/cta-green.png`} alt="Chạm để tiếp tục" onClick={onNext} />
        </div>
      </div>
    </div>
  )
}
