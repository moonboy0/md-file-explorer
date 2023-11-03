import {diskStorage} from "multer"


export const storage = diskStorage({
    destination(req, file, callback) {
        try{
            if(file.originalname.endsWith(".md")){
                callback(null,process.cwd() + "\\md\\")
            }
            else if(file.originalname.endsWith(".jpg") || file.originalname.endsWith(".png")){
                callback(null , process.cwd() + "\\pfp\\")
            }
            else{
                callback(new Error("file type not supported") , "")
            }
        }catch(e){
            console.log(e);
        }
        
    },
    filename(req, file, callback) {
        try{
            if(file.originalname.endsWith(".md")){
                const fileName = Date.now() + ".md"
    
    
                callback(null,fileName)
            }
            else if(file.originalname.endsWith(".jpg") || file.originalname.endsWith(".png")){
                const fileName = Date.now() + '.jpg'
                callback(null,fileName)
            }
            else{
                callback(new Error("file type not supported") , "")
            }
        }catch(e){
            console.log(e);
        }
        


        
    },
})