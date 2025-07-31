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
	// Close modal on Escape key press
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
		<div className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className="modal-box w-11/12 max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
				<div className="flex justify-between items-center mb-6">
					<h2 id="modal-title" className="text-2xl font-bold text-primary">
						Weather Details for {date}
					</h2>
					<button
						onClick={onClose}
						className="btn btn-sm btn-circle btn-ghost"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
				<WeatherModalContent city={city} data={data} date={date} />
				<div className="modal-action">
					<button onClick={onClose} className="btn btn-primary">
						Close
					</button>
				</div>
			</div>
			<div className="modal-backdrop" onClick={onClose}></div>
		</div>
	);
};

export default WeatherDetailsModal;
