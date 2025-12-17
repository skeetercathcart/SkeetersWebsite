require('../models/stickerTemplate');
const stickerLabel = require('../models/stickerTemplate');

async function getAllStickerDesigns (req, res) {

    console.log('Entering getAllStickerDesigns')

    try {
        const allDesigns = await stickerLabel.find().sort({ name: 1 })
        return res.status(200).json(allDesigns)


    } catch (error) {
        console.log('Error fetching all sticker designs: ' + error.message)
        return res.status(500).json({message: "Error trying to fetch all sticker designs"})
    }


}

async function getPaginatedDesigns (req, res) {
    console.log('Entering getPaginatedDesigns')

    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;

        const skip = (page - 1) * limit;

        const [designs, totalCount] = await Promise.all([
            stickerLabel.find().sort({ name: 1 }).skip(skip).limit(limit),
            stickerLabel.countDocuments()
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            designs,
            page,
            totalPages,
            totalCount
        });

    } catch (err) {
        console.error("Pagination error:", err);
        res.status(500).json({ error: "Failed to fetch paginated designs" });
    }

}

module.exports = { getAllStickerDesigns, getPaginatedDesigns }