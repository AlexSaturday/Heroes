export default function handler(req: any, res: any) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }
  res.setHeader('Content-Type', 'application/json')
  return res.status(200).send(JSON.stringify({ ok: true }))
}


