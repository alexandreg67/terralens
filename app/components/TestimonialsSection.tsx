import React from 'react';

const TestimonialsSection: React.FC = () => {
	return (
		<section className="py-12 bg-white px-6">
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-bold mb-8 text-primary">
					What Our Users Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-gray-100 p-6 rounded-lg shadow-md">
						<p className="text-lg text-gray-700">
							&quot;TerraLens allowed me to visualize global economic trends in
							a simple and effective way.&quot;
						</p>
						<p className="mt-4 font-semibold">- John Doe</p>
					</div>
					<div className="bg-gray-100 p-6 rounded-lg shadow-md">
						<p className="text-lg text-gray-700">
							&quot;The geospatial tool is incredible for exploring location
							data.&quot;
						</p>
						<p className="mt-4 font-semibold">- Jane Smith</p>
					</div>
					<div className="bg-gray-100 p-6 rounded-lg shadow-md">
						<p className="text-lg text-gray-700">
							&quot;I highly recommend TerraLens to anyone interested in climate
							data.&quot;
						</p>
						<p className="mt-4 font-semibold">- Alice Johnson</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
