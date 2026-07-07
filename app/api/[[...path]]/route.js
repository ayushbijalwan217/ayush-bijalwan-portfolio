import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(process.env.DB_NAME || 'portfolio')
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db(process.env.DB_NAME || 'portfolio')
}

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return res
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export async function GET(request, { params }) {
  const p = (await params)?.path || []
  const route = p.join('/')
  try {
    if (route === '' || route === 'health') {
      return cors(NextResponse.json({ ok: true, message: 'Ayush Bijalwan Portfolio API' }))
    }
    if (route === 'contacts') {
      const db = await getDb()
      const list = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(50).toArray()
      return cors(NextResponse.json({ contacts: list.map(c => ({ ...c, _id: undefined })) }))
    }
    return cors(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (e) {
    return cors(NextResponse.json({ error: e.message }, { status: 500 }))
  }
}

export async function POST(request, { params }) {
  const p = (await params)?.path || []
  const route = p.join('/')
  try {
    const body = await request.json()
    if (route === 'contact') {
      const { name, email, phone, details, budget } = body
      if (!name || !email || !details) {
        return cors(NextResponse.json({ error: 'Name, email and details are required' }, { status: 400 }))
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name, email, phone: phone || '', details, budget: budget || '',
        createdAt: new Date().toISOString(),
      }
      await db.collection('contacts').insertOne(doc)
      return cors(NextResponse.json({ ok: true, id: doc.id }))
    }
    return cors(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (e) {
    return cors(NextResponse.json({ error: e.message }, { status: 500 }))
  }
}
