import React, { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

const MapEventHandler = ({
	onBoundsChange,
}: {
	onBoundsChange: (bounds: LatLngBounds, zoom: number) => void;
}) => {
	const map = useMapEvents({
		moveend: () => {
			onBoundsChange(map.getBounds(), map.getZoom());
		},
		zoomend: () => {
			onBoundsChange(map.getBounds(), map.getZoom());
		},
	});

	useEffect(() => {
		// Appeler lors du montage pour récupérer les données initiales
		onBoundsChange(map.getBounds(), map.getZoom());
	}, [map]);

	return null;
};

export default MapEventHandler;
