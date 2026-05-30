const BASE = '/taptap-game/assets'

interface Props {
  sip: 1 | 2
  guess: 'pro' | 'coffee' | null
  onNext: () => void
}

const BG: Record<1 | 2, string> = {
  1: '[MILO] DigitalGameSampling-05..png',
  2: '[MILO] DigitalGameSampling-09.png',
}

export default function AnswerScreen({ sip, onNext }: Props) {
  return (
    <div className="screen answer-screen" onClick={onNext}>
      <img className="screen-bg" src={`${BASE}/${BG[sip]}`} alt="" aria-hidden />
    </div>
  )
}
