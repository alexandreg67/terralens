import { NextResponse } from 'next/server';
import { fetchEconomicData } from '../../services/EconomicDataFetcher';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const countryCode = searchParams.get('countryCode') || '';
	const indicator = searchParams.get('indicator') || '';

	if (!countryCode || !indicator) {
		return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
	}

	try {
		const data = await fetchEconomicData(countryCode, indicator);
		return NextResponse.json(data);
	} catch (error) {
		console.error(`Error fetching data:`, error);
		return NextResponse.json(
			{ error: 'Failed to fetch data' },
			{ status: 500 }
		);
	}
}
