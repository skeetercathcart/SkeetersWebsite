import '../../css/devtools.css'
import { useState } from 'react';



const OsrsAddSpellForm = () => {

    const [spellName, setSpellName] = useState("");
    const [spellLevel, setSpellLevel] = useState("");
    const [spellImageURL, setSpellImageURL] = useState("");
    const [spellMaxHit, setSpellMaxHit] = useState("");
    const [spellbook, setSpellbook] = useState("Standard");
    const [spellElement, setSpellElement] = useState("None");
    const [spellClass, setSpellClass] = useState("None");


    const handleNameChange = (event) => {
        const newSpellName = event.target.value;
        setSpellName(newSpellName)
    }

    const handleLevelChange = (event) => {
        const newSpellLevel = event.target.value;
        setSpellLevel(newSpellLevel)
    }

    const handleImageChange = (event) => {
        const newImageURL = event.target.value;
        setSpellImageURL(newImageURL);
    }

    const handleMaxHitChange = (event) => {
        const newMaxHit = event.target.value;
        setSpellMaxHit(newMaxHit);
    }

    
    const handleSpellbookChange = (event) => {
        const newSpellbook = event.target.value;
        // Reset the Element and Class State to None when the spellbook changes
        const resetSpellElement = "None";
        const resetSpellClass = "None";

        setSpellbook(newSpellbook);
        setSpellElement(resetSpellElement);
        setSpellClass(resetSpellClass);
    }

    const handleElementChange = (event) => {
        const newElement = event.target.value;
        setSpellElement(newElement);
    }

    const handleClassChange = (event) => {
        const newSpellClass = event.target.value;
        setSpellClass(newSpellClass);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        

       try {
            const reqBody = {
            name: spellName,
            requiredLevel: spellLevel,
            imageURL: spellImageURL,
            maxHit: spellMaxHit,
            spellClass: spellClass,
            spellbook: spellbook,
            element: spellElement
        }

            const response = await fetch(`http://localhost:3500/api/addOsrsSpell`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });
            if (!response.ok) {
                throw new Error("Failed to update item name");
        }} catch (error) {
            alert("Error updating item name: " + error.message)
        }
    }

    return (
        <div className = 'spell-form-container'>
            <form class = "spell-form" onSubmit = { handleSubmit }>
                <input type = "text" placeholder = "Name" onChange = {handleNameChange}></input>
                <input type = "text" placeholder = "Level" onChange = {handleLevelChange}></input>
                <input type = "text" placeholder = "Image URL" onChange = {handleImageChange}></input>
                <input type = "text" placeholder = "Max Hit" onChange = {handleMaxHitChange}></input>
                <select onChange = {handleSpellbookChange}> 
                    <option value = "Standard">Standard</option>
                    <option value = "Ancient">Ancient</option>
                    <option value = "Lunar">Lunar</option>
                    <option value = "Arceuus">Arceuus</option>
                </select>
                {spellbook === "Standard" && 
                    <>
                        <select onChange = {handleClassChange}> 
                            <option value = "None">None</option>
                            <option value = "Strike">Strike</option>
                            <option value = "Bolt">Bolt</option>
                            <option value = "Blast">Blast</option>
                            <option value = "Wave">Wave</option>
                            <option value = "Surge">Surge</option>
                        </select>
                        <select onChange = {handleElementChange}>
                            <option value = "None">None</option>
                            <option value = "Air">Air</option>
                            <option value = "Water">Water</option>
                            <option value = "Earth">Earth</option>
                            <option value = "Fire">Fire</option> 
                        </select>
                    </>
                }
                {spellbook === "Ancient" && 
                    <select onChange = {handleClassChange}> 
                        <option value = "Smoke">Smoke</option>
                        <option value = "Shadow">Shadow</option>
                        <option value = "Blood">Blood</option>
                        <option value = "Ice">Ice</option>       
                    </select>
                }
                
                <button type = "submit">Submit</button>
            </form>
        </div>
    )
    
}

export default OsrsAddSpellForm