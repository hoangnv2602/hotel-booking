<!-- layouts/default.vue -->
<template>
    <div>
        <div class="bg-white">
            <div class="container">
                <header class="navbar" :class="{ active: isMenuOpen }">
                    <div class="logo">
                        <NuxtLink @click="isMenuOpen = false" to="/">Logo MySite</NuxtLink>
                    </div>
                    <div class="hamburger" id="hamburger" @click="toggleMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                            <path
                                d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z">
                            </path>
                        </svg>
                    </div>
                    <nav class="nav-links">
                        <NuxtLink @click="isMenuOpen = false" to="/">Home</NuxtLink>
                        <NuxtLink @click="isMenuOpen = false" v-if="user" to="/dashboard">Dashboard</NuxtLink>
                    </nav>
                    <div class="auth-buttons" id="auth-buttons">
                        <NuxtLink @click="isMenuOpen = false" v-if="!user" to="/login">Login</NuxtLink>
                        <NuxtLink @click="isMenuOpen = false;logout()" v-else>Logout</NuxtLink>
                    </div>
                </header>
            </div>
        </div>
        <main class="p-4">
            <slot />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const user = useCookie('auth_token')

const logout = () => {
  const token = useCookie('auth_token')
  token.value = null

  if (process.client) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  return navigateTo('/login')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
