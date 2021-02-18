const Message =  {
	204: 'No Content',
	401: 'Unauthorized',
	404: 'Not Found',
	409: 'Conflict'
}

export const resObj = ({ 
	status,
	message,
	payload
} : { 
	status: number,
	message?: any,
	payload?: any
}) => ({
	status,
	message: message ?? Message[status],
	payload
})

export const extractMessage = (errors: any[]) => {
	let errorObj = {}
	errors.forEach(error=> errorObj[error.property] = Object.values(error.constraints)[0])
	return errorObj
}

export const clean = (
    obj: object,
    keys: object
) => {
    let cleaned = {}
    Object.keys(keys).forEach(key => obj[key] && (cleaned[key] = obj[key]))
    return cleaned
}