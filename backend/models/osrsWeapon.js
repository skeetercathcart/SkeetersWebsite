const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Weapon Schema
const osrsWeaponSchema = new Schema({
    name: { type: String, required: true, unique: true },
    attackStyles: {
        style1: { 
            combatStyle: {type: String, default: '' },
            attackType: {type: String, default: ''},
            weaponStyle: {type: String, default: ''},
            attackSpeed: {type: String, default: ''},
            levelBoost: {type: String, default: ''}},
        style2: { 
            combatStyle: {type: String, default: '' },
            attackType: {type: String, default: ''},
            weaponStyle: {type: String, default: ''},
            attackSpeed: {type: String, default: ''},
            levelBoost: {type: String, default: ''}},
        style3: { 
            combatStyle: {type: String, default: '' },
            attackType: {type: String, default: ''},
            weaponStyle: {type: String, default: ''},
            attackSpeed: {type: String, default: ''},
            levelBoost: {type: String, default: ''}},
        style4: { 
            combatStyle: {type: String, default: '' },
            attackType: {type: String, default: ''},
            weaponStyle: {type: String, default: ''},
            attackSpeed: {type: String, default: ''},
            levelBoost: {type: String, default: ''}},
        style5: { 
            combatStyle: {type: String, default: '' },
            attackType: {type: String, default: ''},
            weaponStyle: {type: String, default: ''},
            attackSpeed: {type: String, default: ''},
            levelBoost: {type: String, default: ''}},
            
    },
    bonuses: {
        attack: {
            stab: { type: String, default: '0' },
            slash: { type: String, default: '0' },
            crush: { type: String, default: '0' },
            range: { type: String, default: '0' },
            magic: { type: String, default: '0' },
        },
        defense: {
            stab: { type: String, default: '0' },
            slash: { type: String, default: '0' },
            crush: { type: String, default: '0' },
            range: { type: String, default: '0' },
            magic: { type: String, default: '0' },
        },
        strength: { type: String, default: '0' },
        rangeStrength: { type: String, default: '0' },
        mageStrength: { type: String, default: '0'},
        prayer: { type: String, default: '0' },
    },
    isTwoHanded: { type: Boolean, default: false },
    imageURL: { type: String, default: '' }, // URL to weapon image
});

// Create the model
const osrsWeapon = mongoose.model('osrsWeapon', osrsWeaponSchema);

module.exports = osrsWeapon;