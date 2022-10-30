import React from 'react';
import { Oval } from 'react-loader-spinner';

interface Props {
	onClick: () => void;
	isLoading: boolean;
	children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, isLoading, children }) => {
	return (
		<button
			onClick={onClick}
			className="text-white bg-btnAccent w-full py-[2px] rounded-md hover:bg-btnAccentHover duration-75 flex justify-center items-center gap-2"
		>
			{children}
			{isLoading && (
				<Oval
					width={15}
					height={15}
					color="white"
					secondaryColor="white"
					strokeWidth={5}
				/>
			)}
		</button>
	);
};

export default Button;
