import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapboxMap: React.FC = () => {
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [0, 0],
			zoom: 2,
		});

		return () => map.remove();
	}, []);

	return <div id="map" className="w-full h-full"></div>;
};

export default MapboxMap;
