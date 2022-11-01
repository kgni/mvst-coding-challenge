import React, { ChangeEvent, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

// beacuse I want to be able to pass in anything as a attribute to an input, I'm setting  any  - I'm not sure what the best practice is here, but I don't think it is setting it to any. Maybe an Interface where the inputprops are set to string | number, and then we can take it from there?

interface Props {
	type: string;
	id?: string;
	className?: string;
	value: string;
	placeholder: string;
	setPage?: (num: number) => void;
	onChange: (val: string) => void;
}
const SearchBar: React.FC<Props> = ({
	type,
	id = 'search',
	className,
	value,
	placeholder,
	setPage,
	onChange,
}) => {
	const [placeholderState, setPlaceholderState] = useState(placeholder);
	const [isFocus, setIsFocus] = useState(false);

	// setIsFocus functions that we are using to set the focus state, for controlling the icons and color of those depending on if the the searchbar is focused or not.
	function onFocusSetPlaceholder() {
		setIsFocus(true);
	}

	function onBlurSetPlaceholder() {
		setIsFocus(false);
	}

	function onMouseDownClearInput() {
		onChange('');
		setPlaceholderState(placeholder);
		setIsFocus(false);
	}

	function onChangeSetValue(e: ChangeEvent<HTMLInputElement>) {
		setPage?.(1);
		onChange(e.target.value);
	}

	return (
		<div className="flex grow mx-auto items-center relative">
			<input
				tabIndex={1}
				type={type}
				id={id}
				value={value}
				className={className}
				onFocus={onFocusSetPlaceholder}
				onBlur={onBlurSetPlaceholder}
				onChange={onChangeSetValue}
				placeholder={placeholderState}
			></input>
			{!value && (
				<label htmlFor={id} className="absolute right-2">
					{' '}
					<AiOutlineSearch
						className={`${
							isFocus ? 'text-btnText' : 'text-text'
						}  text-xl cursor-pointer`}
					/>
				</label>
			)}

			{isFocus && value && (
				<AiOutlineClose
					onMouseDown={onMouseDownClearInput}
					className={`${
						isFocus ? 'text-btnText' : 'text-text'
					}  text-xl cursor-pointer absolute right-2`}
				/>
			)}
		</div>
	);
};

export default SearchBar;
