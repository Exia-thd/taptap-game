import { GameData } from '../App'

const APP_ID = 'cli_aa93f2bb92399ed2'
const APP_SECRET = 'Ob4EPK86VHdrUNvOSPHnFd072gtTrVxg'
const APP_TOKEN = 'I1mXbR0gAaEnzksHRIBlWjuJglv'
const TABLE_ID = 'tbluyixDzd3ElT8A'

interface LarkTokenResponse {
  code: number
  msg: string
  tenant_access_token?: string
}

interface LarkAddRecordResponse {
  code: number
  msg: string
  data?: any
}

/**
 * Dynamically resolves the Lark API base URL to bypass CORS during local testing using the Vite dev proxy.
 */
function getLarkBaseUrl(): string {
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.')) {
    return '/lark-api'
  }
  return 'https://open.larksuite.com'
}

/**
 * Gets a fresh Lark tenant access token.
 */
async function getTenantAccessToken(): Promise<string> {
  console.log('Lark API: Fetching tenant access token...')
  const baseUrl = getLarkBaseUrl()
  const res = await fetch(`${baseUrl}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: APP_ID,
      app_secret: APP_SECRET,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch Lark token: ${res.statusText}`)
  }

  const data: LarkTokenResponse = await res.json()
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`Lark token error: ${data.msg || 'Unknown error'}`)
  }

  console.log('Lark API: Tenant access token retrieved successfully.')
  return data.tenant_access_token
}

/**
 * Submits the game results to Lark Suite Bitable.
 */
export async function submitGameData(gameData: GameData): Promise<void> {
  try {
    const token = await getTenantAccessToken()

    // Get Zalo ID from URL query parameters, fallback to a guest ID
    const searchParams = new URLSearchParams(window.location.search)
    const zaloId =
      searchParams.get('zaloId') ||
      searchParams.get('zalo_id') ||
      searchParams.get('id') ||
      `guest_${Math.random().toString(36).substring(2, 10)}`

    // Determine the result (Win if both are correct, else Lose)
    // Correct answers: SIP 1 = 'pro', SIP 2 = 'coffee'
    const isSip1Correct = gameData.sip1Guess === 'pro'
    const isSip2Correct = gameData.sip2Guess === 'coffee'
    const result = isSip1Correct && isSip2Correct ? 'win' : 'lose'

    // Format guesses
    const formatGuess = (g: 'pro' | 'coffee' | null) => {
      if (g === 'pro') return 'MILO PRO'
      if (g === 'coffee') return 'MILO COFFEE'
      return ''
    }

    // Build fields mapping matching Bitable fields schema
    const fields: Record<string, string> = {
      'Zalo ID': zaloId,
      
      // SIP 1 Survey selection (value 1 to value 6)
      'SIP 1-1': gameData.sip1Survey.includes(0) ? 'value 1' : '',
      'SIP 1-2': gameData.sip1Survey.includes(1) ? 'value 2' : '',
      'SIP 1-3': gameData.sip1Survey.includes(2) ? 'value 3' : '',
      'SIP 1-4': gameData.sip1Survey.includes(3) ? 'value 4' : '',
      'SIP 1-5': gameData.sip1Survey.includes(4) ? 'value 5' : '',
      'SIP 1-6': gameData.sip1Survey.includes(5) ? 'value 6' : '',

      // SIP 2 Survey selection (value 7 to value 12)
      'SIP 2-1': gameData.sip2Survey.includes(0) ? 'value 7' : '',
      'SIP 2-2': gameData.sip2Survey.includes(1) ? 'value 8' : '',
      'SIP 2-3': gameData.sip2Survey.includes(2) ? 'value 9' : '',
      'SIP 2-4': gameData.sip2Survey.includes(3) ? 'value 10' : '',
      'SIP 2-5': gameData.sip2Survey.includes(4) ? 'value 11' : '',
      'SIP 2-6': gameData.sip2Survey.includes(5) ? 'value 12' : '',

      // Guesses
      'SIP1 - GAME': formatGuess(gameData.sip1Guess),
      'SIP2 - GAME': formatGuess(gameData.sip2Guess),

      // Final Result
      'RESULT': result,
    }

    console.log('Lark API: Submitting record fields:', fields)

    const baseUrl = getLarkBaseUrl()
    const url = `${baseUrl}/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    })

    if (!res.ok) {
      throw new Error(`Failed to submit base record: ${res.statusText}`)
    }

    const data: LarkAddRecordResponse = await res.json()
    if (data.code !== 0) {
      throw new Error(`Lark submit error: ${data.msg || 'Unknown error'}`)
    }

    console.log('Lark API: Record submitted successfully!', data.data)
  } catch (error) {
    console.error('Lark API Error details:', error)
    throw error
  }
}
