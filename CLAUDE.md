# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TerraLens is a Next.js 14 application that provides environmental, economic, and geospatial data visualization. The app features three main modules:

1. **Weather Module** - Real-time weather data visualization using Open-Meteo API
2. **Economic Module** - Economic indicators from World Bank API with country comparisons  
3. **Geospatial Module** - Interactive maps with environmental monitoring stations using Overpass API

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server  
npm start

# Linting
npm run lint
```

## Tech Stack & Architecture

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + DaisyUI components
- **State Management**: Redux Toolkit
- **Charts**: Chart.js, Recharts, React-Chart.js-2
- **Maps**: React-Leaflet, React-Map-GL (Mapbox)
- **HTTP Client**: Axios
- **Icons**: FontAwesome, React Icons

## Project Structure

```
app/
├── api/                    # API routes
│   ├── weather/           # Weather data endpoint
│   ├── economic/          # Economic data endpoint  
│   └── overpass/          # Geospatial data endpoint
├── components/            # Shared components
│   ├── economic/          # Economic module components
│   ├── geospatial/        # Map and location components
│   └── weather/           # Weather display components
├── services/              # Data fetching services
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── weather/              # Weather page
├── economic/             # Economic dashboard page
└── geospatial/           # Interactive maps page
```

## Key Services & APIs

### Weather Service (`app/services/WeatherService.ts`)
- Integrates with Open-Meteo API via `/api/weather` endpoint
- Processes hourly weather data with condition derivation
- Groups data by date and filters for current/future hours

### Economic Service (`app/services/EconomicService.ts`) 
- Fetches World Bank indicators via `EconomicDataFetcher`
- Provides functions for GDP, unemployment, poverty, CO2 emissions, etc.
- Uses country codes (ISO 3166-1 alpha-2) for data queries

### Overpass Service (`app/services/OverpassService.ts`)
- Queries OpenStreetMap data for environmental monitoring stations
- Generates dynamic Overpass QL queries based on location and radius

## Styling System

The project uses a custom Tailwind theme with DaisyUI:
- **Primary**: #2C7A7B (teal for main elements)
- **Secondary**: #1A202C (dark gray)  
- **Accent**: #E53E3E (red for highlights)
- **Background**: #F7FAFC (light gray)

Custom theme defined in `tailwind.config.ts` with DaisyUI integration.

## Component Patterns

- All pages are client components (`'use client'`)
- Components follow feature-based organization (weather/, economic/, geospatial/)
- Extensive use of TypeScript interfaces in `app/types/`
- Chart components typically use Chart.js or Recharts
- Map components use React-Leaflet with custom markers

## Data Flow

1. **API Routes**: Handle external API calls and data transformation
2. **Services**: Client-side data fetching and processing
3. **Components**: Display processed data with charts and maps
4. **Utils**: Helper functions for data formatting and query generation

## Environment Configuration

The app expects:
- Open-Meteo API (no key required)
- World Bank API (no key required) 
- OpenStreetMap Overpass API (no key required)
- Mapbox token for map rendering (configured in next.config.mjs)

## Development Notes

- Map components require dynamic imports to avoid SSR issues
- Weather data filtering focuses on current hour onwards
- Economic data uses latest valid values when null entries exist
- Geospatial queries use bounding box calculations for area searches