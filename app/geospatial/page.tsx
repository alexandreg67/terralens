'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngBounds } from 'leaflet';
import { debounce } from 'lodash';
import 'leaflet/dist/leaflet.css';

const icon = new L.Icon({
	iconUrl: '/images/marker-icon.png',
	shadowUrl: '/images/marker-shadow.png',
	iconRetinaUrl: '/images/marker-icon-2x.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const GeospatialPage: React.FC = () => {
	const [stations, setStations] = useState<any[]>([]);
	const [mapZoom, setMapZoom] = useState(12);
	const [selectedFilter, setSelectedFilter] = useState<string>('monument');
	const mapRef = useRef<L.Map | null>(null);
	const activeRequestRef = useRef<AbortController | null>(null);

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
			}
		}
	};

	const handleBoundsChange = useCallback(
		debounce((bounds: LatLngBounds, zoom: number) => {
			setMapZoom(zoom);
			fetchStations(bounds);
		}, 500),
		[selectedFilter]
	);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFilter(event.target.value);
	};

	useEffect(() => {
		const map = mapRef.current;
		if (map && selectedFilter) {
			const onMoveEnd = () =>
				handleBoundsChange(map.getBounds(), map.getZoom());

			map.on('moveend', onMoveEnd);
			handleBoundsChange(map.getBounds(), map.getZoom()); // Fetch initial data

			return () => {
				map.off('moveend', onMoveEnd); // Nettoyer les écouteurs d'événements
			};
		}
	}, [mapRef, handleBoundsChange, selectedFilter]);

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
			<div className="mb-4 flex justify-center space-x-4">
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value="monument"
						checked={selectedFilter === 'monument'}
						onChange={handleFilterChange}
						className="form-radio text-primary"
					/>
					<span className="ml-2">Monuments</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value="museum"
						checked={selectedFilter === 'museum'}
						onChange={handleFilterChange}
						className="form-radio text-primary"
					/>
					<span className="ml-2">Museums</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value="park"
						checked={selectedFilter === 'park'}
						onChange={handleFilterChange}
						className="form-radio text-primary"
					/>
					<span className="ml-2">Parks</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value="viewpoint"
						checked={selectedFilter === 'viewpoint'}
						onChange={handleFilterChange}
						className="form-radio text-primary"
					/>
					<span className="ml-2">Viewpoints</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value="place_of_worship"
						checked={selectedFilter === 'place_of_worship'}
						onChange={handleFilterChange}
						className="form-radio text-primary"
					/>
					<span className="ml-2">Places of Worship</span>
				</label>
			</div>
			<MapContainer
				center={[48.8566, 2.3522]}
				zoom={12}
				style={{ height: '100vh', width: '100%' }}
				ref={mapRef}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{stations.map((station, index) => (
					<Marker key={index} position={[station.lat, station.lon]} icon={icon}>
						<Popup>
							<div>
								<strong>{station.tags?.name || 'Point of Interest'}</strong>
								{station.tags?.description && <p>{station.tags.description}</p>}
								{station.tags?.opening_hours && (
									<p>
										<strong>Hours:</strong> {station.tags.opening_hours}
									</p>
								)}
								{station.tags?.wikipedia && (
									<p>
										<a
											href={`https://en.wikipedia.org/wiki/${
												station.tags.wikipedia.split(':')[1]
											}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											Wikipedia
										</a>
									</p>
								)}
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default GeospatialPage;
