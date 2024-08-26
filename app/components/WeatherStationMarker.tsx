import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';

// Configuration des icônes par défaut de Leaflet pour qu'elles fonctionnent avec React
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
	iconUrl: require('leaflet/dist/images/marker-icon.png').default,
	shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

interface WeatherStationMarkerProps {
	position: [number, number];
	name?: string;
}

const WeatherStationMarker: React.FC<WeatherStationMarkerProps> = ({
	position,
	name,
}) => {
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
