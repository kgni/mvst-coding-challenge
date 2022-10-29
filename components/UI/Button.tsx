import React, { PropsWithChildren } from 'react';
import { Oval } from 'react-loader-spinner';
const Button = ({
	children,
	fetchUser,
	url,
	isLoading,
}: {
	children: React.ReactNode;
	// TODO - Fix any type? How do I pass this function correctly to button
	fetchUser: any;
	url: string;
	isLoading: boolean;
}) => {
	return (
		<button
			onClick={() => fetchUser(url)}
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
