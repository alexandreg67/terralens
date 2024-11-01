import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface SetViewOnChangeProps {
	center: [number, number];
	zoom: number;
}

const SetViewOnChange: React.FC<SetViewOnChangeProps> = ({ center, zoom }) => {
	const map = useMap();

	useEffect(() => {
		map.setView(center, zoom);
	}, [center, zoom, map]);

	return null;
};

export default SetViewOnChange;
