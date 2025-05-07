import '../../css/runescapecalc.css'
import OsrsTotalBonus from './OsrsTotalBonus'
import OsrsStyleSelect from './OsrsStyleSelect';
import { useState, useEffect } from 'react'

const EquipmentSelect = ( { totalBonuses, setTotalBonuses, styles, setStyles, activeStyle, setActiveStyle }) => {

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
    const [head, setHead] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [cape, setCape] = useState(null)
    const [neck, setNeck] = useState(null)
    const [ammunition, setAmmunition] = useState(null)
    const [weapon, setWeapon] = useState(unarmed)
    const [body, setBody] = useState(null)
    const [shield, setShield] = useState(null)
    const [legs, setLegs] = useState(null)
    const [hands, setHands] = useState(null)
    const [feet, setFeet] = useState(null)
    const [ring, setRing] = useState(null)
    const [itemList, setItemList] = useState([]);
    const attackSpeed = styles[activeStyle].attackSpeed || 0;
    

        useEffect(() => { 
            updateTotalBonuses()
            const getWeaponList = async() => {
                    const allItems = await fetch('http://localhost:3500/api/getAllOsrsItems', 
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json',},
                        });
                    if(!allItems.ok) {
                        throw new Error("Failed to fetch items")
                    }
                    const itemData = await allItems.json();
                    console.log('itemData: ' + JSON.stringify(itemData));
                    setItemList(itemData)
                }
                getWeaponList();
        },  [head, cape, neck, ammunition, weapon, body, shield, legs, hands, feet, ring]);

        
        const handleSearchTermChange = async (e) => {
            setSearchTerm(searchTerm.slice(searchTerm.length) + e)
        }

        const updateTotalBonuses = () => {

            console.log("entering updateTotalBonuses")
            const allItems = [head, cape, neck, ammunition, weapon, body, shield, legs, hands, feet, ring];

            const newBonuses = {
                attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                defense: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                other: { strength: 0, mageStrength: 0, rangeStrength: 0, prayer: 0 }
            };

            allItems.forEach(item => {
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
            console.log('current search term: ' + searchTerm);
            handleSearchTermChange(event.target.value);
            console.log('updated search term: ' + searchTerm)
            console.log("event value: " + event.target.value)
            const itemName = event.target.value

            console.log('finding selected item: ' + itemName)
            const selectedItem = itemList.find(item => item.name === itemName);
            if (selectedItem) {

            
            const itemId = selectedItem._id;

            console.log("item slot: " + !selectedItem.slot)

           
            if (!itemId) {
                return;
            }

            try {


                if (!selectedItem.slot) {

                console.log('Fetching a weapon')
                
                const weaponSelect = await fetch(`http://localhost:3500/api/getWeapon/${itemId}`, 
                    {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json',},
                    });
                if(!weaponSelect) {
                    throw new Error ("Failed to fetch weapon details")
                }

                itemData = await weaponSelect.json();
                console.log('Weapon Data: ' + JSON.stringify(itemData))
                setWeapon(itemData); 
                setStyles(itemData.attackStyles);
                console.log('current weapon styles: ' + JSON.stringify(styles))
                } else {

                    console.log('Fetching non-weapon')

                    const gearSelect = await fetch(`http://localhost:3500/api/getOsrsGear/${itemId}`, 
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json',},
                        });
                    if(!gearSelect) {
                        throw new Error ("Failed to fetch weapon details")
                    }
    
                    itemData = await gearSelect.json();
                    console.log('Weapon Data: ' + JSON.stringify(itemData))
                switch (itemData.slot) {
                    case 'Head': setHead(itemData); break;
                    case 'Cape': setCape(itemData); break;
                    case 'Neck': setNeck(itemData); break;
                    case 'Ammo': setAmmunition(itemData); break;
                    case 'Weapon': setWeapon(itemData); break;
                    case 'Body': setBody(itemData); break;
                    case 'Shield': setShield(itemData); break;
                    case 'Legs': setLegs(itemData); break;
                    case 'Hands': setHands(itemData); break;
                    case 'Feet': setFeet(itemData); break;
                    case 'Ring': setRing(itemData); break;
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

        console.log("weapon: " + JSON.stringify(weapon))
    
    return (
        <div className = "player-container">
            <div className = "equip-select"> 
                <div className = "item-display">
                <div className = "item-square head" id = "Head">
                    { head ? (
                        <div className = "active-item" onClick={() => setHead(null)}>
                            <img alt = "head image" src = {head.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "head slot image" src = 'https://oldschool.runescape.wiki/images/Head_slot.png?b0c39'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square cape" id = "Cape">
                    { cape ? (
                        <div className = "active-item" onClick={() => setCape(null)}>
                            <img alt = "cape image" src = {cape.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "cape slot image" src = 'https://oldschool.runescape.wiki/images/Cape_slot.png?2cf1e'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square neck" id = "Neck">
                    { neck ? (
                        <div className = "active-item" onClick={() => setNeck(null)}>
                            <img alt = "neck image" src = {neck.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "neck slot image" src = 'https://oldschool.runescape.wiki/images/Neck_slot.png?5b85d'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square ammunition" id = "Ammunition">
                    { ammunition ? (
                        <div className = "active-item" onClick={() => setAmmunition(null)}>
                            <img alt = "ammunition image" src = {ammunition.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "neck slot image" src = 'https://oldschool.runescape.wiki/images/Ammo_slot.png?95ab9'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square weapon" id = "Weapon">
                    { weapon ? (
                        <div className = "active-item" onClick={() => {setWeapon(unarmed); setStyles(unarmed.attackStyles); setActiveStyle('style1')}}>
                            <img alt = "weapon image" src = {weapon.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "weapon slot image" src = 'https://oldschool.runescape.wiki/images/Weapon_slot.png?ffed1'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square body" id = "Body">
                    { body ? (
                        <div className = "active-item" onClick={() => setBody(null)}>
                            <img alt = "body image" src = {body.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "body slot image" src = 'https://oldschool.runescape.wiki/images/Body_slot.png?5e649'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square shield" id = "Shield">
                    { shield ? (
                        <div className = "active-item" onClick={() => setShield(null)}>
                            <img alt = "shield image" src = {shield.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "shield slot image" src = 'https://oldschool.runescape.wiki/images/Shield_slot.png?595b4'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square legs" id = "Legs">
                    { legs ? (
                        <div className = "active-item" onClick={() => setLegs(null)}>
                            <img alt = "legs image" src = {legs.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "legs slot image" src = 'https://oldschool.runescape.wiki/images/Legs_slot.png?d132b'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square hands" id = "Hands">
                    { hands ? (
                        <div className = "active-item" onClick={() => setHands(null)}>
                            <img alt = "Hands image" src = {hands.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "hands slot image" src = 'https://oldschool.runescape.wiki/images/Hands_slot.png?7e1b5'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square feet" id = "Feet">
                    { feet ? (
                        <div className = "active-item" onClick={() => setFeet(null)}>
                            <img alt = "feet image" src = {feet.imageURL}></img>
                        </div> )
                : (
                    <div>
                        <img alt = "feet slot image" src = 'https://oldschool.runescape.wiki/images/Feet_slot.png?93de2'></img>
                    </div>
                )} 
                </div>
                <div className = "item-square ring" id = "Ring">
                    { ring ? (
                        <div className = "active-item" onClick={() => setRing(null)}>
                            <img alt = "ring image" src = {ring.imageURL}></img>
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
                onChange={handleItemSelect}
            />

            <datalist id="items">
                {itemList.map(item => (
                    <option key={item._id} value={item.name} />
                ))}
            </datalist>
            </div>
            </div>
            <div>
                <OsrsTotalBonus bonuses = {totalBonuses} attackSpeed = {attackSpeed}/>
                <OsrsStyleSelect styles = {styles} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle}/>
            </div>
        </div>  
    )
    

}

export default EquipmentSelect;