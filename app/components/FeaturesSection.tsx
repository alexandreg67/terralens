import React from 'react';
import Link from 'next/link';

const FeaturesSection: React.FC = () => {
	return (
		<section id="features-section" className="py-12 bg-gray-100 px-6">
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-bold mb-8 text-primary">Key Features</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="card bg-white shadow-md">
						<div className="card-body">
							<h3 className="card-title text-primary text-2xl">Weather Data</h3>
							<p>Explore detailed weather analytics for cities worldwide.</p>
							<Link href="/weather" className="btn btn-primary mt-4">
								Explore Weather
							</Link>
						</div>
					</div>
					<div className="card bg-white shadow-md">
						<div className="card-body">
							<h3 className="card-title text-primary text-2xl">
								Economic Data
							</h3>
							<p>Analyze economic indicators and trends globally.</p>
							<Link href="/economic" className="btn btn-primary mt-4">
								Explore Economy
							</Link>
						</div>
					</div>
					<div className="card bg-white shadow-md">
						<div className="card-body">
							<h3 className="card-title text-primary text-2xl">
								Geospatial Data
							</h3>
							<p>Visualize geospatial insights with interactive maps.</p>
							<Link href="/geospatial" className="btn btn-primary mt-4">
								Explore Geospatial
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
