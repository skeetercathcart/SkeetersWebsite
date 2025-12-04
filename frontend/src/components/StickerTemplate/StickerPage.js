import '../../css/stickertemplate.css'
import { useState, useEffect } from 'react'
import Sticker from './Sticker'
import DesignSticker from './DesignSticker'
import SavedSticker from './SavedSticker'



const StickerPage = () => {

    const [addText, setAddText] = useState("Store #2828 \n4550 Pheasant Ridge Dr NE \n(763)-717-0316")
    const [prodText, setProdText] = useState("Name \nSku")
    const [allStickers, setAllStickers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const pageSize = 8;

    // Filters saved designs based on search term. Matches name or sku
    const filteredStickers = allStickers.filter(design =>
    design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const maxPages = Math.ceil(filteredStickers.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    
    // Fetch saved designs on page load
    useEffect(() => {
        fetchAllStickers();
    }, [])

    // Sets the page to 1 when search bar is used so the saved designs don't go blank if you start a search in the middle of the paginated results
    useEffect(() => {
        setPage(1)
    }, [searchTerm])

    // Handles search bar query
    const handleSearchTermChange = async (e) => {
            setSearchTerm(searchTerm.slice(searchTerm.length) + e.target.value)
    }



    // Gets all sticker from the database 
    const fetchAllStickers = async () => {
        try {
            const res = await fetch(`http://localhost:3500/api/getAllStickerDesigns`);
            if (!res.ok) throw new Error("Failed to load all designs");

            const data = await res.json();

            setAllStickers(data|| []);
        } catch (error) {
            console.error("Error fetching saved all designs:", error);
            alert("Failed to fetch all saved designs");
        }
    };


    // Saves design to the database
    const handleSubmit = async(e) => {
        e.preventDefault();

        const [name, sku] = prodText.split('\n').map(x => x.trim());
        
       try {
            const reqBody = {
            name: name,
            sku: sku
        }

            const response = await fetch(`http://localhost:3500/api/addDesign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });
            if (!response.ok) {
                throw new Error("Failed to update design");
        }} catch (error) {
            alert("Error updating design: " + error.message)
        }
    }

    const handleNextPage = () => {
        if (page < maxPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className = "sticker-container">
            <div className = "sticker-design">
                <DesignSticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></DesignSticker>
                <button onClick = {handleSubmit} className = "save-btn"> Save Design </button>
            </div>
            <div className="sticker-sheet">
                {Array.from({ length: 14 }).map((_, i) => (
                    <Sticker key={i} prodText={prodText} addText={addText} />
                ))}    
            </div>
            <div className = "sticker-search">
                <p className = "sticker-title">Saved Stickers</p> 
                <input className = "item-search"
                    type="text"
                    placeholder="Search for a design"
                    list = "items"
                    value = {searchTerm}
                    onChange = {handleSearchTermChange}
                />    
            </div>
            <div className = "next-btns">
                <button className = "page-btn" onClick = {handlePrevPage}> 🢀 </button>
                <div className="sticker-select">
                
                    {filteredStickers.slice(startIndex, endIndex).map(design => (
                        <div className="sticker-cell" key={design._id}>
                            <SavedSticker 
                                prodText={`${design.name}\n${design.sku}`}
                                setProdText={setProdText}
                                addText={addText}
                                setAddText={setAddText}
                            />
                        </div>
                    ))}

                </div>
                <button className = "page-btn" onClick = {handleNextPage}> 🢂 </button>
            </div>

        </div>
    )   
}

export default StickerPage