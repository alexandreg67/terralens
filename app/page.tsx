'use client';

import React from 'react';
import Footer from './components/Footer';

const Home: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex flex-col items-center justify-center flex-grow bg-background">
				<h1 className="text-5xl font-bold mb-4">Welcome to TerraLens</h1>
				<p className="text-xl mb-8">
					Explore our comprehensive data on weather, economy, and geospatial
					analytics.
				</p>
				<button className="btn btn-primary">Get Started</button>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
