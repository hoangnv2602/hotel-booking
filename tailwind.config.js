/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app.config.ts',
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './app.vue',
        './composables/**/*.{js,ts,vue}',
        './plugins/**/*.{js,ts,vue}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                // primary: {
                //     DEFAULT: "#0D6EFD",
                //     foreground: "#FFFFFF"
                // },
                // secondary: {
                //     light: '#F0F1F3',
                //     dark: '#1E1E2C',
                //     foreground: {
                //         light: '#020817',
                //         dark: '#FAFAFB',
                //     },
                // },
                // accent: {
                //     light: '#6D7074',
                //     dark: '#6D7074',
                //     foreground: {
                //         light: '#020817',
                //         dark: '#FAFAFB',
                //     },
                // },
                // background: {
                //     light: '#FAFAFB',
                //     dark: '#020817',
                // },
                // foreground: {
                //     light: '#020817',
                //     dark: '#FAFAFB',
                // },
                // card: {
                //     light: '#FFFFFF',
                //     dark: '#121212',
                //     foreground: {
                //         light: '#020817',
                //         dark: '#FAFAFB',
                //     },
                // },
                // popover: {
                //     light: '#FFFFFF',
                //     dark: '#121212',
                //     foreground: {
                //         light: '#020817',
                //         dark: '#FAFAFB',
                //     },
                // },
                // muted: {
                //     light: '#F0F1F3',
                //     dark: '#1E1E2C',
                //     foreground: {
                //         light: '#6D7074',
                //         dark: '#6D7074',
                //     },
                // },
                // destructive: {
                //     DEFAULT: '#FF4C4C',
                //     foreground: '#FFFFFF',
                // },
                // border: {
                //     light: '#E0E0E0',
                //     dark: '#3C3C3C',
                // },
                // input: {
                //     light: '#E0E0E0',
                //     dark: '#3C3C3C',
                // },
                // ring: '#0D6EFD',
                // chart: {
                //     '1': '#FF6F61',
                //     '2': '#4CAF50',
                //     '3': '#03A9F4',
                //     '4': '#FFC107',
                //     '5': '#8E44AD',
                // },
            },
            borderRadius: {
                sm: '0.125rem',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                heading: '36px',
                body: '14px',
            },
            fontWeight: {
                heading: '700',
                body: '600',
            },
        },
    },
    darkMode: ['class', '[data-theme="dark"]'], // Supports both class and data-theme
    plugins: [],
};