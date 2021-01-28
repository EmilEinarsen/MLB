export { default as scrollContainerChildIntoView } from './scroll'

export const truncate = ( 
	str: string, 
	n: number, 
	useWordBoundary: boolean 
): string => {
	if (str.length <= n) return str

	const subString = str.substr(0, n-1)

	return (
		useWordBoundary 
			? subString.substr(0, subString.lastIndexOf(" ")) 
			: subString
	) + " ..."
}

export const group = (array: any[]): {[key:string]: any[]} => 
	array
    .sort((a, b) => a.title.localeCompare(b.title))
    .reduce((r, e) => {
		const key = e.title[0]
		!r[key] && (r[key] = [])
		r[key].push(e)
		return r
	}, {})
	
const createUrl = (params: string): string => 
	window.location.origin
		+ window.location.pathname 
		+ '?' 
		+ params

export const setToUrl = (params: string): void => {
	const url = createUrl(params)
	window.history.pushState({ path: url }, '', url)
}

export const cleanByKeys: any = (
    obj: any,
    keys: string[]
) => {
    let cleaned: any = {}
    keys.forEach((key) => obj[key] && (cleaned[key] = obj[key]))
    return cleaned
}