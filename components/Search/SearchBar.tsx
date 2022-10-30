import React, { ChangeEvent, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

// beacuse I want to be able to pass in anything as a attribute to an input, I'm setting  any  - I'm not sure what the best practice is here, but I don't think it is setting it to any. Maybe an Interface where the inputprops are set to string | number, and then we can take it from there?

interface Props {
	type: string;
	id: string;
	className: string;
	value: string;
	placeholder: string;
	setSearchTerm: (val: string) => void;
}
const SearchBar: React.FC<Props> = ({
	type,
	id,
	className,
	value,
	placeholder,
	setSearchTerm,
}) => {
	const [placeholderState, setPlaceholderState] = useState(placeholder);
	const [isFocus, setIsFocus] = useState(false);
	console.log(value);

	// the two onFocus and onBlur functions, does so we are not causing a re-render every single time we focus or blur.

	// TODO - get rid of this, and handle the hover/focus states with CSS.
	// there is no need to remove the placeholder text when, so basically you are micromanaging and doing the job that the browser should do.

	function onFocusSetPlaceholder() {
		if (!value) {
			setPlaceholderState('');
		}
		setIsFocus(true);
	}

	function onBlurSetPlaceholder() {
		if (!value) {
			setPlaceholderState(placeholder);
		}
		setIsFocus(false);
	}

	function onMouseDownClearInput() {
		setSearchTerm('');
		setPlaceholderState(placeholder);
		setIsFocus(false);
	}

	function onChangeSetValue(e: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
	}

	return (
		<form className="">
			<div className="flex mx-auto items-center relative mb-2">
				<input
					type={type}
					id={id}
					className={className}
					onFocus={onFocusSetPlaceholder}
					onBlur={onBlurSetPlaceholder}
					onChange={onChangeSetValue}
					placeholder={placeholderState}
				></input>
				{!value && !isFocus && (
					<label htmlFor="search" className="absolute right-2">
						{' '}
						<AiOutlineSearch
							className={`${
								isFocus ? 'text-btnText' : 'text-text'
							}  text-xl cursor-pointer`}
						/>
					</label>
				)}

				{(isFocus || value) && (
					<AiOutlineClose
						onMouseDown={onMouseDownClearInput}
						className={`${
							isFocus ? 'text-btnText' : 'text-text'
						}  text-xl cursor-pointer absolute right-2`}
					/>
				)}
			</div>
		</form>
	);
};

export default SearchBar;
