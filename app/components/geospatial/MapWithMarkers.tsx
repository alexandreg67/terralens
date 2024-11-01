// components/MapWithMarkers.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StationPopup from './StationPopup';
import SetViewOnChange from './SetViewOnChange';

interface MapWithMarkersProps {
	stations: any[];
	mapZoom: number;
	onBoundsChange: (bounds: LatLngBounds, zoom: number) => void;
	center: [number, number];
	cityName: string; // Nouveau prop pour le nom de la ville
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
	stations,
	mapZoom,
	onBoundsChange,
	center,
	cityName,
}) => {
	const mapRef = React.useRef<L.Map | null>(null);

	React.useEffect(() => {
		const map = mapRef.current;
		if (map) {
			const onMoveEnd = () => onBoundsChange(map.getBounds(), map.getZoom());
			map.on('moveend', onMoveEnd);
			return () => {
				map.off('moveend', onMoveEnd);
			};
		}
	}, [onBoundsChange]);

	return (
		<div className="relative">
			<h2 className="text-2xl font-bold text-center text-primary mb-4">
				{cityName}
			</h2>
			<MapContainer
				center={center}
				zoom={mapZoom}
				style={{ height: '500px', width: '100%' }}
				ref={mapRef}
			>
				<SetViewOnChange center={center} zoom={mapZoom} />
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{stations.map((station, index) => (
					<Marker
						key={index}
						position={[station.lat, station.lon]}
						icon={
							new L.Icon({
								iconUrl: '/images/marker-icon.png',
								shadowUrl: '/images/marker-shadow.png',
								iconRetinaUrl: '/images/marker-icon-2x.png',
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [1, -34],
								shadowSize: [41, 41],
							})
						}
					>
						<StationPopup station={station} />
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default MapWithMarkers;
