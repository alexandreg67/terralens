import { NextResponse } from 'next/server';
import { fetchEconomicData } from '../../services/EconomicDataFetcher';

// Remplacer sessionStorage par une solution adaptée pour le caching côté serveur si nécessaire
const cache: Record<string, any> = {};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const countryCode = searchParams.get('countryCode') || '';
	const indicator = searchParams.get('indicator') || '';

	if (!countryCode || !indicator) {
		return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
	}

	const cacheKey = `${countryCode}_${indicator}`;
	const cachedData = cache[cacheKey];

	if (cachedData) {
		return NextResponse.json(cachedData);
	}

	try {
		const response = await fetch(
			`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
		);
		const data = await response.json();

		if (!data || !data[1]) {
			throw new Error('Invalid API response');
		}

		// Caching data in memory (temporary solution)
		cache[cacheKey] = data[1];

		return NextResponse.json(data[1]);
	} catch (error) {
		console.error(`Error fetching data for ${indicator}:`, error);
		return NextResponse.json(
			{ error: 'Failed to fetch data' },
			{ status: 500 }
		);
	}
}
