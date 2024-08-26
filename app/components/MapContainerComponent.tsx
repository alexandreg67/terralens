import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import du CSS ici
import { LatLngBounds } from 'leaflet';

import dynamic from 'next/dynamic';

// Import dynamique du composant WeatherStationMarker avec SSR désactivé
const WeatherStationMarker = dynamic(() => import('./WeatherStationMarker'), {
	ssr: false,
});

interface Station {
	lat: number;
	lon: number;
	tags?: {
		name?: string;
	};
}

interface MapContainerComponentProps {
	center: [number, number];
	zoom: number;
	onMoveEnd: (bounds: LatLngBounds) => void;
	children?: React.ReactNode;
}

const MapContainerComponent: React.FC<MapContainerComponentProps> = ({
	center,
	zoom,
	onMoveEnd,
}) => {
	const stations: Station[] = []; // Vous ajouterez vos stations ici

	return (
		<div className="p-4">
			<MapContainer
				center={[48.8566, 2.3522]}
				zoom={13}
				style={{ height: '100vh', width: '100%' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
			</MapContainer>
		</div>
	);
};

export default MapContainerComponent;
