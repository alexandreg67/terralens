import React from 'react';

interface CitySearchInputProps {
	query: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
	query,
	onChange,
}) => {
	return (
		<div className="w-full flex justify-center my-4">
			<input
				type="text"
				value={query}
				onChange={onChange}
				className="form-input w-full max-w-lg px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
				placeholder="Search for a city..."
			/>
		</div>
	);
};

export default CitySearchInput;
