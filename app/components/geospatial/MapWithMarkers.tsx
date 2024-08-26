import React, { useEffect, useRef } from 'react';
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
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
	stations,
	mapZoom,
	onBoundsChange,
	center,
}) => {
	const mapRef = useRef<L.Map | null>(null);

	useEffect(() => {
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
		<MapContainer
			center={center}
			zoom={mapZoom}
			style={{ height: '100vh', width: '100%' }}
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
	);
};

export default MapWithMarkers;