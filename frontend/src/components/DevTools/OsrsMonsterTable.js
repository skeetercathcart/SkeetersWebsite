import '../../css/devtools.css'
import { useState } from 'react'

const OsrsMonsterTable = ({itemList, fetchItems}) => {

    const [editNameId, setEditNameId] = useState(null)
    const [nameEditInput, setNameEditInput] = useState('')

    const handleNameEditChange = (e) => {
        setNameEditInput(e.target.value)
    }

    const handleNameUpdate = async (itemId, itemName) => {

        console.log("Entering handleNameUpdate with: " + itemId + '   ' + JSON.stringify(itemName))

        try {
            const reqBody = {name: itemName}

            console.log("Attempting to fetch with body of: " + JSON.stringify(reqBody))

            const response = await fetch(`http://localhost:3500/api/updateOsrsMonsterName/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });

            if (!response.ok) {
                throw new Error("Failed to update item name");
        }
        
        fetchItems()
        handleEditToggle(itemId, itemName)
        } catch (error) {
            alert("Error updating monster name: " + error.message)
        }
    }

    
    const handleEditToggle = (itemId, itemName) => {
        setEditNameId(prevId => (prevId === itemId ? null : itemId))
        setNameEditInput(itemName);
    }

    const handleDeleteItem = async(itemId) => {
        try {
            
            const response = await fetch(`http://localhost:3500/api/delOsrsItem/${itemId}`, {
                method: "DELETE",
            });


            if (!response.ok) {
                throw new Error("Failed to delete item");
        }
            fetchItems()
        } catch (error) {
            alert("Error deleting item: " + error.message)
        }
    }

    return (
        <div className = "osrs-monster-table-container">
             <table>
                <tr className = "osrs-item-table-header">
                        <td className = "header-column">Monster Name</td>
                        <td className = "header-column cb">CB Lvl</td>
                        <td className = "header-column cb">HP</td>
                        <td className = "header-column cb">ATK</td>
                        <td className = "header-column cb">STR</td>
                        <td className = "header-column cb">DEF</td>
                        <td className = "header-column cb">MAG</td>
                        <td className = "header-column cb">RAN</td>
                        <td className = "header-column atk">ATK</td>
                        <td className = "header-column atk">STR</td>
                        <td className = "header-column atk">MAG</td>
                        <td className = "header-column atk">mSTR</td>
                        <td className = "header-column atk">RAN</td>
                        <td className = "header-column atk">rSTR</td>
                        <td className = "header-column def">STAB</td>
                        <td className = "header-column def">SLASH</td>
                        <td className = "header-column def">CRUSH</td>
                        <td className = "header-column def">MAG</td>
                        <td className = "header-column def">LRAN</td>
                        <td className = "header-column def">MRAN</td>
                        <td className = "header-column def">HRAN</td>
                    </tr>
                    {itemList.map((monster) => 
                    <tr key = {monster._id} className = "osrs-item-table-row">
                        {editNameId === monster._id ? 
                            (<td className = "item-name-table">
                                <input type = "text" value = {nameEditInput} onChange = {handleNameEditChange}></input>
                                <div className = "edit-btns-container">
                                    <button className = "confirm-btn" onClick={() => handleNameUpdate(monster._id, nameEditInput)}>✔️</button>
                                    <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(monster._id)}>✏️</button> 
                                </div>
                            </td>) 
                            : 
                            (<td className = "item-name-table">{monster.name} <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(monster._id, monster.name)}>✏️</button></td>)
                        } 
                        <td className = "item-stat-td cb">{monster.combatLevel ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.hitpoints ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.attack ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.strength ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.defense ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.magic ?? '-'}</td>
                        <td className = "item-stat-td cb">{monster.combatStats?.ranged ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.attack ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.strength ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.magic ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.magicStrength ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.ranged ?? '-'}</td>
                        <td className = "item-stat-td atk">{monster.attackBonuses?.rangedStrength ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.stab ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.slash ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.crush ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.magic ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.lightRanged ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.mediumRanged ?? '-'}</td>
                        <td className = "item-stat-td def">{monster.defenceBonuses?.heavyRanged ?? '-'}</td>
                        <td className = "delete-btn-td"><button className = "delete-btn" id = 'delete-btn'  onClick = {() => handleDeleteItem(monster._id)}>X</button></td>
                    </tr>)
                    }
             </table>
        </div>
    )
}

export default OsrsMonsterTable