const mongoose = require('mongoose')
const Schema = mongoose.Schema


const osrsMonsterSchema = new Schema({


    name: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true, },
    size: { type: String, required: true, },
    attackStyle: { type: String, required: true },
    attackSpeed: { type: String, required: true, },
    attribute: { type: String, default: ''},
    combatStats: {
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

module.export = osrsMonster;