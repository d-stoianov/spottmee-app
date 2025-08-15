/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                base: '#0E0E10',
                primary: '#3F8CFF',
                primaryLight: '#E5F1FF',
                secondary: '#9CA3AF',
                accent: '#A855F7',
                lightGreen: '#93CE7E',
                softContrast: '#F4F4F5',
                highLight: '#C1FAF5',
            },
        },
    },
    plugins: [],
}
