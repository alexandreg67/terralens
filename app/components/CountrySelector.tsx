import React from 'react';

interface CountrySelectorProps {
	selectedCountry: string;
	onCountryChange: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
	selectedCountry,
	onCountryChange,
}) => {
	const countries = [
		{ code: 'US', name: 'United States' },
		{ code: 'FR', name: 'France' },
		{ code: 'DE', name: 'Germany' },
		{ code: 'JP', name: 'Japan' },
		{ code: 'GB', name: 'United Kingdom' },
		{ code: 'CN', name: 'China' },
		{ code: 'IN', name: 'India' },
		{ code: 'CA', name: 'Canada' },
		{ code: 'BR', name: 'Brazil' },
		{ code: 'AU', name: 'Australia' },
		{ code: 'RU', name: 'Russia' },
		{ code: 'ZA', name: 'South Africa' },
		{ code: 'IT', name: 'Italy' },
		{ code: 'ES', name: 'Spain' },
		{ code: 'MX', name: 'Mexico' },
		{ code: 'KR', name: 'South Korea' },
		{ code: 'ID', name: 'Indonesia' },
		{ code: 'NG', name: 'Nigeria' },
		{ code: 'AR', name: 'Argentina' },
		{ code: 'SA', name: 'Saudi Arabia' },
	];

	return (
		<div className="mb-4">
			<label
				htmlFor="country-select"
				className="block text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				Select a Country
			</label>
			<select
				id="country-select"
				value={selectedCountry}
				onChange={(e) => onCountryChange(e.target.value)}
				className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
			>
				{countries.map((country) => (
					<option key={country.code} value={country.code}>
						{country.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default CountrySelector;