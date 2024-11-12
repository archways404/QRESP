/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}', // Adjust this path if needed
		'./public/index.html', // Include any HTML or template files
		'./src-tauri/**/*.{html,js}', // Include Tauri HTML and JS files
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
