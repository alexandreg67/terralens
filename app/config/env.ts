// Configuration et validation des variables d'environnement
interface EnvironmentConfig {
  MAPBOX_API_KEY: string;
  OPENWEATHER_API_KEY: string;
  NODE_ENV: string;
}

// Validation des variables d'environnement requises
function validateEnvironment(): EnvironmentConfig {
  const requiredVars = {
    MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };

  // Vérifier que toutes les variables requises sont présentes
  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value || value === 'your_mapbox_api_key')
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes ou non configurées: ${missingVars.join(', ')}\n` +
      'Veuillez configurer ces variables dans votre fichier .env.local'
    );
  }

  return requiredVars as EnvironmentConfig;
}

// Configuration exportée et validée
export const env = validateEnvironment();

// Fonction utilitaire pour vérifier si on est en développement
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';