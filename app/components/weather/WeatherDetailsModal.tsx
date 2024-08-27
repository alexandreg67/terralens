import React from 'react';
import WeatherModalContent from './WeatherModalContent'; // Assurez-vous que le chemin est correct
import { WeatherDataEntry } from '@/app/types/weatherTypes';

interface WeatherDetailsModalProps {
	date: string;
	data: WeatherDataEntry[];
	isOpen: boolean;
	onClose: () => void;
	city: {
		latitude: number;
		longitude: number;
	};
}

const WeatherDetailsModal: React.FC<WeatherDetailsModalProps> = ({
	date,
	data,
	isOpen,
	onClose,
	city,
}) => {
	if (!isOpen || !date || !data) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
				isOpen ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full max-h-full overflow-y-auto">
				<WeatherModalContent city={city} data={data} date={date} />
				<button
					onClick={onClose}
					className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default WeatherDetailsModal;
