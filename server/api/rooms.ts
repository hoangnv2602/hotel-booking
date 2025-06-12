import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { readBody, getQuery } from 'h3'

type Room = {
    id: number
    name: string
    price: number
}

type Data = {
    rooms: Room[]
}

const file = join(process.cwd(), 'server/data/rooms.json')
const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { rooms: [] })

export default defineEventHandler(async (event) => {
    await db.read()
    db.data ||= { rooms: [] }

    if (event.method === 'POST') {
        const body = await readBody<Room>(event)
        const newId = db.data.rooms.length
            ? Math.max(...db.data.rooms.map(u => u.id)) + 1
            : 1
        db.data.rooms.push({ ...body, id: newId })
        await db.write()
        return db.data.rooms
    }

    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const orderBy = (query.orderBy as keyof Room) || 'id'
    const order = (query.order as string) === 'desc' ? 'desc' : 'asc'
    const numberPersion = parseInt(query.numberPersion as string) || 0

    // Clone mảng để tránh đụng db.data.rooms
    let items = [...db.data.rooms]

    // Sort theo orderBy và order
    items.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1
        return 0
    })

    if (numberPersion > 0) {
        items = items.filter(room => room.number_persion >= numberPersion)
    }

    const total = items.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedRooms = items.slice(start, end)

    return {
        data: paginatedRooms,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    }
})
