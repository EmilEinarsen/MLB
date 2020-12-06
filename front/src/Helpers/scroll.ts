const scrollTo = (
	{ container, to, duration, onDone }
	: { container: any, to: number, duration: number, onDone?: any }
): void => {
	const start = container.scrollTop
	const change = to - start
	const startTime = performance.now()
	let now, elapsed, t

	const animateScroll = () => {
		now = performance.now()
		elapsed = (now - startTime)
		t = (elapsed/duration)

		container.scrollTop = start + change * easeInOutQuad(t)

		t < 1 ? window.requestAnimationFrame(animateScroll)
		: onDone && onDone()
	}

	animateScroll()
}

const scrollToElm = (
	{ container, target, duration }
	: { container: Element | null, target: Element | null, duration: number }
): void => scrollTo({ container, to: getRelativePos(target).top, duration })

const getRelativePos =
	(target: any): { 
	[key: string]: number 
} => {
	if(!target) return {}
	let parentPos = target.parentNode.getBoundingClientRect()
	let	targetPos = target.getBoundingClientRect()
	
	return {
		top: targetPos.top - parentPos.top + target.parentNode.scrollTop,
		right: targetPos.right - parentPos.right,
		bottom: targetPos.bottom - parentPos.bottom,
		left: targetPos.left - parentPos.left
	}
}

const easeInOutQuad = (t: any) => ( t < .5 ) ? ( 2 * t * t ) : ( -1 +( 4 - 2 * t ) * t )

export default scrollToElm