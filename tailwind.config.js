/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],

	theme: {
		// overwriting default mobile first approach to be desktop first:
		screens: {
			'2xl': { max: '1535px' },
			// => @media (max-width: 1535px) { ... }

			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '628px' },
			// => @media (max-width: 639px) { ... }
		},
		extend: {
			colors: {
				primary: '#0D1117',
				title: '#58A6F0',
				accent: '#F78166',
				text: '#8B949E',
				btnPrimary: '#21262D',
				btnHover: '#30363D',
				btnBorder: '#363B42',
				btnBorderHover: '#8B949E',
				btnText: '#C9D1D9',
				btnAccent: '#238636',
				btnAccentHover: '#2ea043',
				btnError: '#da3633',
				btnErrorText: '#f85149',
			},
		},
	},
	plugins: [],
};
