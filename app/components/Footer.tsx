import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className="bg-secondary text-white p-4 text-center">
			<p>&copy; 2024 TerraLens. All rights reserved.</p>
			<p>
				<a href="https://your-portfolio-link.com" className="hover:text-accent">
					Visit my portfolio
				</a>
			</p>
		</footer>
	);
};

export default Footer;
