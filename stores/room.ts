import { defineStore } from 'pinia'

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref([])
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const limit = ref(10)
  const totalPages = ref(1)
  const orderBy = ref('id')
  const order = ref<'asc' | 'desc'>('asc')
  const numberPersion = ref(1)
  
  const fetchRooms = async (numberPs = numberPersion.value, customPage = page.value, customLimit = limit.value) => {
    loading.value = true
    try {
      const res = await $fetch('/api/rooms', {
        params: {
          page: customPage,
          limit: customLimit,
          orderBy: orderBy.value,
          order: order.value,
          numberPersion: numberPs,
        },
      })
      if (Array.isArray(res)) {
        rooms.value = res
        total.value = res.length
        page.value = 1
        limit.value = res.length
        totalPages.value = 1
      } else {
        rooms.value = res.data || []
        total.value = res.total
        page.value = res.page
        limit.value = res.limit
        totalPages.value = res.totalPages
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    } finally {
      loading.value = false
    }
  }

  const setOrder = (field: string) => {
    if (orderBy.value === field) {
      order.value = order.value === 'asc' ? 'desc' : 'asc'
    } else {
      orderBy.value = field
      order.value = 'asc'
    }
    fetchRooms()
  }

  return {
    rooms,
    loading,
    total,
    page,
    limit,
    totalPages,
    orderBy,
    order,
    numberPersion,
    fetchRooms,
    setOrder,
  }
})
