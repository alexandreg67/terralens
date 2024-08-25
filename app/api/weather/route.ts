import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const lat = searchParams.get('lat') || '33.44';
	const lon = searchParams.get('lon') || '-94.04';

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
		);
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch weather data' },
			{ status: 500 }
		);
	}
}
