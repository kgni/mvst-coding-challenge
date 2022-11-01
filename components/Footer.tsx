import React from 'react';

const Footer: React.FC = () => {
	return (
		<div className="text-text text-sm absolute bottom-10 right-1/2 translate-x-[50%] font-mono">
			made by{' '}
			<a
				href="https://github.com/kgni"
				target="_blank"
				rel="noreferrer"
				className="text-btnText cursor-pointer hover:text-title active:text-title"
			>
				kgni
			</a>
		</div>
	);
};

export default Footer;
