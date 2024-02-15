const {profileMedia}=require("../../controllers/Admin/profileMediaController");
const {Profile}=require("../../models/");
const uploadProfileImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded.'});
        }
        const imageURL = `./uploads/profileMedia/${ req.file.filename }`;

        const fileDetails = {
            mediable_id: req.params.userId,
            mediable_type: 'User',
            url: imageURL,
            name: req.file.originalname,
            file_name: req.file.filename,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            featured: false
        };

        const newMedia = await Profile.create(fileDetails);

        if (!newMedia) {
            return res.status(400).json({success: false, message: 'Error uploading file.'});
        }
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: newMedia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
}

const uploadStoreImages = async (req, res) => {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({success: false, message: 'No files found.'});
        }

        // Store file details in the database for each uploaded file
        const mediaPromises = req.files.map(async file => {
            const fileDetails = {
                mediable_id: req.params.storeId,
                mediable_type: 'Store',
                url: `./uploads/storeMedia/${ file.filename }`,
                name: file.originalname,
                file_name: file.filename,
                file_type: file.mimetype,
                file_size: file.size,
                featured: req.body.featured || false
            };
            return await Profile.create(fileDetails);
        });

        // Wait for all media creation promises to resolve
        const mediaResults = await Promise.all(mediaPromises);

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error', error: err.message});
    }
}
module.exports = {
    uploadProfileImage, uploadStoreImages
}