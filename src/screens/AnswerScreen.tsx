const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const BG: Record<1 | 2, { correct: string; wrong: string }> = {
  1: { correct: 'B5.png', wrong: 'B5 1.png' },
  2: { correct: 'B9.png', wrong: 'B9 1.png' },
}

export default function AnswerScreen({ sip, guess, onNext }: Props) {
  const isCorrect = sip === 1 ? guess === 'pro' : guess === 'coffee'
  const bg = isCorrect ? BG[sip].correct : BG[sip].wrong

  return (
    <div className="screen answer-screen">
      <img className="screen-bg" src={`${BASE}/${bg}`} alt="" aria-hidden />

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
