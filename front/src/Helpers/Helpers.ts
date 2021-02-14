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
    .sort(function(a, b){

		var test = a.title.charCodeAt(0) <= 90 && b.title.charCodeAt(0) <= 90;
	
		if(test) return a.title.charCodeAt(0)-b.title.charCodeAt(0);
		else if(a.title.charCodeAt(0) <= 90) return -1;
		else if(b.title.charCodeAt(0) <= 90) return 1;
		else return a.title.charCodeAt(0)-b.title.charCodeAt(0);
	
	})
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

export const makeKey = (length: number) => {
	const 
		result = [],
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		charactersLength = characters.length

	for ( var i = 0; i < length; i++ )
	   result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
	
	return result.join('')
 }