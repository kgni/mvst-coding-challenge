import React, { PropsWithChildren } from 'react';

const Button: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<button className="text-white bg-btnAccent w-full py-[2px] rounded-md hover:bg-btnAccentHover">
			{children}
		</button>
	);
};

export default Button;
