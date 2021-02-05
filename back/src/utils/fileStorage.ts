import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `public/assets`),
    filename: (req, file, cb) => {
        let fileEnding = file.originalname.split('.')
        fileEnding = fileEnding[fileEnding.length-1]
        cb(null, `${file.fieldname}-${Date.now()}.${fileEnding}`)
    }
})

const fileFilter = (req, file, cb) => {
    const 
        fileType = file.mimetype.split('/')[1],
        whiteList = [ 'jpeg', 'png' ]
    
    whiteList.includes(fileType) 
        ? cb(null, true) 
        : cb(null, false)
}

const upload = multer({storage, fileFilter})

export default upload