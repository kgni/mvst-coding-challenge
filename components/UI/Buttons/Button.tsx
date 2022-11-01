import React from 'react';
import { Oval } from 'react-loader-spinner';

interface Props {
	onClick?: () => void;
	isLoading?: boolean;
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<Props> = ({
	onClick,
	isLoading,
	className,
	children,
}) => {
	return (
		<button
			onClick={onClick}
			className={`text-white bg-btnAccent py-[2px] rounded-md hover:bg-btnAccentHover duration-75 flex justify-center items-center gap-2 ${className}`}
		>
			{children}
			{/* if isLoading state is passed in, render spinner when loading */}
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
