import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res, next) => {
    try {
        const file = req.file;
        const uploadImage = await uploadImageCloudinary(file);
        return res.json({
            message: "Image uploaded successfully",
            data: uploadImage,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || error,
            error: true,
            success :  false
         });
    }
}

export default uploadImageController;