/**
 * Cloudflare Worker — Lark Bitable proxy
 *
 * Environment variables to set in Cloudflare dashboard:
 *   LARK_APP_ID
 *   LARK_APP_SECRET
 *   LARK_APP_TOKEN
 *   LARK_TABLE_ID
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    try {
      const gameData = await request.json()

      // Step 1: Get tenant access token
      const tokenRes = await fetch(
        'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            app_id: env.LARK_APP_ID,
            app_secret: env.LARK_APP_SECRET,
          }),
        }
      )
      const tokenData = await tokenRes.json()
      if (tokenData.code !== 0 || !tokenData.tenant_access_token) {
        return json({ error: `Token error: ${tokenData.msg}` }, 500)
      }
      const token = tokenData.tenant_access_token

      // Step 2: Build record fields
      const isSip1Correct = gameData.sip1Guess === 'pro'
      const isSip2Correct = gameData.sip2Guess === 'coffee'
      const result = (isSip1Correct ? 1 : 0) + (isSip2Correct ? 1 : 0)

      const fields = {
        'Zalo ID': gameData.zaloId || `guest_${Math.random().toString(36).slice(2, 10)}`,
        'SIP 1-1': gameData.sip1Survey?.includes(0) ? 'value 1' : '',
        'SIP 1-2': gameData.sip1Survey?.includes(1) ? 'value 2' : '',
        'SIP 1-3': gameData.sip1Survey?.includes(2) ? 'value 3' : '',
        'SIP 1-4': gameData.sip1Survey?.includes(3) ? 'value 4' : '',
        'SIP 1-5': gameData.sip1Survey?.includes(4) ? 'value 5' : '',
        'SIP 1-6': gameData.sip1Survey?.includes(5) ? 'value 6' : '',
        'SIP 2-1': gameData.sip2Survey?.includes(0) ? 'value 7' : '',
        'SIP 2-2': gameData.sip2Survey?.includes(1) ? 'value 8' : '',
        'SIP 2-3': gameData.sip2Survey?.includes(2) ? 'value 9' : '',
        'SIP 2-4': gameData.sip2Survey?.includes(3) ? 'value 10' : '',
        'SIP 2-5': gameData.sip2Survey?.includes(4) ? 'value 11' : '',
        'SIP 2-6': gameData.sip2Survey?.includes(5) ? 'value 12' : '',
        'SIP1 - GAME': isSip1Correct ? '1' : '',
        'SIP2 - GAME': isSip2Correct ? '1' : '',
        'RESULT': String(result),
      }

      // Step 3: Submit record to Bitable
      const recordRes = await fetch(
        `https://open.larksuite.com/open-apis/bitable/v1/apps/${env.LARK_APP_TOKEN}/tables/${env.LARK_TABLE_ID}/records`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields }),
        }
      )
      const recordData = await recordRes.json()
      if (recordData.code !== 0) {
        return json({ error: `Record error: ${recordData.msg}` }, 500)
      }

      return json({ ok: true })
    } catch (err) {
      return json({ error: String(err) }, 500)
    }
  },
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}
