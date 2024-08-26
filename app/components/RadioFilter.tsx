import React from 'react';

interface RadioFilterProps {
	selectedFilter: string;
	onChange: (value: string) => void;
}

const RadioFilter: React.FC<RadioFilterProps> = ({
	selectedFilter,
	onChange,
}) => {
	const filters = [
		{ label: 'Monuments', value: 'monument' },
		{ label: 'Museums', value: 'museum' },
		{ label: 'Parks', value: 'park' },
		{ label: 'Viewpoints', value: 'viewpoint' },
		{ label: 'Places of Worship', value: 'place_of_worship' },
	];

	return (
		<div className="mb-4 flex justify-center space-x-4">
			{filters.map((filter) => (
				<label key={filter.value} className="inline-flex items-center">
					<input
						type="radio"
						name="filter"
						value={filter.value}
						checked={selectedFilter === filter.value}
						onChange={(e) => onChange(e.target.value)}
						className="form-radio text-primary"
					/>
					<span className="ml-2">{filter.label}</span>
				</label>
			))}
		</div>
	);
};

export default RadioFilter;
