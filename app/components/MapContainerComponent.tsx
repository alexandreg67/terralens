import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import WeatherStationMarker from './WeatherStationMarker';
import 'leaflet/dist/leaflet.css'; // Import du CSS ici

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
	onMoveEnd?: () => void;
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
				center={center}
				zoom={zoom}
				style={{ height: '80vh', width: '100%' }} // Ajout du style ici
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{stations.map((station, index) => (
					<WeatherStationMarker
						key={index}
						position={[station.lat, station.lon]}
						name={station.tags?.name}
					/>
				))}
			</MapContainer>
		</div>
	);
};

export default MapContainerComponent;
