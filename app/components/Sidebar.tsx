import React from 'react';

const Sidebar: React.FC = () => {
	return (
		<aside className="w-64 bg-secondary text-white p-4">
			<nav>
				<ul>
					<li className="mb-4">
						<a href="#">Filter 1</a>
					</li>
					<li className="mb-4">
						<a href="#">Filter 2</a>
					</li>
					<li>
						<a href="#">Filter 3</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
