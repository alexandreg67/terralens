import React from 'react';

const HeroSection: React.FC = () => {
	const handleScroll = () => {
		document
			.getElementById('features-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="relative flex items-center justify-center h-screen bg-background px-6">
			{/* Apply the dynamic background image using the working URL */}
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `url('https://picsum.photos/1920/1080')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black opacity-50"></div>
			</div>

			{/* Hero content */}
			<div className="relative z-10 text-center text-white">
				<h1 className="text-6xl font-extrabold mb-4">Welcome to TerraLens</h1>
				<p className="text-2xl mb-8">
					Explore our comprehensive data on weather, economy, and geospatial
					analytics.
				</p>
				<div className="flex justify-center space-x-4">
					<button className="btn btn-primary" onClick={handleScroll}>
						Start Your Exploration
					</button>
					<a
						href="https://your-portfolio-link.com"
						className="btn btn-secondary"
					>
						View Portfolio
					</a>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
