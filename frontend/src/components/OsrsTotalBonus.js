import '../css/runescapecalc.css'
import { useState, useEffect } from 'react'

const OsrsTotalBonus = ({ bonuses }) => {


    return (
        <div className = "bonus-container"> 
            <div className = "bonus-grid-header">Attack</div>
            <div className = "bonus-grid-header">Defense</div>
            <div className = "bonus-grid-header">Other</div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-stab-attack-bonus" alt = "stab bonus icon" src = "https://oldschool.runescape.wiki/images/White_dagger.png?db3e5"></img>
                <div className = "bonus-display">{bonuses.attack.stab}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-stab-defense-bonus" alt = "stab bonus icon" src = "https://oldschool.runescape.wiki/images/White_dagger.png?db3e5"></img>
                <div className = "bonus-display">{bonuses.defense.stab}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-strength-bonus" alt = "melee strength bonus icon" src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img>
                <div className = "bonus-display">{bonuses.other.strength}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-slash-attack-bonus" alt = "slash bonus icon" src = "https://oldschool.runescape.wiki/images/White_scimitar.png?2dc8c"></img>
                <div className = "bonus-display">{bonuses.attack.slash}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-slash-defense-bonus" alt = "slash bonus icon" src = "https://oldschool.runescape.wiki/images/White_scimitar.png?2dc8c"></img>
                <div className = "bonus-display">{bonuses.defense.slash}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-magic-strength-bonus" alt = "magic strength icon" src = "https://oldschool.runescape.wiki/images/Magic_Damage_icon.png?63a1a"></img>
                <div className = "bonus-display">{bonuses.other.mageStrength}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-crush-attack-bonus" alt = "crush icon" src = "https://oldschool.runescape.wiki/images/White_warhammer.png?2ff77"></img>
                <div className = "bonus-display">{bonuses.attack.crush}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-crush-defense-bonus" alt = "crush icon" src = "https://oldschool.runescape.wiki/images/White_warhammer.png?2ff77"></img>
                <div className = "bonus-display">{bonuses.defense.crush}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-range-strength-bonus" alt = "ranged strength icon" src = "https://oldschool.runescape.wiki/images/Ranged_Strength_icon.png?79763"></img>
                <div className = "bonus-display">{bonuses.other.rangeStrength}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-magic-attack-bonus" alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                <div className = "bonus-display">{bonuses.attack.magic}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-magic-defense-bonus" alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                <div className = "bonus-display">{bonuses.defense.magic}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-prayer-bonus" alt = "prayer bonus icon" src = "https://oldschool.runescape.wiki/images/Prayer_icon.png?ca0dc"></img>
                <div className = "bonus-display">{bonuses.other.prayer}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-ranged-attack-bonus" alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                <div className = "bonus-display">{bonuses.attack.range}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "total-ranged-defense-bonus" alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                <div className = "bonus-display">{bonuses.defense.range}</div>
            </div>
            <div className = "bonus-grid-square">
                <img className = "bonus-grid-image" id = "weapon-attack-speed" alt = "attack speed icon" src = "https://oldschool.runescape.wiki/images/Watch.png?f0e76"></img>
                <div className = "bonus-display">tbd</div>
            </div>
            
        </div>
    )
}

export default OsrsTotalBonus