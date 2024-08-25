import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap: React.FC = () => {
	useEffect(() => {
		const map = L.map('map').setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		return () => {
			map.remove();
		};
	}, []);

	return (
		<div
			id="map"
			className="w-full md:w-3/4 lg:w-1/2 mx-auto"
			style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}
		></div>
	);
};

export default LeafletMap;
