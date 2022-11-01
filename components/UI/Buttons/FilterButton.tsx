import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import FilterDropDown from '../Dropdown/FilterDropDown';

interface Props {
	title: string;
	subtitle: string;
	selected: string;
	options: string[];
}

const FilterButton: React.FC<Props> = ({
	title,
	subtitle,
	selected,
	options,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex gap-1 items-center text-sm text-btnText bg-btnPrimary border-[1px] border-btnBorder px-4 rounded-md hover:bg-btnHover hover:border-btnBorderHover"
				onClick={(prev) => setIsOpen(!prev)}
			>
				{title} <AiFillCaretDown className="text-xs mt-1" />
			</button>

			{isOpen && <FilterDropDown />}
		</>
	);
};

export default FilterButton;
