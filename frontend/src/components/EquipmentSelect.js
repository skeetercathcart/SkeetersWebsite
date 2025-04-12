import '../css/runescapecalc.css'
import OsrsTotalBonus from './OsrsTotalBonus'
import OsrsStyleSelect from './OsrsStyleSelect';
import { useState, useEffect } from 'react'

const EquipmentSelect = ( { totalBonuses, setTotalBonuses, styles, setStyles, activeStyle, setActiveStyle }) => {

    const [head, setHead] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [cape, setCape] = useState()
    const [neck, setNeck] = useState()
    const [ammunition, setAmmunition] = useState()
    const [weapon, setWeapon] = useState()
    const [body, setBody] = useState()
    const [shield, setShield] = useState()
    const [legs, setLegs] = useState()
    const [hands, setHands] = useState()
    const [feet, setFeet] = useState()
    const [ring, setRing] = useState()
    const [itemList, setItemList] = useState([]);
    

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
                    case 'Ammunition': setAmmunition(itemData); break;
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
                    { head ? (
                        <div>
                            <img alt = "head image" src = ''></img>
                        </div> )
                : (
                    <p>no head selected</p>
                )} 
                </div>
                <div className = "item-square cape" id = "Cape">
                    { cape ? (
                        <div>
                            <img alt = "cape image" src = {cape.imageURL}></img>
                        </div> )
                : (
                    <p>no cape selected</p>
                )} 
                </div>
                <div className = "item-square neck" id = "Neck">
                    { neck ? (
                        <div>
                            <img alt = "neck image" src = {neck.imageURL}></img>
                        </div> )
                : (
                    <p>no neck selected</p>
                )} 
                </div>
                <div className = "item-square ammunition" id = "Ammunition">
                    { ammunition ? (
                        <div>
                            <img alt = "ammunition image" src = {ammunition.imageURL}></img>
                        </div> )
                : (
                    <p>no ammunition selected</p>
                )} 
                </div>
                <div className = "item-square weapon" id = "Weapon">
                    { weapon ? (
                        <div>
                            <img alt = "weapon image" src = {weapon.imageURL}></img>
                        </div> )
                : (
                    <p>no weapon selected</p>
                )} 
                </div>
                <div className = "item-square body" id = "Body">
                    { body ? (
                        <div>
                            <img alt = "body image" src = {body.imageURL}></img>
                        </div> )
                : (
                    <p>no body selected</p>
                )} 
                </div>
                <div className = "item-square shield" id = "Shield">
                    { shield ? (
                        <div>
                            <img alt = "shield image" src = {shield.imageURL}></img>
                        </div> )
                : (
                    <p>no shield selected</p>
                )} 
                </div>
                <div className = "item-square legs" id = "Legs">
                    { legs ? (
                        <div>
                            <img alt = "legs image" src = {legs.imageURL}></img>
                        </div> )
                : (
                    <p>no legs selected</p>
                )} 
                </div>
                <div className = "item-square hands" id = "Hands">
                    { hands ? (
                        <div>
                            <img alt = "Hands image" src = {hands.imageURL}></img>
                        </div> )
                : (
                    <p>no Hands selected</p>
                )} 
                </div>
                <div className = "item-square feet" id = "Feet">
                    { feet ? (
                        <div>
                            <img alt = "feet image" src = {feet.imageURL}></img>
                        </div> )
                : (
                    <p>no feet selected</p>
                )} 
                </div>
                <div className = "item-square ring" id = "Ring">
                    { ring ? (
                        <div>
                            <img alt = "ring image" src = {ring.imageURL}></img>
                        </div> )
                : (
                    <p>no ring selected</p>
                )} 
                </div>
            </div>
        
            <div>
            <input
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
                <OsrsTotalBonus bonuses = {totalBonuses}/>
                <OsrsStyleSelect styles = {styles} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle}/>
            </div>
        </div>  
    )
    

}

export default EquipmentSelect;