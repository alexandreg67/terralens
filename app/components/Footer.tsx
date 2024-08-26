import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className="bg-secondary text-white p-6 text-center px-6">
			<div className="flex justify-center space-x-4 mb-4">
				<a
					href="https://linkedin.com/in/yourprofile"
					className="hover:text-accent"
				>
					<i className="fab fa-linkedin"></i>
				</a>
				<a href="https://github.com/yourprofile" className="hover:text-accent">
					<i className="fab fa-github"></i>
				</a>
				<a href="https://twitter.com/yourprofile" className="hover:text-accent">
					<i className="fab fa-twitter"></i>
				</a>
			</div>
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
