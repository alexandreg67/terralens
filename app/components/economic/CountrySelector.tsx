import React from 'react';
import { Country } from '../../types/economicTypes';

interface CountrySelectorProps {
	selectedCountries: string[]; // Array of selected countries
	onCountryChange: (countryCodes: string[]) => void;
	countries?: Country[]; // Using the `Country` interface
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
			// Remove country if already selected
			updatedSelection = selectedCountries.filter(
				(country) => country !== countryCode
			);
		} else {
			// Add country if not yet selected
			updatedSelection = [...selectedCountries, countryCode];
		}

		if (updatedSelection.length <= 3) {
			onCountryChange(updatedSelection);
		} else {
			// Limit reached - provide accessible feedback for screen readers
			const liveRegion = document.getElementById('country-limit-live-region');
			if (liveRegion) {
				liveRegion.textContent = '3 country limit reached. Deselect a country to choose another.';
				// Clear the message after 3 seconds
				setTimeout(() => {
					if (liveRegion) liveRegion.textContent = '';
				}, 3000);
			}
			return;
		}
	};

	return (
		<div>
			<div className="mb-4">
				<p className="text-sm text-base-content/70 mb-2">
					Select up to 3 countries for comparison ({selectedCountries.length}/3)
				</p>
				{selectedCountries.length >= 3 && (
					<div className="alert alert-warning mb-4">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
							<span>3 country limit reached. Deselect a country to choose another.</span>
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
			
			{/* Live region for screen reader accessibility */}
			<div 
				id="country-limit-live-region" 
				aria-live="polite" 
				aria-atomic="true"
				className="sr-only"
			></div>
		</div>
	);
};

export default CountrySelector;
