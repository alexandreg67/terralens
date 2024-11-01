import React from 'react';
import { Country } from '../../types/economicTypes';

interface CountrySelectorProps {
	selectedCountries: string[]; // Tableau des pays sélectionnés
	onCountryChange: (countryCodes: string[]) => void;
	countries?: Country[]; // Utilisation de l'interface `Country`
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
	selectedCountries,
	onCountryChange,
	countries = [
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
	],
}) => {
	const sortedCountries = countries.sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	const handleCheckboxChange = (countryCode: string) => {
		let updatedSelection;
		if (selectedCountries.includes(countryCode)) {
			// Retirer le pays s'il est déjà sélectionné
			updatedSelection = selectedCountries.filter(
				(country) => country !== countryCode
			);
		} else {
			// Ajouter le pays s'il n'est pas encore sélectionné
			updatedSelection = [...selectedCountries, countryCode];
		}

		if (updatedSelection.length <= 3) {
			onCountryChange(updatedSelection);
		} else {
			alert('You can only select up to 3 countries.');
		}
	};

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Select Countries
				<div className="grid grid-cols-2 gap-2">
					{sortedCountries.map((country) => (
						<label key={country.code} className="flex items-center text-sm">
							<input
								id={country.code}
								type="checkbox"
								checked={selectedCountries.includes(country.code)}
								onChange={() => handleCheckboxChange(country.code)}
								className="mr-2"
							/>
							{country.name}
						</label>
					))}
				</div>
			</label>
		</div>
	);
};

export default CountrySelector;
