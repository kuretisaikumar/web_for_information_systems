const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

    destination : function(req,file,cb ){
        const rootDir = path.dirname(require.main.filename) 
        
        if(file.fieldname === "image"){
            cb(null , path.join( rootDir,"/public/uploads"))
        }

    } ,

    filename :function(req,file,cb ) {

       
        if(file.fieldname ==="image"){
            req.savedStoryImage ="image_" +new Date().toISOString().replace(/:/g, '-') + file.originalname 

            cb(null ,req.savedImage)
        }

    }

})


const fileFilter =(req,file,cb ) => {

    allowedMimeTypes = ["image/jpeg","image/jpg","image/png","image/gif"]

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return (new CustomError("Please provide a valid image file ",400),null )
    }
    
    cb(null , true ) ;
    
}

const imageUpload = multer({storage ,fileFilter  })


module.exports = imageUpload ; 
