import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MessageStatus } from '../../model';

interface Props {
	className: string;
	errorMessage?: string;
	successMessage?: string;
	status: MessageStatus;
	onClose: () => void;
}

const StatusMessage: React.FC<Props> = ({
	className,
	errorMessage,
	successMessage,
	status,
	onClose,
}) => {
	// general styles
	const sharedStyles = `w-full rounded-md mb-4 font-semi flex items-center justify-center relative ${className}`;

	// on error
	if (status === 'error') {
		return (
			<div className={`bg-btnError text-white ${sharedStyles}`}>
				<p>{errorMessage && errorMessage}</p>
				<AiOutlineClose
					onClick={onClose}
					className="absolute right-2 cursor-pointer"
				/>
			</div>
		);
	}

	// on success
	return (
		<div className={`bg-green-300 text-green-600 ${sharedStyles}`}>
			<p>{successMessage}</p>
			<AiOutlineClose
				onClick={onClose}
				className="absolute right-2 cursor-pointer"
			/>
		</div>
	);
};

export default StatusMessage;
