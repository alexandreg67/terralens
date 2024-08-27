import React, { useEffect } from 'react';
import WeatherModalContent from './WeatherModalContent';
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
	// Fermeture de la modal en appuyant sur la touche Échap
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
				isOpen ? 'opacity-100' : 'opacity-0'
			}`}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full max-h-full overflow-y-auto">
				<h2 id="modal-title" className="text-xl font-semibold mb-4">
					Weather Details for {date}
				</h2>
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
