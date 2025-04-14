import '../css/devtools.css'
import { useState, useEffect } from 'react';


const DevToolsTable = ( { filter, setFilter }) => {

    const [itemList, setItemList] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(25)
    const [editToggle, setEditToggle] = useState(false)
    const [editNameId, setEditNameId] = useState(null)
    const [nameEditInput, setNameEditInput] = useState('')

    const fetchItems = async () => {
        try { 
            const response = await fetch(`http://localhost:3500/api/getPaginatedOsrsCollection?page=${page}&limit=${limit}`, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ Collection: filter })
            }

            );
            if (!response.ok) {
                throw new Error("Failed to fetch items");
            } 
            const data = await response.json();
            console.log("response: " + JSON.stringify(data))
            setItemList(data.items);
            setTotalPages(Math.ceil(data.total / limit))
        } catch (err) {
            console.log(err.message);
        } 
    };


    useEffect(() => {
        fetchItems();
    }, [filter, page]);


    const handleNameEditChange = (e) => {
        setNameEditInput(e.target.value)
    }

    const handleNameUpdate = async (itemId, itemName) => {

        console.log("Entering handleNameUpdate with: " + itemId + '   ' + JSON.stringify(itemName))

        try {
            const reqBody = {name: itemName}

            console.log("Attempting to fetch with body of: " + JSON.stringify(reqBody))

            const response = await fetch(`http://localhost:3500/api/updateOsrsItemName/${itemId}`, {
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
            alert("Error updating item name: " + error.message)
        }
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

   

    const handleEditToggle = (itemId, itemName) => {
        setEditNameId(prevId => (prevId === itemId ? null : itemId))
        setNameEditInput(itemName);
    }

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (

        

        <div className = 'osrs-items-table-container'> 
            <div>
                <table>
                    <tr className = "osrs-item-table-header">
                        <td className = "item-name-table">Item Name</td>
                        <td className = "header-column">slash</td>
                        <td className = "header-column">crush</td>
                        <td className = "header-column">stab</td>
                        <td className = "header-column">range</td>
                        <td className = "header-column">magic</td>
                        <td className = "header-column">slash</td>
                        <td className = "header-column">crush</td>
                        <td className = "header-column">stab</td>
                        <td className = "header-column">range</td>
                        <td className = "header-column">magic</td>
                        <td className = "header-column">str</td>
                        <td className = "header-column">mStr</td>
                        <td className = "header-column">rStr</td>
                        <td className = "header-column">pray</td>
                    </tr>
                    {itemList.map((item) => 
                    <tr key = {item._id} className = "osrs-item-table-row">
                        {editNameId === item._id ? 
                            (<td className = "item-name-table">
                                <input type = "text" value = {nameEditInput} onChange = {handleNameEditChange}></input>
                                <div className = "edit-btns-container">
                                    <button className = "confirm-btn" onClick={() => handleNameUpdate(item._id, nameEditInput)}>✔️</button>
                                    <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(item._id)}>✏️</button> 
                                </div>
                            </td>) 
                            : 
                            (<td className = "item-name-table">{item.name} <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(item._id, item.name)}>✏️</button></td>)
                        } 
                        <td className = "item-stat-td">{item.bonuses.attack.slash}</td>
                        <td className = "item-stat-td">{item.bonuses.attack.crush}</td>
                        <td className = "item-stat-td">{item.bonuses.attack.stab}</td>
                        <td className = "item-stat-td">{item.bonuses.attack.range}</td>
                        <td className = "item-stat-td">{item.bonuses.attack.magic}</td>
                        <td className = "item-stat-td">{item.bonuses.defense.slash}</td>
                        <td className = "item-stat-td">{item.bonuses.defense.crush}</td>
                        <td className = "item-stat-td">{item.bonuses.defense.stab}</td>
                        <td className = "item-stat-td">{item.bonuses.defense.range}</td>
                        <td className = "item-stat-td">{item.bonuses.defense.magic}</td>
                        <td className = "item-stat-td">{item.bonuses.strength}</td>
                        <td className = "item-stat-td">{item.bonuses.rangeStrength}</td>
                        <td className = "item-stat-td">{item.bonuses.mageStrength}</td>
                        <td className = "item-stat-td">{item.bonuses.prayer}</td>
                        <td className = "delete-btn-td"><button className = "delete-btn" id = 'delete-btn'  onClick = {() => handleDeleteItem(item._id)}>X</button></td>
                    </tr>)
                    }
                </table>
                <div className = "pagination-bar">
                        <button className = "dev-tool-btn" id = 'prev-btn' onClick = {prevPage}>prev</button>
                        <div id = 'current-page'>{page}</div>
                        <div id = 'slash'> / </div>
                        <div id = 'page-total'>{totalPages}</div>
                        <button className = "dev-tool-btn" id = 'next-btn' onClick = {nextPage}>next</button>
                </div>
            </div>
        </div>


    )


}

export default DevToolsTable;