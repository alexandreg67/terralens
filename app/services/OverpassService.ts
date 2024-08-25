// services/OverpassService.ts
export const fetchOverpassData = async (query: string) => {
	const url = 'https://overpass-api.de/api/interpreter';

	try {
		console.log('Sending Overpass API request with query:', query); // Log de la requête envoyée
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: query,
		});

		console.log('Raw response:', response); // Log de la réponse brute

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('Parsed JSON data:', data); // Log des données JSON analysées

		return data.elements || [];
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données Overpass :',
			error
		);
		return [];
	}
};
