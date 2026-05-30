const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const BG: Record<1 | 2, string> = {
  1: 'B5.png',
  2: 'B9.png',
}

export default function AnswerScreen({ sip, onNext }: Props) {
  return (
    <div className="screen answer-screen">
      <img className="screen-bg" src={`${BASE}/${BG[sip]}`} alt="" aria-hidden />

      <div className="answer-cta-container">
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
