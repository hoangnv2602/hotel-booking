// composables/useRoom.ts
import { db } from '~/utils/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const useRoom = () => {
  const saveRooms = async (rooms: any[]) => {
    for (const room of rooms) {
      const ref = doc(db, 'rooms', `${room.id}`)
      await setDoc(ref, room)
    }
  }

  return {
    saveRooms,
  }
}
