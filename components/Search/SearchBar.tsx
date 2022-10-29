import React, { ChangeEvent, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

// beacuse I want to be able to pass in anything as a attribute to an input, I'm setting props: any  - I'm not sure what the best practice is here, but I don't think it is setting it to any. Maybe an Interface where the inputprops are set to string | number, and then we can take it from there?
const SearchBar = (props: any) => {
	const [placeholderState, setPlaceholderState] = useState(props.placeholder);
	const [isFocus, setIsFocus] = useState(false);
	console.log(props.value);
	// the two onFocus and onBlur functions, does so we are not causing a re-render every single time we focus or blur.
	function onFocusSetPlaceholder() {
		if (!props.value) {
			setPlaceholderState('');
		}
		setIsFocus(true);
	}

	function onBlurSetPlaceholder() {
		if (!props.value) {
			setPlaceholderState(props.placeholder);
		}
		setIsFocus(false);
	}

	function onMouseDownClearInput() {
		props.setInputValue('');
		setPlaceholderState(props.placeholder);
		setIsFocus(false);
	}

	function onChangeSetValue(e: ChangeEvent<HTMLInputElement>) {
		props.setInputValue(e.target.value);
	}

	return (
		<form className="">
			<div className="flex mx-auto items-center relative mb-2">
				<input
					{...props}
					onFocus={onFocusSetPlaceholder}
					onBlur={onBlurSetPlaceholder}
					onChange={onChangeSetValue}
					placeholder={placeholderState}
				></input>
				{!props.value && !isFocus && (
					<label htmlFor="search" className="absolute right-2">
						{' '}
						<AiOutlineSearch
							className={`${
								isFocus ? 'text-btnText' : 'text-text'
							}  text-xl cursor-pointer`}
						/>
					</label>
				)}

				{(isFocus || props.value) && (
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
