import { LatLngBounds } from 'leaflet';

export const generateOverpassQuery = (bounds: LatLngBounds): string => {
	const southWest = bounds.getSouthWest();
	const northEast = bounds.getNorthEast();

	// Création de la bounding box avec les coordonnées
	const bbox = `${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng}`;

	// Construction de la requête Overpass pour récupérer les stations météorologiques
	return `
    [out:json];
    node["amenity"="weather_station"](${bbox});
    out body;
    >;
    out skel qt;
  `;
};
