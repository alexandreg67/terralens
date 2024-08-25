import React, { useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { GeoJsonObject } from 'geojson'; // Import correct depuis @types/geojson

interface ClimateDataOverlayProps {
	map: L.Map | null;
}

interface CustomGeoJsonObject extends GeoJsonObject {
	features: any[]; // Replace 'any' with the type of your features
}

const ClimateDataOverlay: React.FC<ClimateDataOverlayProps> = ({ map }) => {
	useEffect(() => {
		if (map) {
			const fetchClimateData = async () => {
				try {
					const response = await axios.get(
						`https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&hourly=temperature_2m,precipitation`
					);

					const climateData = response.data.hourly;
					const coordinates = { lat: 48.8566, lon: 2.3522 }; // Exemple pour Paris

					const geoJsonData: CustomGeoJsonObject = {
						type: 'FeatureCollection',
						features: climateData.temperature_2m.map(
							(temp: number, index: number) => ({
								type: 'Feature',
								properties: {
									time: climateData.time[index],
									temperature: temp,
									precipitation: climateData.precipitation[index],
								},
								geometry: {
									type: 'Point',
									coordinates: [coordinates.lon, coordinates.lat],
								},
							})
						),
					};

					const climateLayer = L.geoJSON(geoJsonData, {
						onEachFeature: (feature, layer) => {
							if (feature.properties && feature.properties.time) {
								layer.bindPopup(
									`<strong>Time: ${feature.properties.time}</strong><br/>Temperature: ${feature.properties.temperature}°C<br/>Precipitation: ${feature.properties.precipitation}mm`
								);
							}
						},
						pointToLayer: (feature, latlng) => {
							return L.circleMarker(latlng, {
								radius: 8,
								fillColor: '#007cbf',
								color: '#007cbf',
								weight: 1,
								opacity: 1,
								fillOpacity: 0.8,
							});
						},
					}).addTo(map);

					// Nettoyage lorsque le composant est démonté
					return () => {
						map.removeLayer(climateLayer);
					};
				} catch (error) {
					console.error('Error fetching climate data:', error);
				}
			};

			fetchClimateData();
		}
	}, [map]);

	return null;
};

export default ClimateDataOverlay;
