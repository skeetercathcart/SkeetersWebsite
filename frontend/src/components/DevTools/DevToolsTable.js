import '../../css/devtools.css'
import OsrsItemTable from './OsrsItemTable';
import OsrsMonsterTable from './OsrsMonsterTable';
import { useState, useEffect } from 'react';


const DevToolsTable = ( { filter, setFilter }) => {

    const [itemList, setItemList] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(25)

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };
    

    const fetchItems = async () => {
        try { 
            const response = await fetch(`http://localhost:3500/api/getPaginatedOsrsCollection?page=${page}&limit=${limit}`, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ Collection: filter })
            }

            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            } 
            const data = await response.json();
            setItemList(data.items);
            setTotalPages(Math.ceil(data.total / limit))
        } catch (err) {
            console.log(err.message);
        } 
    };


    useEffect(() => {
        fetchItems();
    }, [filter, page]);


    return (
        <div>
            { (filter === "osrsWeapon" || filter === "osrsGear") && 
            <OsrsItemTable itemList = {itemList} fetchItems = {fetchItems} /> }
            { (filter === "osrsMonster") && 
            <OsrsMonsterTable itemList = {itemList} fetchItems = {fetchItems} /> }
            <div className = "pagination-bar">
                <button className = "dev-tool-btn" id = 'prev-btn' onClick = {prevPage}>prev</button>
                <div id = 'current-page'>{page}</div>
                <div id = 'slash'> / </div>
                <div id = 'page-total'>{totalPages}</div>
                <button className = "dev-tool-btn" id = 'next-btn' onClick = {nextPage}>next</button>
            </div>
            
        </div>
        
    )

}

export default DevToolsTable;