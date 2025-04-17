const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Gear Schema
const osrsGearSchema = new Schema({
    name: { type: String, required: true, unique: true },
    bonuses: {
        attack: {
            slash: { type: String, default: '0' },
            stab: { type: String, default: '0' },
            crush: { type: String, default: '0' },
            range: { type: String, default: '0' },
            magic: { type: String, default: '0' },
        },
        defense: {
            slash: { type: String, default: '0' },
            stab: { type: String, default: '0' },
            crush: { type: String, default: '0' },
            range: { type: String, default: '0' },
            magic: { type: String, default: '0' },
        },
        strength: { type: String, default: '0' },
        rangeStrength: { type: String, default: '0' },
        mageStrength: { type: String, default: '0'},
        prayer: { type: String, default: '0' },
    },
    imageURL: { type: String, default: '' },
    slot: {type: String, default: ''}
});

// Create the model
const osrsGear = mongoose.model('osrsGear', osrsGearSchema);

module.exports = osrsGear;