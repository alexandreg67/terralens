'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';

const Home: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<HeroSection />
				<FeaturesSection />
				<TestimonialsSection />
			</main>
		</div>
	);
};

export default Home;
