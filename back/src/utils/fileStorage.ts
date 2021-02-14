import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
		cb(null, `public/assets/${file.mimetype.split('/')[0]}`)
	},
    filename: (req, file, cb) => {
        let filename = file.originalname.split('.')
        filename && cb(null, `${filename[0]}-${makeId(10)}.${filename[filename.length-1]}`)
		!filename && cb(null, `file-${makeId(10)}.mp3`)
    }
})

const fileFilter = (req, file, cb) => {
    const 
        fileType = file.mimetype.split('/')[1],
        whiteList = [ 'jpeg', 'png', 'mpeg' ]
		
    whiteList.includes(fileType) 
        ? cb(null, true) 
        : cb(null, false)
}

const makeId = length => {
	const 
		result = [],
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		charactersLength = characters.length

	for ( var i = 0; i < length; i++ )
	   result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
	
	return result.join('')
 }

const upload = multer({storage, fileFilter})

export default upload