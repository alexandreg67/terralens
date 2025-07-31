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
			// Utiliser une approche plus élégante qu'alert
			console.warn('Vous pouvez sélectionner au maximum 3 pays.');
		}
	};

	return (
		<div>
			<div className="mb-4">
				<p className="text-sm text-base-content/70 mb-2">
					Sélectionnez jusqu&apos;à 3 pays pour la comparaison ({selectedCountries.length}/3)
				</p>
				{selectedCountries.length >= 3 && (
					<div className="alert alert-warning mb-4">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
							<span>Limite de 3 pays atteinte. Désélectionnez un pays pour en choisir un autre.</span>
						</div>
					</div>
				)}
			</div>
			
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{sortedCountries.map((country) => (
					<div key={country.code} className="form-control">
						<label className="label cursor-pointer justify-start gap-3">
							<input
								id={country.code}
								type="checkbox"
								checked={selectedCountries.includes(country.code)}
								onChange={() => handleCheckboxChange(country.code)}
								className="checkbox checkbox-primary"
								disabled={!selectedCountries.includes(country.code) && selectedCountries.length >= 3}
							/>
							<span className="label-text text-sm">{country.name}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default CountrySelector;
