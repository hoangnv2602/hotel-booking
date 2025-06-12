import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { readBody } from 'h3'

type User = {
  id: number
  name: string
  price: number
}

type Data = {
  users: User[]
}

const file = join(process.cwd(), 'server/data/users.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { users: [] })

export default defineEventHandler(async (event) => {
  await db.read()
  db.data ||= { users: [] }

  if (event.method === 'POST') {
    const body = await readBody<User>(event)
    const newId = db.data.users.length
      ? Math.max(...db.data.users.map(u => u.id)) + 1
      : 1
    db.data.users.push({ ...body, id: newId })
    await db.write()
    return db.data.users
  }

  return db.data.users
})
