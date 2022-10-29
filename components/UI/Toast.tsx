import React, { MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastStatus } from '../../model';

const Toast = ({
	className,
	errorMessage,
	successMessage,
	status,
	closeFunction,
}: {
	className: string;
	errorMessage?: string;
	successMessage?: string;
	status: ToastStatus;
	// TODO - is this how you pass down functions?
	closeFunction: MouseEventHandler<SVGElement>;
}) => {
	const sharedStyles = `w-full rounded-md mb-4 font-semi flex items-center justify-center relative ${className}`;

	// on error
	if (status === 'error') {
		return (
			<div className={`bg-btnError text-white ${sharedStyles}`}>
				<p>{errorMessage && errorMessage}</p>
				<AiOutlineClose
					onClick={closeFunction}
					className="absolute right-2 cursor-pointer"
				/>
			</div>
		);
	}

	// on success
	if (status === 'success') {
		return (
			<div className={`bg-green-300 text-green-600 ${sharedStyles}`}>
				<p>{successMessage}</p>
				<AiOutlineClose
					onClick={closeFunction}
					className="absolute right-2 cursor-pointer"
				/>
			</div>
		);
	}

	// TODO - this fixed the following error: 'Toast' cannot be used as a JSX component. - is this because we have to return something no matter what? This must be caused by the conditional?
	return <></>;
};

export default Toast;
