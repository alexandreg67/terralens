import React from 'react';

interface WeatherDetailsModalProps {
	date: string | null;
	data:
		| {
				time: string;
				temperature: number;
				windSpeed: number;
				humidity: number;
		  }[]
		| null;
	isOpen: boolean;
	onClose: () => void;
}

const WeatherDetailsModal: React.FC<WeatherDetailsModalProps> = ({
	date,
	data,
	isOpen,
	onClose,
}) => {
	if (!isOpen || !date || !data) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
				isOpen ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full max-h-full overflow-y-auto">
				<h3 className="text-2xl font-semibold mb-4 text-center text-primary">
					{date}
				</h3>
				<div className="space-y-2">
					{data.map((temp, index) => (
						<div key={index} className="flex justify-between text-lg">
							<span>{temp.time}</span>
							<span>{temp.temperature}°C</span>
							<span>{temp.windSpeed} m/s</span>
							<span>{temp.humidity}%</span>
						</div>
					))}
				</div>
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
