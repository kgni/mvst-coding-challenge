import React from 'react';
import { Oval } from 'react-loader-spinner';

interface Props {
	fetchUser: (fetchURL: string) => Promise<void>;
	url: string;
	isLoading: boolean;
	children: React.ReactNode;
}

const Button: React.FC<Props> = ({ url, isLoading, fetchUser, children }) => {
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
