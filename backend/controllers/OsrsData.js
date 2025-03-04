const Weapon = require('../models/osrsWeapon')

async function createOsrsWeapon (req, res) {
    console.log('entered server side createOsrsWeapon');
    const { name, weaponType, attackStyles, bonuses, isTwoHanded, imageUrl} = req.body;

    console.log('made it past req.body')
    console.log(name)
    console.log(weaponType)
    console.log(attackStyles)

    try {

    
        const weapon = new Weapon({
            name: name,
            weaponType: weaponType,  // Ensure this is `weaponType`, not `type`
            attackStyles: {
                style1: {
                    combatStyle: attackStyles.style1.combatStyle,
                    attackType: attackStyles.style1.attackStyle,  // Ensure this matches field name
                    weaponStyle: attackStyles.style1.weaponStyle,
                    attackSpeed: attackStyles.style1.attackSpeed,
                    levelBoost: attackStyles.style1.levelBoost,
                },
                style2: {
                    combatStyle: attackStyles.style2.combatStyle,
                    attackType: attackStyles.style2.attackStyle,
                    weaponStyle: attackStyles.style2.weaponStyle,
                    attackSpeed: attackStyles.style2.attackSpeed,
                    levelBoost: attackStyles.style2.levelBoost,
                },
                style3: {
                    combatStyle: attackStyles.style3.combatStyle,
                    attackType: attackStyles.style3.attackStyle,
                    weaponStyle: attackStyles.style3.weaponStyle,
                    attackSpeed: attackStyles.style3.attackSpeed,
                    levelBoost: attackStyles.style3.levelBoost,
                },
                style4: {
                    combatStyle: attackStyles.style4.combatStyle,
                    attackType: attackStyles.style4.attackStyle,
                    weaponStyle: attackStyles.style4.weaponStyle,
                    attackSpeed: attackStyles.style4.attackSpeed,
                    levelBoost: attackStyles.style4.levelBoost,
                },
                style5: {
                    combatStyle: attackStyles.style5.combatStyle,
                    attackType: attackStyles.style5.attackStyle,
                    weaponStyle: attackStyles.style5.weaponStyle,
                    attackSpeed: attackStyles.style5.attackSpeed,
                    levelBoost: attackStyles.style5.levelBoost,
                }
            },

            // Maybe reqs dont matter, also hard to scrape

            /* attackRequirements: {
                attack: attReqs.attack,
                strength: attReqs.strength,
                range: attReqs.range,
                magic: attReqs.magic 
            }, */ 

            bonuses: {
                attack: {
                    slash: bonuses.attack.slash,
                    stab: bonuses.attack.stab,
                    crush: bonuses.attack.crush,
                    range: bonuses.attack.range,
                    magic: bonuses.attack.magic 
                },
                defense: {
                    slash: bonuses.defense.slash,
                    stab: bonuses.defense.stab,
                    crush: bonuses.defense.crush,
                    range: bonuses.defense.range,
                    magic: bonuses.defense.magic 
                },
                strength: bonuses.strength ,
                rangeStrength: bonuses.rangeStrength,
                mageStrength: bonuses.mageStrength,
                prayer: bonuses.prayer 
            },
            isTwoHanded: isTwoHanded,
            imageUrl: imageUrl,
        });

        await weapon.save();

        res.status(201).json({"Big Succi" : `New Weapon ${weaponName} Created`})
    } catch (error) {
        console.log('get fucked idiot' + error.message)
        return res.status(500).json({error: "An error occurred while creating a new weapon"})
    }
}

module.exports = { createOsrsWeapon }
