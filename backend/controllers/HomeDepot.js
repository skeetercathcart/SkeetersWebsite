require('../models/stickerTemplate');
const stickerLabel = require('../models/stickerTemplate');

async function createSavedDesign (req, res) {
    console.log('Entering createSavedDesign')

    const { name, sku} = req.body;

    try {

        const design = new stickerLabel({
            name: name,
            sku: sku
        });

        await design.save();

        console.log(`New Design ${name} Created`)
        res.status(201).json({"Great Success!" : `New Design ${name} Created`})
    } catch (error) {
        console.log('Failed to create new design ' + error.message)
        return res.status(500).json({error: "An error occurred while creating a new design"})
    }
}

async function getPaginatedDesigns (req, res) {
    console.log('Entering getPaginatedDesigns')

    try {
        // read ?page=1&limit=20 (defaults)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

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

module.exports = { createSavedDesign, getPaginatedDesigns }