import { v2 as cloudinary } from 'cloudinary';
const uploadImageCloudinary = async (image) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
    
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({folder:"GoBite"}, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        }).end(buffer);
    });
    return uploadImage;
}

export default uploadImageCloudinary;