import '../css/devtools.css'
import { useState, useEffect } from 'react';


const DevToolsOsrsItems = () => {



    const [itemList, setItemList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit, setLimit] = useState(25)
    const [editToggle, setEditToggle] = useState(false)
    const [editNameId, setEditNameId] = useState(null)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`https://skeeterswebsite.onrender.com/api/getPaginatedItems?page=${page}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                setItemList(data.items);
                setTotalPages(Math.ceil(data.total / limit))
            } catch (err) {
                console.log(err.message);
            } 
        };

        fetchItems();
    }, [page]);

    const handleDeleteItem = async(itemId) => {
        try {
            const response = await fetch(`https://skeeterswebsite.onrender.com/api/delOsrsItem/${itemId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete item");
        }

            setItemList((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (error) {
            alert("Error deleting item: " + error.message)
        }
    }

    const handleEditToggle = (itemId) => {
        
        setEditNameId(prevId => (prevId === itemId ? null : itemId))
    }

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <div className = "center">
            <div className = "main-container">
                <input className = "search-bar" type = 'text' id = 'search' placeholder = 'Search Items'></input>
                <div className = "filter-bar">Filters
                    <select>
                        <option value = "All">All</option>
                        <option value = "Head">Head</option>
                        <option value = "Cape">Cape</option>
                        <option value = "Amulet">Amulet</option>
                        <option value = "Ammo">Ammo</option>
                        <option value = "Weapon">Weapon</option>
                        <option value = "Body">Body</option>
                        <option value = "Shield">Shield</option>
                        <option value = "Legs">Legs</option>
                        <option value = "Gloves">Gloves</option>
                        <option value = "Boots">Boots</option>
                        <option value = "Ring">Ring</option>
                    </select>
                </div>
                <div className = 'table-header'>
                <div className = "result">
                            <div className = "item-name"> Item Name </div>
                            <div className = "stats" id = 'a-slash'>Slash</div>
                            <div className = "stats" id = 'a-crush'>Crush</div>
                            <div className = "stats" id = 'a-stab'>Stab</div>
                            <div className = "stats" id = 'a-range'>Range</div>
                            <div className = "stats" id = 'a-magic'>Mage</div>
                            <div className = "stats" id = 'd-slash'>Slash</div>
                            <div className = "stats" id = 'd-crush'>Crush</div>
                            <div className = "stats" id = 'd-stab'>Stab</div>
                            <div className = "stats" id = 'd-range'>Range</div>
                            <div className = "stats" id = 'd-magic'>Mage</div>
                            <div className = "stats" id = 'str'>Str</div>
                            <div className = "stats" id = 'rangeStr'>rStr</div>
                            <div className = "stats" id = 'mageStr'>mStr</div>
                            <div className = "stats" id = 'prayer'>Pray</div>
                            <div className = "stats">Del</div>
                        </div>

                </div>
                <div id = "results">
                    {itemList.map((item) => 
                        <div key = {item._id} className = "result">
                            {editNameId === item._id ?
                            (<div className = "item-name">
                                <input className = "edit-name" type = 'text' value = {item.name}></input>
                                <button className = "confirm-btn">✔️</button>
                                <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(item._id)}>✏️</button>
                            </div>) :
                            (<div className = "item-name"> {item.name} <button className = "edit-btn" id = 'edit-btn' onClick = {() => handleEditToggle(item._id)}>✏️</button></div>)
                            
                            }
                            <div className = "stats" id = 'a-slash'>{item.bonuses.attack.slash}</div>
                            <div className = "stats" id = 'a-crush'>{item.bonuses.attack.crush}</div>
                            <div className = "stats" id = 'a-stab'>{item.bonuses.attack.stab}</div>
                            <div className = "stats" id = 'a-range'>{item.bonuses.attack.range}</div>
                            <div className = "stats" id = 'a-magic'>{item.bonuses.attack.magic}</div>
                            <div className = "stats" id = 'd-slash'>{item.bonuses.defense.slash}</div>
                            <div className = "stats" id = 'd-crush'>{item.bonuses.defense.crush}</div>
                            <div className = "stats" id = 'd-stab'>{item.bonuses.defense.stab}</div>
                            <div className = "stats" id = 'd-range'>{item.bonuses.defense.range}</div>
                            <div className = "stats" id = 'd-magic'>{item.bonuses.defense.magic}</div>
                            <div className = "stats" id = 'str'>{item.bonuses.strength}</div>
                            <div className = "stats" id = 'rangeStr'>{item.bonuses.rangeStrength}</div>
                            <div className = "stats" id = 'mageStr'>{item.bonuses.mageStrength}</div>
                            <div className = "stats" id = 'prayer'>{item.bonuses.prayer}</div>
                            <button className = "delete-btn" id = 'delete-btn'  onClick = {() => handleDeleteItem(item._id)}>X</button>
                            
                        </div>
                    )}
                </div>
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

export default DevToolsOsrsItems