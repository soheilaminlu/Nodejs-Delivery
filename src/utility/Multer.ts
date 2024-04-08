import multer from 'multer'



const imageStorage = multer.diskStorage({
  destination: function (req , file , cb) {
      cb(null , 'images')
  } ,
  filename: function(req , file , cb) {
      cb(null , new Date().toString()+'_'+file.originalname)
  }
})


const images = multer({storage:imageStorage}).array('images' , 10);

export {images}
