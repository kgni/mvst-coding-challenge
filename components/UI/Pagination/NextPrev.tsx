import React from 'react';

interface Props {
	page: number;
	totalPages: number;
	itemsLength: number;
	onClickPreviousPage: () => void;
	onClickNextPage: () => void;
}

const NextPrev: React.FC<Props> = ({
	page,
	totalPages,
	itemsLength,
	onClickPreviousPage,
	onClickNextPage,
}) => {
	// if items are under 30, then it means we are on the last page. (we are fetching 30 in a row)
	// if page is 1, then don't allow to click previous
	return (
		// if page is 1, then don't allow to click previous. We don't need to check for anything else, because when searching we automatically set the page to 1.
		<div className="flex items-center mt-8 gap-4 justify-center md:gap-2">
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

			{/* if the currentpage is equal to the total amount of pages, OR if we have 30 items or less, then we know we are at last page, so we disable the button. */}
			{totalPages === page || itemsLength <= 30 ? (
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
