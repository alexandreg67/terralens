// utils/deriveCondition.ts
export const deriveCondition = (
	temperature: number,
	humidity: number,
	windSpeed: number
): string => {
	if (temperature > 30 && humidity < 40) {
		return 'Clear';
	} else if (temperature > 30 && humidity > 60) {
		return 'Thunderstorm';
	} else if (humidity > 85 && temperature < 20 && windSpeed < 5) {
		return 'Fog';
	} else if (humidity > 70 && windSpeed > 15) {
		return 'Rain';
	} else if (windSpeed > 20) {
		return 'Windy';
	} else if (humidity > 70 && temperature > 20 && windSpeed < 10) {
		return 'Partly Cloudy';
	} else if (temperature < 0) {
		return 'Snow';
	} else {
		return 'Cloudy';
	}
};
