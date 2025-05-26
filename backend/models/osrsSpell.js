const mongoose = require('mongoose')
const Schema = mongoose.Schema


const osrsSpellSchema = new Schema({

    name: { type: String, required: true, unique: true },
    requiredLevel: { type: String, required: true },
    imageURL: { type: String, required: true },
    maxHit: { type: String, required: true },
    spellClass: { type: String, default: "None" },
    spellbook: { type: String, required: true },
    element: { type: String, default: "None" }

})

const osrsSpell = mongoose.model('osrsSpell', osrsSpellSchema);

module.exports = osrsSpell;