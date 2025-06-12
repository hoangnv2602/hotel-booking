export default defineNuxtPlugin((nuxtApp) => {
    const toast = useToast()

    nuxtApp.provide(
        'showToast',
        (
            title: string,
            description = '',
            color: 'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' = 'success'
        ) => {
            toast.add({
                title,
                description,
                color,
            })
        }
    )
})