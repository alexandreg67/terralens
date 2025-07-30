// Types pour les données géospatiales

export interface Station {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    type?: string;
    operator?: string;
    'monitoring:air_quality'?: string;
    'monitoring:weather'?: string;
    [key: string]: string | undefined;
  };
}

export interface OverpassResponse {
  elements: Station[];
}

export interface CityCoordinates {
  lat: number;
  lon: number;
  display_name: string;
  boundingbox: [string, string, string, string];
}

export interface GeospatialBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}