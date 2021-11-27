module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                red: {
                    DEFAULT: '#2FF5C7',
                },
                gray: {
                    100: '#F1F3F4',
                    150: '#EEEEEE',
                    200: '#666A6E',
                    300: '#3C4042',
                    400: '#3C4042',
                    500: '#202124'
                },
                blue: {
                    light: '#008fd6',
                    DEFAULT: '#004466',
                    dark: '#003B66',
                },
            }
        }        
    },
    variants: {
        extend: {},
    },
    plugins: [],
};