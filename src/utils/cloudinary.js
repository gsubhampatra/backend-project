import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        //cloudinary file upload
        const response = await  cloudinary.uploader.upload(localFilePath,{
          resource_type:'auto'
        })
        //file upload successfully
        // console.log("file upload successfully",response.url);
        fs.unlinkSync(localFilePath) // remove the local file
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // if upload failed remove the local file 
        return null
    }
}

const deleteOnCloudinary=async(imageUrl)=>{
  try {
    if (!imageUrl) {
      return null
    }
    const res =  await cloudinary.uploader.destroy(imageUrl)
    return res
  } catch (error) {
    return null
  }
}

export {uploadOnCloudinary,deleteOnCloudinary}