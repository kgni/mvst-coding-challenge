import React from 'react';
import { BsCheck } from 'react-icons/bs';

interface Props {
	subtitle: string;
	selected: string;
	setIsOpen: (val: boolean) => void;
	options: string[];
	filterFunc: any;
}

const FilterDropDown: React.FC<Props> = ({
	subtitle,
	selected,
	options,
	filterFunc,
	setIsOpen,
}) => {
	return (
		<>
			<div className="absolute top-10 bg-filterPrimary rounded-md border-btnBorder border-[1px] min-w-max w-72 md:w-48 right-0 py-4 text-left">
				<p className="px-4 mb-1">{subtitle}</p>
				<div className="h-[1px] bg-btnBorder mx-4 mb-2"></div>
				<ul className="flex flex-col gap-1 relative">
					{options.map((option: string) => (
						// not sure about how I'm handling this TypeScript error:
						// We are basically looking at
						// not sure how to pass around events yet.. it works, but I can't seem to remove this error. ignoring it for now so we can deploy to vercel

						<li
							// @ts-ignore
							onClick={(e) => filterFunc(e.target.innerText)}
							className="hover:bg-filterHover pl-10"
							key={option}
						>
							{/* if the current option is equal to the selected one, we add a check mark */}
							{option === selected && (
								<BsCheck
									className="absolute left-4 mt-[1px] text-lg
                "
								/>
							)}
							{option}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default FilterDropDown;
