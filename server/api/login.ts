import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { readBody } from 'h3'

type User = {
  id: number
  name: string
  email: string
  password: string
  price: number
}

type Data = {
  users: User[]
}

const file = join(process.cwd(), 'server/data/users.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { users: [] })

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  await db.read()
  db.data ||= { users: [] }

  const body = await readBody<{ email: string; password: string }>(event)

  const foundUser = db.data.users.find(
    (u) => u.email === body.email && u.password === body.password
  )

  if (!foundUser) {
    return createError({ statusCode: 401, statusMessage: 'Email or password is incorrect' })
  }

  const { password, ...safeUser } = foundUser
  return safeUser
})
