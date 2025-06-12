export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie('auth_token')
  
  if (!user.value || user.value === 'null' || user.value === 'undefined') {
    return navigateTo('/login')
  }
})
