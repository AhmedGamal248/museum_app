import multer from "multer"
import { v4 as uuidv4 } from 'uuid';

export const fileUpload = (fieldName)=> {
    const storage = multer.diskStorage({
        
      })
    
      function fileFilter (req, file, cb) {
    
        if(file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb('images only', false)
        }
      }
      
      const upload = multer({ storage ,fileFilter})

      return upload.single(fieldName)
}