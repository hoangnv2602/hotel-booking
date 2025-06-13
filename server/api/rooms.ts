import { readBody, getQuery } from 'h3'
import { collection, getDocs, addDoc, query, orderBy as fbOrderBy } from 'firebase/firestore'
import { db } from '@/utils/firebase'

type Room = {
  id: number
  name: string
  price: number
  number_persion?: number
}

export default defineEventHandler(async (event) => {
  const roomsRef = collection(db, 'rooms')

  if (event.method === 'POST') {
    const body = await readBody<Omit<Room, 'id'>>(event)

    // Tìm id lớn nhất hiện tại (chậm nếu nhiều record)
    const snapshot = await getDocs(roomsRef)
    const existingRooms: Room[] = []
    snapshot.forEach(doc => existingRooms.push({ id: Number(doc.id), ...doc.data() } as Room))
    const maxId = existingRooms.length ? Math.max(...existingRooms.map(r => r.id)) : 0

    const newRoom: Room = { ...body, id: maxId + 1 }
    await addDoc(roomsRef, newRoom)

    return { message: 'Room added', room: newRoom }
  }

  // GET rooms
  const queryParams = getQuery(event)
  const page = parseInt(queryParams.page as string) || 1
  const limit = parseInt(queryParams.limit as string) || 10
  const orderBy = (queryParams.orderBy as keyof Room) || 'id'
  const order = (queryParams.order as string) === 'desc' ? 'desc' : 'asc'
  const numberPersion = parseInt(queryParams.numberPersion as string) || 0

  const snapshot = await getDocs(roomsRef)
  let rooms: Room[] = []
  snapshot.forEach(doc => {
    const data = doc.data() as Room
    rooms.push({ ...data })
  })

  // Sort
  rooms.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1
    return 0
  })

  if (numberPersion > 0) {
    rooms = rooms.filter(r => (r.number_persion || 0) >= numberPersion)
  }

  const total = rooms.length
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedRooms = rooms.slice(start, end)

  return {
    data: paginatedRooms,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }
})
