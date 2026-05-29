import type { GameData } from '../App'

interface Props {
  data: GameData
  onExit: () => void
}

const PRODUCTS = {
  pro:    { icon: '💚', name: 'Milo Pro',    color: '#00D468' },
  coffee: { icon: '☕', name: 'Milo Coffee', color: '#D4860A' },
}

const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = { 1: 'pro', 2: 'coffee' }

const SCORE_MSG: Record<number, { emoji: string; msg: string }> = {
  0: { emoji: '😅', msg: 'Cần luyện thêm rồi!' },
  1: { emoji: '👍', msg: 'Không tệ chút nào!' },
  2: { emoji: '🏆', msg: 'Siêu cảm nhận! Xuất sắc!' },
}

export default function ResultScreen({ data, onExit }: Props) {
  const sip1Correct = data.sip1Guess === ANSWERS[1]
  const sip2Correct = data.sip2Guess === ANSWERS[2]
  const score = (sip1Correct ? 1 : 0) + (sip2Correct ? 1 : 0)
  const { emoji, msg } = SCORE_MSG[score]

  const rows = [
    { sip: 1 as const, correct: sip1Correct },
    { sip: 2 as const, correct: sip2Correct },
  ]

  return (
    <div className="screen result-screen">
      <div className="result-top">
        <span className="badge">Kết quả cuối cùng</span>
        <h2 className="result-title">Điểm số của bạn</h2>
        <p className="result-sub">Cùng xem bạn đã đoán đúng chưa nhé!</p>
      </div>

      <div className="result-score-box">
        <span className="result-score-label">Tổng điểm</span>
        <span className="result-score-value">{emoji} {score}/2</span>
        <span className="result-score-sub">{msg}</span>
      </div>

      <div className="result-rows">
        {rows.map(({ sip, correct }) => {
          const answer = ANSWERS[sip]
          const meta = PRODUCTS[answer]
          return (
            <div key={sip} className="result-row">
              <span className="result-row-icon">{meta.icon}</span>
              <div className="result-row-info">
                <span className="result-row-label">Vòng {sip}</span>
                <span className="result-row-name" style={{ color: meta.color }}>
                  {meta.name}
                </span>
              </div>
              <span className={`result-row-badge ${correct ? 'badge-correct' : 'badge-wrong'}`}>
                {correct ? '✓ Đúng' : '✗ Sai'}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{
        width: '100%',
        padding: '18px 20px',
        background: score === 2
          ? 'linear-gradient(135deg, rgba(0,166,81,0.15), rgba(0,212,104,0.08))'
          : score === 1
          ? 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,180,0,0.06))'
          : 'rgba(255,255,255,0.05)',
        border: `1px solid ${score === 2 ? 'rgba(0,212,104,0.3)' : score === 1 ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 16,
        textAlign: 'center' as const,
        zIndex: 1,
      }}>
        <p style={{ fontSize: 22, marginBottom: 6 }}>
          {score === 2 ? '🎉' : score === 1 ? '🌟' : '💪'}
        </p>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
          {score === 2
            ? 'Bạn có khứu giác vị giác tuyệt vời!'
            : score === 1
            ? 'Bạn đã đúng một nửa rồi!'
            : 'Hãy thử lại lần sau nhé!'}
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          Cảm ơn bạn đã tham gia Milo Pitching Game!
        </p>
      </div>

      <button className="result-exit" onClick={onExit}>
        Thoát game
      </button>
    </div>
  )
}
