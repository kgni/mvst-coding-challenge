// Reusable function to scroll to a specific point in the viewport. top: 0, left: 0 is the top.

export function scrollToWindow(
	top: number,
	left: number,
	behavior: ScrollBehavior = 'auto'
) {
	window.scrollTo({ top, left, behavior });
}

export function scrollTo(
	top: number,
	left: number,
	behavior: ScrollBehavior = 'auto'
) {
	window.scrollTo({ top, left, behavior });
}
