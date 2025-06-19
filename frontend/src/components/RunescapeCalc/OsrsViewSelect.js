import '../../css/runescapecalc.css'
import EquipmentSelect from './EquipmentSelect'
import OsrsStatSelect from './OsrsStatSelect'
import OsrsStyleSelect from './OsrsStyleSelect'

import { useState, useEffect } from 'react'

const OsrsViewSelect = ( { potionBoost, setPotionBoost, stats, setStats, equipment, setEquipment, totalBonuses, setTotalBonuses, styles, setStyles, activeStyle, setActiveStyle, setActiveSpell } ) => {

    const [activeView, setActiveView] = useState('None')

    const handleViewChange = (view) => {
        const updatedView = view;
        setActiveView(updatedView)
    }

    return (
        <div className = "view-select-container">
            <div className = "select-icons">
                <button className = "icon-option" onClick = {() => handleViewChange("Equipment")}><img src = "https://oldschool.runescape.wiki/images/Worn_Equipment.png?124cf"></img></button> 
                <button className = "icon-option" onClick = {() => handleViewChange("Stats")}><img src = "https://oldschool.runescape.wiki/images/Stats_icon.png?1b467"></img></button>
                <button className = "icon-option" onClick = {() => handleViewChange("Prayer")} ><img src = "https://oldschool.runescape.wiki/images/Prayer_icon.png?ca0dc"></img></button>
                <button className = "icon-option" onClick = {() => handleViewChange("Combat")}><img src = "https://oldschool.runescape.wiki/images/Attack_style_icon.png?ceb2e"></img></button>
                <button className = "icon-option" onClick = {() => handleViewChange("Extra")}><img src = "https://oldschool.runescape.wiki/images/Settings.png?99265"></img></button>
                
            </div>
            { activeView === "Equipment" &&
                <EquipmentSelect equipment = {equipment} setEquipment = {setEquipment} totalBonuses = {totalBonuses} setTotalBonuses = {setTotalBonuses} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle} styles = {styles} setStyles = {setStyles} setActiveSpell = {setActiveSpell}/>
            }
            { activeView === "Combat" && 
                <OsrsStyleSelect styles = {styles} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle} setActiveSpell = {setActiveSpell}/>
            }
            { activeView === "Stats" &&
                <OsrsStatSelect potionBoost = {potionBoost} setPotionBoost = {setPotionBoost} stats = {stats} setStats = {setStats}/>
            }
        </div>
    )



}

export default OsrsViewSelect