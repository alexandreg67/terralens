import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

interface MapContainerComponentProps {
	center: [number, number];
	zoom: number;
	onMoveEnd: (bounds: LatLngBounds) => void;
	children?: React.ReactNode;
}

const MapEventHandler: React.FC<{
	onMoveEnd: (bounds: LatLngBounds) => void;
}> = ({ onMoveEnd }) => {
	const map = useMapEvents({});

	useEffect(() => {
		const bounds = map.getBounds();
		console.log('Map moved or zoomed, new bounds:', bounds);
		onMoveEnd(bounds);
	}, [map, onMoveEnd]);

	return null;
};

const MapContainerComponent: React.FC<MapContainerComponentProps> = ({
	center,
	zoom,
	onMoveEnd,
	children,
}) => {
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			style={{ height: '80vh', width: '100%' }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapEventHandler onMoveEnd={onMoveEnd} />
			{children}
		</MapContainer>
	);
};

export default MapContainerComponent;
