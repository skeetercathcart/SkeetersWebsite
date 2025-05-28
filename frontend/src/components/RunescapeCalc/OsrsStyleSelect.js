import '../../css/runescapecalc.css'
import { useState, useEffect } from 'react'



const OsrsStyleSelect = ({styles, activeStyle, setActiveStyle, setActiveSpell}) => {


    const [allSpells, setAllSpells] = useState([]);

    useEffect(() => {

        const getSpellsList = async() => {  
            const allSpells = await fetch(process.env.REACT_APP_API_URI + '/api/getAllOsrsSpells',
                {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json',},
                }
            );
            if(!allSpells.ok) {
                throw new Error("Failed to Fetch Spell Data")
            }
            const spellData = await allSpells.json();
            setAllSpells(spellData)
            const defaultSpell = spellData[0]
            setActiveSpell(defaultSpell)
         
        }
        getSpellsList()
        
        
    }, [])

    const handleStyleChange = (event) => {
        setActiveStyle(event.currentTarget.value)
    }

    const handleSpellChange = (event) => {
        const newActiveSpell = event.target.value;
        const selectedSpell = allSpells.find(spell => spell.name === newActiveSpell);
        setActiveSpell(selectedSpell);
    }

    return (
        <div className = "style-select-container">
            {styles.style1.combatStyle && 
            (<>
            <button value = "style1" className={`style-option ${activeStyle === "style1" ? "active-style" : ""}`} onClick = {handleStyleChange}>
                <p>{styles.style1.combatStyle}</p>
                <p>{styles.style1.attackType}, {styles.style1.weaponStyle}</p>
            </button>
            </>) }
            {styles.style2.combatStyle && 
            (<>
            <button value = "style2" className={`style-option ${activeStyle === "style2" ? "active-style" : ""}`} onClick = {handleStyleChange}>
                <p>{styles.style2.combatStyle}</p>
                <p>{styles.style2.attackType}, {styles.style2.weaponStyle}</p>
            </button>
            </>) }
            {styles.style3.combatStyle && 
            (<>
            <button value = "style3" className={`style-option ${activeStyle === "style3" ? "active-style" : ""}`} onClick = {handleStyleChange}>
                <p>{styles.style3.combatStyle}</p>
                <p>{styles.style3.attackType}, {styles.style3.weaponStyle}</p>
            </button>
            </>) }
            
            {styles.style4.combatStyle && 
            (<>
            <button value = "style4" className={`style-option ${activeStyle === "style4" ? "active-style" : ""}`} onClick = {handleStyleChange}>
                <p>{styles.style4.combatStyle}</p>
                <p>{styles.style4.attackType}, {styles.style4.weaponStyle}</p>
            </button>
            </>) } 
            {styles.style5.combatStyle && 
            (<>
            <button value = "style5" className={`style-option ${activeStyle === "style5" ? "active-style" : ""}`} onClick = {handleStyleChange}>
                <p>{styles.style5.combatStyle}</p>
                <p>{styles.style5.attackType}, {styles.style5.weaponStyle}</p>
            </button>
            </>) }
            {styles[activeStyle].combatStyle && styles[activeStyle].combatStyle === "Spell" &&
                <button className = "spell-select"> Spell:
                    <select onChange = {handleSpellChange}>
                        {allSpells && 
                            allSpells.map(spell => (
                                <option key = {spell._id} value = {spell.name}><img src = {spell.imageURL}></img>{spell.name}</option>
                            ))
                        }
                    </select>
                </button>
            }
        </div>
    )

}

export default OsrsStyleSelect
