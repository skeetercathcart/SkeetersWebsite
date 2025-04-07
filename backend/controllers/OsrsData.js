const Weapon = require('../models/osrsWeapon')
const Gear = require('../models/osrsGear')
const OsrsMonster = require('../models/osrsMonster')


// OSRS Weapon
async function createOsrsWeapon (req, res) {

    const { name, attackStyles, bonuses, isTwoHanded, imageURL} = req.body;

    try {

        const weapon = new Weapon({
            name: name,
            attackStyles: attackStyles,
            bonuses: bonuses,
            isTwoHanded: isTwoHanded,
            imageURL: imageURL,
        });

        await weapon.save();

        console.log(`New Weapon ${name} Created`)
        res.status(201).json({"Great Success!" : `New Weapon ${name} Created`})
    } catch (error) {
        console.log('Failed to create new weapon  ' + error.message)
        return res.status(500).json({error: "An error occurred while creating a new weapon"})
    }
}

async function getOsrsWeapon (req, res) {

    console.log('Entering getOsrsWeapon')

    try {
        const weapon = await Weapon.findOne();
        if(!weapon) {
            return res.status(404).json({ message: "Weapon not found"})
        }
        console.log('Weapon Found. Returning: ' + JSON.stringify(weapon))
        res.status(200).json(weapon)
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }

}

async function getOsrsWeaponNames (req, res) {
    console.log('Entering getOsrsWeaponNames')

    try {
        const weaponNames = await Weapon.find({}, {name: 1});
        if(!weaponNames) {
            return res.status(404).json({message: "No Weapon names found"})
        }
        console.log("Weapon names found");
        res.status(200).json(weaponNames);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

async function getOsrsWeaponById (req, res) {
    console.log('Entering getOsrsWeaponById')

    try {
        const { id } = req.params
        const weaponData = await Weapon.findById(id);
        if(!weaponData) {
            return res.status(404).json({message: "Weapon Data Not Found"})
        }
        console.log("Weapon Data Found");
        res.status(200).json(weaponData);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// OSRS Gear

async function createOsrsGear (req, res) {
    
    const { name, bonuses, imageURL, slot} = req.body;

    try {

        const gear = new Gear({
            name: name,
            bonuses: bonuses,
            imageURL: imageURL,
            slot: slot
        });

        await gear.save();

        console.log(`New Gear ${name} Created`)
        res.status(201).json({"Great Success!" : `New Gear ${name} Created`})
    } catch (error) {
        console.log('Failed to create new gear  ' + error.message)
        return res.status(500).json({error: "An error occurred while creating a new gear"})
    }
}

// Get a non-weapon item

async function getOsrsGearById (req, res) {
    console.log('Entering getOsrsGearById')

    try {
        const { id } = req.params
        const weaponData = await Gear.findById(id);
        if(!weaponData) {
            return res.status(404).json({message: "Gear Data Not Found"})
        }
        console.log("Gear Data Found");
        res.status(200).json(weaponData);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// Deletes both weapons and non-weapons

async function deleteOsrsItem (req, res) {
    console.log('Entering deleteOsrsItem');

    try {
        const { id } = req.params;

        const weaponCheck = await Weapon.findByIdAndDelete(id);
        if(weaponCheck) { 
            return res.status(200).json({message: 'Weapon Deleted'})
        } else if (!weaponCheck) {
            const gearCheck = await Gear.findByIdAndDelete(id)
            if (gearCheck) {
                return res.status(200).json({message: 'Gear Deleted'})
            }
        }

        return res.status(404).json({message: "Item not found to be deleted"})

    } catch (error) {
        console.log("Failed to delete OsrsItem " + error.message)
        return res.status(500).json({error: "An error occured while deleting osrs item"})
    }
    
}

// Returns paginated results for viewing both weapons and non-weapons

async function getPaginatedOsrsItems (req, res) {
    console.log('Entering getPaginatedOsrsItems')

    try{
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;

        const items = await Weapon.aggregate([
            { $unionWith: {coll: "osrsgears"} },
            { $sort: {name: 1} },
            { $skip: skip },
            { $limit: Number(limit)}
        ])

        const total = (await Weapon.countDocuments()) + (await Gear.countDocuments());

        return res.status(200).json({ total, page: Number(page), limit: Number(limit), items})



    } catch (error) {
        return res.status(500).json({message: "Error trying to fetch osrs items paginated"})
    }

}

// Gets all weapons and non-weapons in non-paginated form
async function getAllOsrsItems (req, res) {
    console.log('Entering getAllOsrsItems')

    try {
        const allItems = await Gear.aggregate([
            { $unionWith: { coll: "osrsweapons" } },
            { $project: { _id: 1, name: 1, slot: 1 } }
        ]);
        return res.status(200).json(allItems)


    } catch (error) {
        console.log('Error fetching all osrs items: ' + error.message)
        return res.status(500).json({message: "Error trying to fetch all items"})
    }
}

// Updates the name of an existing weapon or non-weapon

async function updateOsrsItemName (req, res) {
    console.log ('Entering updateOsrsItemName')

    try { 
        const { id } = req.params;
        const { name } = req.body;
        let osrsItem;

        console.log("Item ID: " + id)
        console.log("Item Name: " + name)

        osrsItem = await Weapon.findByIdAndUpdate(
            id, { name: name }, { new: true }
        ) 

        if (osrsItem) {
            console.log("weapon found")
        }
        

        if (!osrsItem) {
            console.log('weapon not found. looking for gear')
            osrsItem = await Gear.findByIdAndUpdate(
                id, { name: name }, { new: true }
            )
        }

        if (!osrsItem) {
            console.log('unable to find weapon or gear')
            return res.status(404).json({message: "unable to find osrs item with id: " + id})
        } else {
            console.log("Successfully updated item with id: " + id)
            return res.status(200).json({message: "Successfully updated item with id: " + id})
        }

    } catch (error) {
        console.log('Error updating osrs item name: ' + error.message)
        return res.status(500).json({message: "Error updating osrs item name"})
    }
}


// OSRS Monsters

async function createOsrsMonster (req, res) {
    console.log('Entering createOsrsMonster');

    const { name, combatLevel, imageURL, size, attackStyle, attackSpeed, attribute, combatStats, attackBonuses, defenceBonuses } = req.body;

    try {

        const newMonster = new OsrsMonster({
            name: name,
            combatLevel: combatLevel,
            imageURL: imageURL,
            size: size,
            attackStyle: attackStyle,
            attackSpeed: attackSpeed,
            attribute: attribute,
            combatStats: combatStats,
            attackBonuses: attackBonuses,
            defenceBonuses: defenceBonuses
        });

        await newMonster.save();

        console.log(`New Monster ${name} Created`)
        res.status(201).json({"Great Success!" : `New Monster ${name} Created`})
    } catch (error) {
        console.log('Failed to create new OSRS Monster  ' + error.message)
        return res.status(500).json({error: "An error occurred while creating a new OSRS monster"})
    }




}

async function getAllOsrsMonsters (req, res) {

    console.log('Entering getAllOsrsMonsters')

    try {
        const allMonsters = await OsrsMonster.find().sort({ name: 1 })
        return res.status(200).json(allMonsters)


    } catch (error) {
        console.log('Error fetching all OSRS monsters: ' + error.message)
        return res.status(500).json({message: "Error trying to fetch all OSRS monsters"})
    }


}


module.exports = { createOsrsWeapon, getOsrsWeapon, getOsrsWeaponNames, getOsrsWeaponById, createOsrsGear, 
                   deleteOsrsItem, getPaginatedOsrsItems, getAllOsrsItems, getOsrsGearById, updateOsrsItemName,
                   createOsrsMonster, getAllOsrsMonsters }
