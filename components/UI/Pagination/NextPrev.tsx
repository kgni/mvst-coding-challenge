import React from 'react';

import { FaLessThan, FaGreaterThan } from 'react-icons/fa';

interface Props {
	page: number;
	items: number;
	onClickPreviousPage: () => void;
	onClickNextPage: () => void;
}

const NextPrev: React.FC<Props> = ({
	page,
	items,
	onClickPreviousPage,
	onClickNextPage,
}) => {
	// if items are under 30, then it means we are on the last page. (we are fetching 30 in a row)
	// if page is 1, then don't allow to click previous
	return (
		// if page is 1, then don't allow to click previous
		<div className="flex items-center gap-8 justify-center">
			{page > 1 ? (
				<button
					onClick={onClickPreviousPage}
					className="text-title flex items-center rounded-lg border-[1px] border-transparent hover:border-[1px] hover:border-btnBorder pb-1 px-4"
				>
					&lt; Previous
				</button>
			) : (
				<button
					className="rounded-lg border-[1px] border-transparent  pb-1 px-4"
					disabled
				>
					Previous
				</button>
			)}

			{/* If we have under 30 items, then we know we are at last page, so we disable the button */}
			{items < 30 ? (
				<button
					className="rounded-lg border-[1px] border-transparent  pb-1 px-4"
					disabled
				>
					Next
				</button>
			) : (
				<button
					onClick={onClickNextPage}
					className="text-title flex items-center rounded-lg border-[1px] border-transparent hover:border-[1px] hover:border-btnBorder pb-1 px-4"
				>
					Next &gt;
				</button>
			)}
		</div>
	);
};

export default NextPrev;
