import { GameData } from '../App'

// Sau khi deploy Cloudflare Worker, thay URL này bằng URL thật của Worker
const WORKER_URL = 'https://broad-frog-7880.thdat314.workers.dev'

export async function submitGameData(gameData: GameData): Promise<void> {
  const searchParams = new URLSearchParams(window.location.search)
  const zaloId =
    searchParams.get('zaloId') ||
    searchParams.get('zalo_id') ||
    searchParams.get('id') ||
    `guest_${Math.random().toString(36).slice(2, 10)}`

  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...gameData, zaloId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Worker error: ${(err as any).error || res.statusText}`)
  }
}
