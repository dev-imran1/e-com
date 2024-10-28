const createProduct =async (req,res)=>{
    try {
        console.log(req.body)
        const {title,category,subCategory,slug} =req.body;
        // const {thumbnail} = req.file

        if ([title, slug, category, subCategory].some((field) => field === "")) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Process uploaded files
        // const thumbnailFile = req.files?.thumbnail ? req.files.thumbnail[0] : null;
        // const galleryFiles = req.files?.gallery || [];

        // // Ensure thumbnail is provided
        // if (!thumbnailFile) {
        //     return res.status(400).json({ error: "Thumbnail is required" });
        // }

    } catch (error) {
        console.log(error.message)    
    }
}

export {createProduct}  

// 31 minutes