export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie('auth_token')
  
  if (user.value) {
    return navigateTo('/dashboard')
  }
})
