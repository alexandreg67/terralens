import { Popup } from 'react-leaflet';
import React from 'react';

interface StationPopupProps {
	station: any;
}

const StationPopup: React.FC<StationPopupProps> = ({ station }) => {
	return (
		<Popup>
			<div>
				<strong>{station.tags?.name || 'Point of Interest'}</strong>
				{station.tags?.description && <p>{station.tags.description}</p>}
				{station.tags?.opening_hours && (
					<p>
						<strong>Hours:</strong> {station.tags.opening_hours}
					</p>
				)}
				{station.tags?.wikipedia && (
					<p>
						<a
							href={`https://en.wikipedia.org/wiki/${
								station.tags.wikipedia.split(':')[1]
							}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Wikipedia
						</a>
					</p>
				)}
			</div>
		</Popup>
	);
};

export default StationPopup;
