import type { GameData } from '../App'

interface Props {
  data: GameData
  onExit: () => void
}

const BASE = '/taptap-game/assets'
const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = { 1: 'pro', 2: 'coffee' }

export default function ResultScreen({ data, onExit }: Props) {
  const sip1Correct = data.sip1Guess === ANSWERS[1]
  const sip2Correct = data.sip2Guess === ANSWERS[2]
  const score = (sip1Correct ? 1 : 0) + (sip2Correct ? 1 : 0)

  const TITLES: Record<number, string> = {
    2: 'PERFECT MATCH!',
    1: 'KHÔNG TỒI!',
    0: 'THỬ LẠI NHÉ!',
  }
  const SUBS: Record<number, string> = {
    2: 'Bạn có khứu giác vị giác tuyệt vời!',
    1: 'Bạn đã đúng một nửa rồi!',
    0: 'Cần luyện thêm rồi!',
  }

  return (
    <div className="screen result-screen">
      <img className="result-bg" src={`${BASE}/screen-10.png`} alt="" aria-hidden />

      <div className="result-overlay">
        <div className="result-score-badge">
          <span className="result-score-num">{score}/2</span>
        </div>
        <h2 className="result-title">{TITLES[score]}</h2>
        <p className="result-sub">{SUBS[score]}</p>

        <div className="result-rows">
          {([1, 2] as const).map(sip => {
            const correct = sip === 1 ? sip1Correct : sip2Correct
            const product = ANSWERS[sip] === 'pro' ? 'MILO PRO' : 'MILO COFFEE'
            return (
              <div key={sip} className="result-row">
                <span className="result-row-label">Vòng {sip} — {product}</span>
                <span className={`result-row-badge ${correct ? 'badge-correct' : 'badge-wrong'}`}>
                  {correct ? '✓ Đúng' : '✗ Sai'}
                </span>
              </div>
            )
          })}
        </div>

        <p className="result-thanks">Cảm ơn bạn đã tham gia Milo Pitching Game!</p>

        <button className="result-exit" onClick={onExit}>Chơi lại</button>
      </div>
    </div>
  )
}
