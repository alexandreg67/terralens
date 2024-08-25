import React from 'react';

const Map: React.FC = () => {
	// Simuler des coordonnées pour une localisation (Paris, par exemple)
	const mockViewport = {
		latitude: 48.8566,
		longitude: 2.3522,
		zoom: 10,
	};

	// Au lieu d'afficher une vraie carte, on peut afficher une image simulant la carte
	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				backgroundColor: '#e0e0e0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<p>Carte Mock - Paris</p>
			{/* Optionnel : Ajouter une image représentant la carte */}
			{/* <img src="/path-to-your-mock-map-image.jpg" alt="Mock Map" style={{ width: '100%', height: '100%' }} /> */}
		</div>
	);
};

export default Map;
