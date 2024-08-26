import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
	const { query } = await request.json();

	if (!query || typeof query !== 'string') {
		return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
	}

	console.log('Received query:', query);

	const url = 'https://overpass-api.de/api/interpreter';

	try {
		const response = await axios.post(url, query, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			timeout: 10000, // Timeout de 10 secondes
		});
		console.log('Overpass API response:', response.data);

		return NextResponse.json({
			count: response.data.elements.length,
			data: response.data.elements,
		});
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données Overpass :',
			(error as Error).message
		);
		return NextResponse.json(
			{ error: 'Erreur lors de la récupération des données' },
			{ status: 500 }
		);
	}
}
