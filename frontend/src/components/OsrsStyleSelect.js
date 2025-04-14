import '../css/devtools.css'



const OsrsStyleSelect = ({styles, activeStyle, setActiveStyle}) => {

    const handleStyleChange = (event) => {
        setActiveStyle(event.currentTarget.value)
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
        </div>
    )

}

export default OsrsStyleSelect
