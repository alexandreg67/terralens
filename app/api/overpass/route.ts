import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
	const { query } = await request.json();

	const url = 'https://overpass-api.de/api/interpreter';

	try {
		const response = await axios.post(url, query, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		return NextResponse.json({ data: response.data.elements });
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données Overpass :',
			error
		);
		return NextResponse.json(
			{ error: 'Erreur lors de la récupération des données' },
			{ status: 500 }
		);
	}
}
