// components/WeatherStationMarker.tsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

interface WeatherStationMarkerProps {
	position: [number, number];
	name?: string;
}

const WeatherStationMarker: React.FC<WeatherStationMarkerProps> = ({
	position,
	name,
}) => {
	console.log('Rendering marker at position:', position, 'with name:', name); // Log pour chaque marqueur
	return (
		<Marker position={position}>
			<Popup>
				<div>
					<strong>Station Météo</strong>
					{name && <p>{name}</p>}
				</div>
			</Popup>
		</Marker>
	);
};

export default WeatherStationMarker;
