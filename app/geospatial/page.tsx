'use client';

import React, { useState, useCallback } from 'react';
import { LatLngBounds } from 'leaflet';
import { debounce } from 'lodash';
import RadioFilter from '../components/RadioFilter';
import MapWithMarkers from '../components/MapWithMarkers';
import Spinner from '../components/Spinner';

const GeospatialPage: React.FC = () => {
	const [stations, setStations] = useState<any[]>([]);
	const [mapZoom, setMapZoom] = useState(12);
	const [selectedFilter, setSelectedFilter] = useState<string>('monument');
	const [loading, setLoading] = useState<boolean>(false);
	const activeRequestRef = React.useRef<AbortController | null>(null);

	const generateOverpassQuery = (bounds: LatLngBounds): string => {
		const southWest = bounds.getSouthWest();
		const northEast = bounds.getNorthEast();
		const bbox = `${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng}`;

		let query = '[out:json][timeout:25];(';

		if (selectedFilter === 'monument') {
			query += `node["historic"="monument"]["name"](${bbox});`;
		} else if (selectedFilter === 'museum') {
			query += `node["tourism"="museum"]["name"](${bbox});`;
		} else if (selectedFilter === 'park') {
			query += `node["leisure"="park"]["name"](${bbox});`;
		} else if (selectedFilter === 'viewpoint') {
			query += `node["tourism"="viewpoint"]["name"](${bbox});`;
		} else if (selectedFilter === 'place_of_worship') {
			query += `node["amenity"="place_of_worship"]["name"](${bbox});`;
		}

		query += ');out body;>;out skel qt;';
		return query;
	};

	const fetchStations = async (bounds: LatLngBounds) => {
		if (mapZoom >= 12) {
			const query = generateOverpassQuery(bounds);
			setLoading(true); // Début du chargement

			// Annuler la requête précédente si elle est encore en cours
			if (activeRequestRef.current) {
				activeRequestRef.current.abort();
			}

			const abortController = new AbortController();
			activeRequestRef.current = abortController;

			try {
				const response = await fetch('/api/overpass', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ query }),
					signal: abortController.signal,
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				if (result && result.data) {
					setStations(result.data);
				} else {
					console.warn('Aucune donnée trouvée');
					setStations([]); // Assurez-vous de vider l'état en cas d'absence de données
				}
			} catch (error) {
				if ((error as Error).name !== 'AbortError') {
					console.error(
						'Erreur lors de la récupération des données Overpass :',
						error
					);
					setStations([]); // Assurez-vous de vider l'état en cas d'erreur
				}
			} finally {
				setLoading(false); // Fin du chargement
			}
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleBoundsChange = useCallback(
		debounce((bounds: LatLngBounds, zoom: number) => {
			setMapZoom(zoom);
			fetchStations(bounds);
		}, 500),
		[selectedFilter]
	);

	return (
		<div className="container mx-auto p-6">
			<div className="text-center mb-6">
				<h1 className="text-4xl font-bold mb-2 text-primary">
					Geospatial Data Dashboard
				</h1>
				<p className="text-lg text-gray-700 dark:text-gray-300">
					Explore different types of geospatial data by selecting one category
					at a time.
				</p>
			</div>
			<RadioFilter
				selectedFilter={selectedFilter}
				onChange={setSelectedFilter}
			/>

			{loading ? (
				<Spinner />
			) : (
				<MapWithMarkers
					stations={stations}
					mapZoom={mapZoom}
					onBoundsChange={handleBoundsChange}
				/>
			)}
		</div>
	);
};

export default GeospatialPage;
