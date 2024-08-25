'use client';

import React, { useState } from 'react';
import { LatLngBounds } from 'leaflet';
import MapContainerComponent from '../components/MapContainerComponent';
import WeatherStationMarker from '../components/WeatherStationMarker';
import { fetchOverpassData } from '../services/OverpassService';
import { generateOverpassQuery } from '../utils/generateOverpassQuery';

const GeospatialPage: React.FC = () => {
	const [stations, setStations] = useState<any[]>([]);

	const fetchStations = async (bounds: LatLngBounds) => {
		const query = generateOverpassQuery(bounds);
		console.log('Fetching stations with query:', query);
		const data = await fetchOverpassData(query);
		console.log('Stations data set:', data);
		setStations(data);
	};

	const handleMapMove = (bounds: LatLngBounds) => {
		fetchStations(bounds);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold text-center mb-4">
				Données Géospatiales
			</h1>
			<MapContainerComponent
				center={[48.8566, 2.3522]}
				zoom={12}
				onMoveEnd={() => {}}
			/>
		</div>
	);
};

export default GeospatialPage;
