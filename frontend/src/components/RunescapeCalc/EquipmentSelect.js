import '../../css/runescapecalc.css'
import OsrsTotalBonus from './OsrsTotalBonus'
import OsrsStyleSelect from './OsrsStyleSelect';
import { useState, useEffect } from 'react'


const EquipmentSelect = ( { totalBonuses, equipment, setEquipment, setTotalBonuses, styles, setStyles, activeStyle, setActiveStyle, setActiveSpell }) => {


    const unarmed = {
                    name: "unarmed",
                    bonuses: {
                        attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                        defense: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                        strength: 0, 
                        mageStrength: 0, 
                        rangeStrength: 0, 
                        prayer: 0
                    },
                    isTwoHanded: false,
                    imageURL: 'https://oldschool.runescape.wiki/images/Weapon_slot.png?ffed1',
                    attackStyles: {
                        style1: {
                            combatStyle: 'Punch',
                            attackType: 'Crush',
                            weaponStyle: 'Accurate',
                            attackSpeed: "4",
                        },
                        style2: {
                            combatStyle: 'Kick',
                            attackType: 'Crush',
                            weaponStyle: 'Aggressive',
                            attackSpeed: "4",
                        },
                        style3: {
                            combatStyle: 'Block',
                            attackType: 'Crush',
                            weaponStyle: 'Defensive',
                            attackSpeed: "4",
                        },
                        style4: {
                            combatStyle: '',
                            attackType: '',
                            weaponStyle: '',
                            attackSpeed: '',
                        },
                        style5: {
                            combatStyle: '',
                            attackType: '',
                            weaponStyle: '',
                            attackSpeed: '',
                        }
                    }
                }

    const [itemList, setItemList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const attackSpeed = styles[activeStyle].attackSpeed || 0;
    

        useEffect(() => { 
            updateTotalBonuses()
            const getWeaponList = async() => {
                    const allItems = await fetch(process.env.REACT_APP_API_URI + '/api/getAllOsrsItems', 
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json',},
                        });
                    if(!allItems.ok) {
                        throw new Error("Failed to fetch items")
                    }
                    const itemData = await allItems.json();
                    setItemList(itemData)
                }
                getWeaponList();
        },  [equipment]);

        
        const handleSearchTermChange = async (e) => {
            setSearchTerm(searchTerm.slice(searchTerm.length) + e)
        }

        const updateTotalBonuses = () => {

            const newBonuses = {
                attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                defense: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                other: { strength: 0, mageStrength: 0, rangeStrength: 0, prayer: 0 }
            };

            Object.values(equipment).forEach(item => {
                if (item) {
                    const bonuses = item.bonuses || {};
        
                    newBonuses.attack.stab += Number(bonuses.attack?.stab || 0);
                    newBonuses.attack.slash += Number(bonuses.attack?.slash || 0);
                    newBonuses.attack.crush += Number(bonuses.attack?.crush || 0);
                    newBonuses.attack.magic += Number(bonuses.attack?.magic || 0);
                    newBonuses.attack.range += Number(bonuses.attack?.range || 0);
        
                    newBonuses.defense.stab += Number(bonuses.defense?.stab || 0);
                    newBonuses.defense.slash += Number(bonuses.defense?.slash || 0);
                    newBonuses.defense.crush += Number(bonuses.defense?.crush || 0);
                    newBonuses.defense.magic += Number(bonuses.defense?.magic || 0);
                    newBonuses.defense.range += Number(bonuses.defense?.range || 0);
        
                    newBonuses.other.strength += Number(bonuses.strength || 0);
                    newBonuses.other.mageStrength += Number(bonuses.mageStrength || 0);
                    newBonuses.other.rangeStrength += Number(bonuses.rangeStrength || 0);
                    newBonuses.other.prayer += Number(bonuses.prayer || 0);
                }
            });
        
            setTotalBonuses(newBonuses);
        }


        const handleItemSelect = async (event) => {

            let itemData = null;
            handleSearchTermChange(event.target.value);
            const itemName = event.target.value
            const selectedItem = itemList.find(item => item.name === itemName);
            if (selectedItem) {
            
                const itemId = selectedItem._id;
                
            if (!itemId) {
                return;
            }

            try {


                if (!selectedItem.slot) {
             
                    const weaponSelect = await fetch(process.env.REACT_APP_API_URI  + `/api/getWeapon/${itemId}`, 
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json',},
                        });
                if(!weaponSelect) {
                    throw new Error ("Failed to fetch weapon details")
                }

                    itemData = await weaponSelect.json();
                    if(itemData.isTwoHanded === true) {
                        setEquipment(prev => ({...prev, shield: null}))
                    }
                    setEquipment(prev => ({...prev, weapon: itemData}))
                    setStyles(itemData.attackStyles);

                } else {

                    const gearSelect = await fetch(process.env.REACT_APP_API_URI  + `/api/getOsrsGear/${itemId}`, 
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json',},
                        });
                    if(!gearSelect) {
                        throw new Error ("Failed to fetch weapon details")
                    }
    
                    itemData = await gearSelect.json();

                switch (itemData.slot) {
                    case 'Head': setEquipment(prev => ({...prev, head: itemData})); break;
                    case 'Cape': setEquipment(prev => ({...prev, cape: itemData})); break;
                    case 'Neck': setEquipment(prev => ({...prev, neck: itemData})); break;
                    case 'Ammunition': setEquipment(prev => ({...prev, ammunition: itemData})); break;
                    case 'Weapon': setEquipment(prev => ({...prev, weapon: itemData})); break;
                    case 'Body': setEquipment(prev => ({...prev, body: itemData})); break;
                    case 'Shield': if(equipment.weapon.isTwoHanded === true) {setEquipment(prev => ({...prev, weapon: unarmed}))} setEquipment(prev => ({...prev, shield: itemData})); break;
                    case 'Legs': setEquipment(prev => ({...prev, legs: itemData})); break;
                    case 'Hands': setEquipment(prev => ({...prev, hands: itemData})); break;
                    case 'Feet': setEquipment(prev => ({...prev, feet: itemData})); break;
                    case 'Ring': setEquipment(prev => ({...prev, ring: itemData})); break;
                    default: console.warn('Unknown slot:',itemData.slot);
                }
            }

            if (itemData) {
                updateTotalBonuses(itemData);
                setSearchTerm('');
            }

            } catch (error) {
                console.error("Error fetching weapon data", error.message)
            }
        } else {
            return
        }
        }
    
    return (
        <div className = "player-container">
            <div className = "equip-select"> 
                <div className = "item-display">
                <div className = "item-square head" id = "Head">
                    { equipment.head ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, head: null}))}>
                            <img alt = "head image" src = {equipment.head.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "head slot image" src = 'https://oldschool.runescape.wiki/images/Head_slot.png?b0c39'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square cape" id = "Cape">
                    { equipment.cape ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, cape: null}))}>
                            <img alt = "cape image" src = {equipment.cape.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "cape slot image" src = 'https://oldschool.runescape.wiki/images/Cape_slot.png?2cf1e'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square neck" id = "Neck">
                    { equipment.neck ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, neck: null}))}>
                            <img alt = "neck image" src = {equipment.neck.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "neck slot image" src = 'https://oldschool.runescape.wiki/images/Neck_slot.png?5b85d'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square ammunition" id = "Ammunition">
                    { equipment.ammunition ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, aummunition: null}))}>
                            <img alt = "ammunition image" src = {equipment.ammunition.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "neck slot image" src = 'https://oldschool.runescape.wiki/images/Ammo_slot.png?95ab9'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square weapon" id = "Weapon">
                    { equipment.weapon ? (
                        <div className = "active-item" onClick={() => {setEquipment(prev => ({...prev, weapon: unarmed})); setStyles(unarmed.attackStyles); setActiveStyle('style1')}}>
                            <img alt = "weapon image" src = {equipment.weapon.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "weapon slot image" src = 'https://oldschool.runescape.wiki/images/Weapon_slot.png?ffed1'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square body" id = "Body">
                    { equipment.body ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, body: null}))}>
                            <img alt = "body image" src = {equipment.body.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "body slot image" src = 'https://oldschool.runescape.wiki/images/Body_slot.png?5e649'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square shield" id = "Shield">
                    { equipment.shield ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, shield: null}))}>
                            <img alt = "shield image" src = {equipment.shield.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "shield slot image" src = 'https://oldschool.runescape.wiki/images/Shield_slot.png?595b4'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square legs" id = "Legs">
                    { equipment.legs ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, legs: null}))}>
                            <img alt = "legs image" src = {equipment.legs.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "legs slot image" src = 'https://oldschool.runescape.wiki/images/Legs_slot.png?d132b'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square hands" id = "Hands">
                    { equipment.hands ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, hands: null}))}>
                            <img alt = "Hands image" src = {equipment.hands.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "hands slot image" src = 'https://oldschool.runescape.wiki/images/Hands_slot.png?7e1b5'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square feet" id = "Feet">
                    { equipment.feet ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, feet: null}))}>
                            <img alt = "feet image" src = {equipment.feet.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "feet slot image" src = 'https://oldschool.runescape.wiki/images/Feet_slot.png?93de2'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square ring" id = "Ring">
                    { equipment.ring ? (
                        <div className = "active-item" onClick={() => setEquipment(prev => ({...prev, ring: null}))}>
                            <img alt = "ring image" src = {equipment.ring.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "ring slot image" src = 'https://oldschool.runescape.wiki/images/Ring_slot.png?37dd8'></img>
                    </div>
                )} 
                </div>
            </div>
        
            <div>
                <input className = "item-search"
                    type="text"
                    placeholder="Search for an item..."
                    list = "items"
                    value = {searchTerm}
                    onChange = {handleItemSelect}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                />

                {showDropdown && 
                <ul className = "item-dropdown">
                    {itemList.map(item => (
                        <li className = "dropdown-entry" key={item._id}>
                        <img className = "dropdown-image" src = {item.imageURL}></img>
                        <span className = "dropdown-span">{item.name}</span>
                        </li>
                    ))}
                </ul>
                }
            </div>
            </div>
            <div>
                <OsrsTotalBonus bonuses = {totalBonuses} attackSpeed = {attackSpeed}/>
            </div>
        </div>  
    )
    

}

export default EquipmentSelect;