import cloudinary from "./cloudinary"

const uploadImageCloudinary=async(file:Express.Multer.File)=>{
    const base64Image=Buffer.from(file.buffer).toString('base64')
    const dataURI=`data:${file.mimetype};base64,${base64Image}`
    try {
        const uploadResponse=await cloudinary.uploader.upload(dataURI)
        return uploadResponse.secure_url
    } catch (error) {
        console.log(error,'tis the the error ata the image uploader')
         return error
    }
    
}

export default uploadImageCloudinary