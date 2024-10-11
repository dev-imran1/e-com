import { v2 as cloudinary } from 'cloudinary';
import {unlinkSync} from "fs" 
// Configuration
cloudinary.config({
    cloud_name: 'dprshfiwn',
    api_key: '815661334941344',
    api_secret: '5acdei7fqkZWIB0SlBYt-m8hRH8' // Click 'View API Keys' above to copy your API secret
});

// Upload an image
export const cloudinaryUpload = async (path, public_id, folder) => {

  let uploadResult;
try{
    uploadResult = await cloudinary.uploader
        .upload(path, {
            public_id,
            folder
        })
        unlinkSync(path)
    }catch(error){
            unlinkSync(path)
            console.log(error);
        }

    // console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    // console.log(autoCropUrl);
    return { optimizeUrl, autoCropUrl, uploadResult }
}