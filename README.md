# 🌍 TerraLens

**Une plateforme complète de visualisation de données environnementales, économiques et géospatiales**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-4CAF50?style=for-the-badge)](#)
[![GitHub](https://img.shields.io/badge/📂_Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](#)

---

## 🎯 Vue d'ensemble

TerraLens est une application web moderne développée avec **Next.js 14** qui centralise et visualise des données complexes provenant de multiples sources externes. Le projet démontre une expertise en **développement full-stack**, **intégration d'APIs tierces**, et **visualisation de données interactives**.

### 🚀 Fonctionnalités principales

- **🌤️ Module météorologique** - Prévisions 7 jours avec visualisations interactives
- **📊 Dashboard économique** - Comparaison multi-pays d'indicateurs économiques
- **🗺️ Cartographie géospatiale** - Cartes interactives avec données OpenStreetMap

---

## 🛠️ Stack technique

### **Framework & Architecture**
![Next.js](https://img.shields.io/badge/Next.js-14.2.6-black?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)

### **État & Données**
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.7-764abc?style=flat-square&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7.5-5A29E4?style=flat-square&logo=axios&logoColor=white)

### **Visualisation & Cartes**
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.4-FF6384?style=flat-square&logo=chart.js&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.12.7-8884d8?style=flat-square)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat-square&logo=leaflet&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-3.6.0-000000?style=flat-square&logo=mapbox&logoColor=white)

### **UI/UX & Style**
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38b2ac?style=flat-square&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12.10-5A0EF8?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3.30-0055FF?style=flat-square&logo=framer&logoColor=white)

### **Outils & Développement**
![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8.4.41-DD3A0A?style=flat-square&logo=postcss&logoColor=white)

---

## ✨ Fonctionnalités détaillées

### 🌤️ **Module Météorologique**
- **API Integration** : Open-Meteo API pour données météorologiques en temps réel
- **Algorithme personnalisé** : Dérivation intelligente des conditions météo (Clear, Rain, Snow, etc.)
- **Visualisation avancée** : Charts interactifs avec Chart.js et thème personnalisé
- **UX optimisée** : Cartes cliquables, modales détaillées, navigation fluide
- **Filtrage intelligent** : Affichage uniquement des heures actuelles et futures

**Highlights techniques :**
```typescript
// Algorithme de dérivation des conditions météo
const deriveCondition = (temp: number, humidity: number, windSpeed: number) => {
  // Logique complexe analysant température, humidité et vent
  // pour déterminer les conditions météorologiques
}
```

### 📊 **Dashboard Économique**
- **Source de données** : World Bank API avec 8+ indicateurs économiques
- **Comparaison multi-pays** : Jusqu'à 3 pays simultanément
- **Charts adaptatifs** : Échelle Y automatique avec formatage intelligent (T/B/M)
- **Gestion des données** : Traitement robuste des valeurs nulles
- **Filtrage temporel** : Sélection de plages de dates avec validation

**Indicateurs disponibles :**
- PIB historique et taux de croissance
- Taux de chômage et pauvreté
- Émissions CO2 et impact environnemental
- Espérance de vie et IDH
- Dépenses éducatives et énergies renouvelables

### 🗺️ **Module Géospatial**
- **Cartes interactives** : React-Leaflet avec marqueurs personnalisés
- **Requêtes dynamiques** : Génération de requêtes Overpass QL complexes
- **Filtres par catégorie** : Monuments, musées, parcs, points de vue
- **Optimisation performance** : Chargement basé sur le zoom (≥12), debouncing
- **Gestion des requêtes** : AbortController pour annulation des requêtes

---

## 🏗️ Architecture & Patterns

### **Structure modulaire**
```
app/
├── api/              # Routes API Next.js
│   ├── weather/      # Intégration Open-Meteo
│   ├── economic/     # Intégration World Bank
│   └── overpass/     # Requêtes OpenStreetMap
├── components/       # Composants réutilisables
│   ├── weather/      # Module météo
│   ├── economic/     # Module économique
│   └── geospatial/   # Module cartographique
├── services/         # Logique métier et API calls
├── types/           # Définitions TypeScript
├── utils/           # Fonctions utilitaires
└── hooks/           # Hooks React personnalisés
```

### **Patterns de développement**
- **API Routes** : Intégration sécurisée des APIs externes
- **Custom Hooks** : `useDebounce`, `useThemeColors`, `useTimeoutMessage`
- **Type Safety** : Interfaces TypeScript complètes pour toutes les données
- **Error Handling** : Gestion robuste des erreurs avec fallbacks UI
- **Performance** : Dynamic imports, request cancellation, efficient re-rendering

---

## 🚀 Installation & Configuration

### **Prérequis**
- Node.js 20+
- npm, yarn, ou pnpm

### **Installation**
```bash
# Cloner le repository
git clone https://github.com/alexandreg67/terralens.git
cd terralens

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
```

### **Configuration environnement**
```bash
# .env.local
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_token_here
OPENWEATHER_API_KEY=your_openweather_key_here
```

### **Lancement**
```bash
# Développement
npm run dev

# Production
npm run build
npm start

# Linting
npm run lint
```

---

## 🎯 Défis techniques résolus

### **1. Intégration multi-APIs**
- **Défi** : Normaliser des données provenant de 3 APIs différentes (Open-Meteo, World Bank, Overpass)
- **Solution** : Couche d'abstraction avec services dédiés et transformation des données

### **2. Performance des cartes**
- **Défi** : Éviter les requêtes inutiles lors des interactions carte
- **Solution** : Debouncing avec Lodash + AbortController pour annulation des requêtes

### **3. Visualisation de données complexes**
- **Défi** : Charts adaptatifs pour des données économiques avec ordres de grandeur variés
- **Solution** : Algorithme d'échelle Y automatique + formatage intelligent (T/B/M)

### **4. Gestion d'état complexe**
- **Défi** : Synchronisation entre sélections utilisateur et données multiples
- **Solution** : Redux Toolkit avec slices modulaires par domaine fonctionnel

---

## 📱 Responsive Design & Accessibilité

- **Mobile-first** : Design adaptatif avec Tailwind CSS
- **Theme personnalisé** : Palette de couleurs cohérente (teal/dark gray/red)
- **Composants DaisyUI** : Interface utilisateur professionnelle
- **Animations fluides** : Framer Motion pour les transitions
- **Accessibilité** : Labels ARIA et navigation clavier

---

## 🌟 Points forts du projet

### **Excellence technique**
✅ **Next.js 14** avec App Router (architecture moderne)  
✅ **TypeScript strict** (type safety complète)  
✅ **Dual mapping solutions** (Leaflet + Mapbox)  
✅ **Multiple chart libraries** (Chart.js + Recharts)  
✅ **API integration mastery** (3 sources externes)  
✅ **Performance optimization** (dynamic imports, debouncing)  
✅ **Error handling robuste** avec fallbacks UI  

### **Compétences démontrées**
- **Full-Stack Development** avec Next.js 14
- **Data Visualization** avancée avec multiple libraries
- **API Integration** complexe avec transformation de données  
- **TypeScript** expertise avec types complexes
- **Performance Optimization** et UX moderne
- **Responsive Design** avec frameworks CSS modernes

---

## 📫 Contact

**Alexandre** - Développeur Full-Stack  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alexandreg67)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](#)

---

*TerraLens - Transforming complex data into actionable insights through modern web technologies*