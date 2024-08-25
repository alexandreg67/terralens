module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#2C7A7B', // Bleu-vert pour les éléments principaux
				secondary: '#1A202C', // Gris foncé pour les éléments secondaires
				accent: '#E53E3E', // Rouge pour attirer l'attention sur les éléments importants
				background: '#F7FAFC', // Couleur de fond claire
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'], // Exemple de typographie
			},
		},
	},
	plugins: [
		require('daisyui'), // Ajoute DaisyUI comme plugin
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2C7A7B',
					secondary: '#1A202C',
					accent: '#E53E3E',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
		],
	},
};
