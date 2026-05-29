import type { GameData } from '../App'

interface Props {
  data: GameData
  onExit: () => void
}

/* Minimal fake QR grid pattern */
const QR_PATTERN = [
  [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,1,0],
  [0,1,1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,1,1,0,1],
  [1,0,0,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,0,0],
  [0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
  [1,1,0,1,0,1,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0],
  [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,1,0,1,1,0],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1,0,0,1,0],
  [1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,0,1,0,0],
  [1,0,1,1,1,0,1,0,0,0,0,1,1,0,1,0,1,1,0,1,0],
  [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,0,1,1,0,1],
]

function QRCode() {
  const cells = QR_PATTERN.flat()
  return (
    <div className="qr-box">
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(21, 1fr)`,
        gridTemplateRows: `repeat(21, 1fr)`,
        gap: 1.2,
        width: '100%',
        height: '100%',
      }}>
        {cells.map((v, i) => (
          <div key={i} style={{
            borderRadius: 1,
            background: v ? '#111' : '#fff',
          }} />
        ))}
      </div>
    </div>
  )
}

const PRODUCTS = {
  pro:    { icon: '💚', name: 'Milo Pro',    color: 'var(--green-light)' },
  coffee: { icon: '☕', name: 'Milo Coffee', color: '#D4860A' },
}

const ANSWERS: Record<1 | 2, 'pro' | 'coffee'> = { 1: 'pro', 2: 'coffee' }

const SCORE_TEXT: Record<number, { emoji: string; msg: string }> = {
  0: { emoji: '😅', msg: 'Cần luyện thêm rồi!' },
  1: { emoji: '👍', msg: 'Không tệ chút nào!' },
  2: { emoji: '🏆', msg: 'Siêu cảm nhận! Xuất sắc!' },
}

export default function ResultScreen({ data, onExit }: Props) {
  const sip1Correct = data.sip1Guess === ANSWERS[1]
  const sip2Correct = data.sip2Guess === ANSWERS[2]
  const score = (sip1Correct ? 1 : 0) + (sip2Correct ? 1 : 0)
  const { emoji, msg } = SCORE_TEXT[score]

  const rows = [
    { sip: 1 as const, guess: data.sip1Guess, correct: sip1Correct },
    { sip: 2 as const, guess: data.sip2Guess, correct: sip2Correct },
  ]

  return (
    <div className="screen result-screen">
      <div className="result-top">
        <span className="badge">Kết quả cuối cùng</span>
        <h2 className="result-title">Điểm số của bạn</h2>
        <p className="result-summary">Cùng xem bạn đã đoán đúng chưa nhé!</p>
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
              <span className={`result-row-badge ${correct ? 'result-badge-correct' : 'result-badge-wrong'}`}>
                {correct ? '✓ Đúng' : '✗ Sai'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="qr-section">
        <span className="qr-label">Mã QR của bạn — PG quét để xác nhận</span>
        <QRCode />
        <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
          Mã QR được tạo từ Zalo Mini App
        </p>
      </div>

      <button className="result-exit" onClick={onExit}>
        Thoát game
      </button>
    </div>
  )
}
