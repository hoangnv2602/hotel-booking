import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      const data = await $fetch('/api/users')
      users.value = data || []
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      loading.value = false
    }
  }

  const addUser = async (newUser: { id: number, name: string, price: number }) => {
    await $fetch('/api/users', {
      method: 'POST',
      body: newUser
    })
    // Optionally, you can still call fetchUsers() if you want to sync with the server
    await fetchUsers()
  }

  return {
    users,
    loading,
    fetchUsers,
    addUser
  }
})
