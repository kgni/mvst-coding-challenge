import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import FilterDropDown from '../Dropdown/FilterDropDown';

interface Props {
	title: string;
	subtitle: string;
	selected: string;
	options: string[];
	filterFunc: any;
}

const FilterButton: React.FC<Props> = ({
	title,
	subtitle,
	selected,
	options,
	filterFunc,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="flex">
				<button
					className="flex gap-1 items-center text-sm text-btnText bg-btnPrimary border-[1px] border-btnBorder px-4 rounded-md hover:bg-btnHover hover:border-btnBorderHover relative"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{/* TODO - add modal so that when anything outside of the button is clicked, the button will close, right now you can open both dropdowns at once. */}
					{title} <AiFillCaretDown className="text-xs mt-1" />
					{isOpen && (
						<>
							<FilterDropDown
								subtitle={subtitle}
								options={options}
								selected={selected}
								setIsOpen={setIsOpen}
								filterFunc={filterFunc}
							/>
						</>
					)}
				</button>
			</div>
		</>
	);
};

export default FilterButton;
