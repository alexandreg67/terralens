export interface WeatherDataEntry {
	date: string; // Date du relevé météo, au format string
	hour: number; // Heure du relevé, au format number
	time: string; // Heure du relevé, au format string
	temperature: number; // Température en degrés Celsius
	windSpeed: number; // Vitesse du vent en m/s ou km/h
	humidity: number; // Humidité en pourcentage
	condition: string; // Condition météo, par exemple "Clear", "Rain", etc.
}
