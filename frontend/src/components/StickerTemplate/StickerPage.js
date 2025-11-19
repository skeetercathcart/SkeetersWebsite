import '../../css/stickertemplate.css'
import { useState, useEffect } from 'react'
import Sticker from './Sticker'
import DesignSticker from './DesignSticker'
import SavedSticker from './SavedSticker'



const StickerPage = () => {

    const [addText, setAddText] = useState("Store #2828 \n4550 Pheasant Ridge Dr NE \n(763)-717-0316")
    const [prodText, setProdText] = useState("Name \nSku")
    const [savedStickers, setSavedStickers] = useState([]);

    // Fetch saved designs on page load
    useEffect(() => {
        fetchSavedStickers();
    }, []);

    const fetchSavedStickers = async () => {
        try {
            const res = await fetch("http://localhost:3500/api/getPaginatedDesigns");
            if (!res.ok) throw new Error("Failed to load designs");

            const data = await res.json();

            setSavedStickers(data.designs || []);
        } catch (error) {
            console.error("Error fetching saved designs:", error);
            alert("Failed to fetch saved designs");
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const [name, sku] = prodText.split('\n').map(x => x.trim());
        console.log("name: " + name)
        console.log("sku: " + sku)
        
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
                <p>Saved Stickers</p> 
                <input></input>    
            </div>
            <div className = "next-btns">
                <button> [- </button>
                <div className="sticker-select">
                    {savedStickers.length === 0 && <p>No saved stickers found.</p>}

                    {savedStickers.map((design) => (
                        <SavedSticker 
                            key={design._id}
                            prodText={`${design.name}\n${design.sku}`}
                            addText={addText}
                        />
                    ))}
                </div>
                <button> -] </button>
            </div>

        </div>
    )   
}

export default StickerPage