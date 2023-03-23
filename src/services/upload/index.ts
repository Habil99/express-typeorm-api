import multer from "multer";

const storage = multer.diskStorage({
    filename: (_req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploadService = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
})