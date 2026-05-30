import { useState } from 'react'
import LandingScreen from './screens/LandingScreen'
import CupScreen from './screens/CupScreen'
import SurveyScreen from './screens/SurveyScreen'
import GuessScreen from './screens/GuessScreen'
import AnswerScreen from './screens/AnswerScreen'
import ResultScreen from './screens/ResultScreen'

type Screen =
  | 'landing'
  | 'cup-1' | 'survey-1' | 'guess-1' | 'answer-1'
  | 'cup-2' | 'survey-2' | 'guess-2' | 'answer-2'
  | 'result'

export interface GameData {
  sip1Survey: number[]
  sip1Guess: 'pro' | 'coffee' | null
  sip2Survey: number[]
  sip2Guess: 'pro' | 'coffee' | null
}

const FLOW: Screen[] = [
  'landing',
  'cup-1', 'survey-1', 'guess-1', 'answer-1',
  'cup-2', 'survey-2', 'guess-2', 'answer-2',
  'result',
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [data, setData] = useState<GameData>({
    sip1Survey: [],
    sip1Guess: null,
    sip2Survey: [],
    sip2Guess: null,
  })

  const next = () => {
    const idx = FLOW.indexOf(screen)
    if (idx < FLOW.length - 1) setScreen(FLOW[idx + 1])
  }

  const patch = (u: Partial<GameData>) => setData(d => ({ ...d, ...u }))

  return (
    <div className="game">
      {screen === 'landing'  && <LandingScreen onNext={next} />}

      {screen === 'cup-1'    && <CupScreen sip={1} onNext={next} />}
      {screen === 'survey-1' && (
        <SurveyScreen sip={1} selected={data.sip1Survey}
          onSelect={v => patch({ sip1Survey: v })} onNext={next} />
      )}
      {screen === 'guess-1'  && (
        <GuessScreen sip={1} selected={data.sip1Guess}
          onSelect={v => patch({ sip1Guess: v })} onNext={next} />
      )}
      {screen === 'answer-1' && <AnswerScreen sip={1} guess={data.sip1Guess} onNext={next} />}

      {screen === 'cup-2'    && <CupScreen sip={2} onNext={next} />}
      {screen === 'survey-2' && (
        <SurveyScreen sip={2} selected={data.sip2Survey}
          onSelect={v => patch({ sip2Survey: v })} onNext={next} />
      )}
      {screen === 'guess-2'  && (
        <GuessScreen sip={2} selected={data.sip2Guess}
          onSelect={v => patch({ sip2Guess: v })} onNext={next} />
      )}
      {screen === 'answer-2' && <AnswerScreen sip={2} guess={data.sip2Guess} onNext={next} />}

      {screen === 'result'   && <ResultScreen onExit={() => { setData({ sip1Survey: [], sip1Guess: null, sip2Survey: [], sip2Guess: null }); setScreen('landing') }} />}

    </div>
  )
}
