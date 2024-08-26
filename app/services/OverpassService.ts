export const fetchOverpassData = async (query: string) => {
	const url = 'https://overpass-api.de/api/interpreter';
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 secondes

	try {
		console.log('Sending Overpass API request with query:', query);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: query,
			signal: controller.signal,
		});

		clearTimeout(timeoutId); // Si la requête a réussi, on nettoie le timeout

		console.log('Raw response:', response);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('Parsed JSON data:', data);

		return data.elements || [];
	} catch (error: unknown) {
		if ((error as Error).name === 'AbortError') {
			console.error('Request timed out');
		} else {
			console.error(
				'Erreur lors de la récupération des données Overpass :',
				error
			);
		}
		return [];
	}
};
