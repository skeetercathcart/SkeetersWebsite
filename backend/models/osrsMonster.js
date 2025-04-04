const mongoose = require('mongoose')
const Schema = mongoose.Schema


const osrsMonsterSchema = new Schema({


    name: { type: String, required: true },
    combatLevel: { type: String, required: true },
    imageURL: { type: String, required: true, },
    size: { type: String, default: '1x1', },
    attackStyle: { type: String, default: '' },
    attackSpeed: { type: String, default: '', },
    attribute: { type: String, default: ''},
    combatStats: {
        hitpoints: { type: String },
        attack: { type: String },
        strength: { type: String }, 
        defense: { type: String },
        magic: { type: String },
        ranged: { type: String },
    },
    attackBonuses: {
        attack: { type: String },
        strength: { type: String },
        magic: { type: String },
        magicStrength: { type: String },
        ranged: { type: String },
        rangedStrength: { type: String }, 
    },
    defenceBonuses: {
        stab: { type: String },
        slash: { type: String },
        crush: { type: String },
        magic: { type: String },
        elemental: { type: String },
        lightRanged: { type: String },
        mediumRanged: { type: String },
        heavyRanged: { type: String },
    }


})

const osrsMonster = mongoose.model('osrsMonster', osrsMonsterSchema);

module.exports = osrsMonster;