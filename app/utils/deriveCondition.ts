export const deriveCondition = (
	temperature: number,
	humidity: number,
	windSpeed: number
): string => {
	// Conditions d'interprétation des données météorologiques
	const isHot = temperature > 30;
	const isHumid = humidity > 60;
	const isDry = humidity < 40;
	const isCold = temperature < 0;
	const isWindy = windSpeed > 20;
	const isFoggy = humidity > 85 && temperature < 20 && windSpeed < 5;

	if (isHot && isDry) {
		return 'Clear';
	} else if (isHot && isHumid) {
		return 'Thunderstorm';
	} else if (isFoggy) {
		return 'Fog';
	} else if (humidity > 70 && windSpeed > 15) {
		return 'Rain';
	} else if (isWindy) {
		return 'Windy';
	} else if (humidity > 70 && temperature > 20 && windSpeed < 10) {
		return 'Partly Cloudy';
	} else if (isCold) {
		return 'Snow';
	} else {
		return 'Cloudy';
	}
};
