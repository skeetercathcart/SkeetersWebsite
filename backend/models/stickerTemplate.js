const mongoose = require('mongoose')
const Schema = mongoose.Schema


const stickerLabelSchema = new Schema({

    name: { type: String, required: true, unique: true },
    sku: { type: String, required: true },

})

const stickerLabel = mongoose.model('stickerLabel', stickerLabelSchema);

module.exports = stickerLabel