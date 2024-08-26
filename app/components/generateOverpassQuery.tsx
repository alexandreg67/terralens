import { LatLngBounds } from 'leaflet';

export const generateOverpassQuery = (
	bounds: LatLngBounds,
	types: { key: string; value: string }[]
): string => {
	const southWest = bounds.getSouthWest();
	const northEast = bounds.getNorthEast();

	const bbox = `${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng}`;

	// Construction dynamique de la requête en fonction des types passés
	const queryParts = types.map(
		(type) => `node["${type.key}"="${type.value}"](${bbox});`
	);

	return `
  [out:json];
  (
    ${queryParts.join('\n')}
  );
  out body;
  >;
  out skel qt;
  `;
};
