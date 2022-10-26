/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
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
			},
		},
	},
	plugins: [],
};
