import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const lat = searchParams.get('lat') || '33.44';
	const lon = searchParams.get('lon') || '-94.04';

	try {
		// Utilisation de l'API Open-Meteo comme dans votre service
		const params = {
			latitude: lat,
			longitude: lon,
			hourly: 'temperature_2m,wind_speed_10m,relative_humidity_2m',
		};
		const url = 'https://api.open-meteo.com/v1/forecast';

		const response = await fetch(`${url}?${new URLSearchParams(params)}`);
		const data = await response.json();

		if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
			throw new Error('Missing or incorrect hourly data');
		}

		// Retourner les données telles quelles, ou les transformer si nécessaire
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch weather data' },
			{ status: 500 }
		);
	}
}
