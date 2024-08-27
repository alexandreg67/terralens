// components/RadioFilter.tsx
import React from 'react';

interface RadioFilterProps {
	selectedFilter: string;
	onChange: (value: string) => void;
}

const RadioFilter: React.FC<RadioFilterProps> = ({
	selectedFilter,
	onChange,
}) => {
	const options = [
		{ label: 'Monuments', value: 'monument' },
		{ label: 'Museums', value: 'museum' },
		{ label: 'Parks', value: 'park' },
		{ label: 'Viewpoints', value: 'viewpoint' },
		{ label: 'Places of Worship', value: 'place_of_worship' },
	];

	return (
		<div className="flex justify-center space-x-4 my-8">
			{options.map((option) => (
				<label key={option.value} className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value={option.value}
						checked={selectedFilter === option.value}
						onChange={() => onChange(option.value)}
						className="form-radio text-primary focus:ring-primary"
					/>
					<span className="ml-2 text-gray-700">{option.label}</span>
				</label>
			))}
		</div>
	);
};

export default RadioFilter;
