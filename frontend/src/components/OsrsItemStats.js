import '../css/runescapecalc.css'

const OsrsItemStats = ({ bonuses, setBonuses, statRequirements, setStatRequirements }) => {

    
    const handleStatReqChange = (type, value) => {
        setStatRequirements(prevState => ({
            ...prevState, 
            attackRequirements: { 
                ...prevState.attackRequirements, 
                [type]: value 
            },
        }));
    }

    const handleBonusChange = (category, type, value) => {
        setBonuses(prevState => ({
            ...prevState, 
            [category]: {
                ...prevState[category], 
                [type]: value,
            },
        }));
    }
        


    return (

        <div  className = 'item-stats'>
            <div className = 'stat-box'>
                <h4>Requirements</h4>
            </div>
            <div className = 'stat-box'>
                <img alt = "attack icon" src = "https://oldschool.runescape.wiki/images/Attack_icon.png?b4bce"></img>
                <input className = "stat-input" type = "text" placeholder = "1"
                       value={statRequirements.attackRequirements.attack} 
                       onChange={(e) => handleStatReqChange('attack', parseInt(e.target.value) || 0)}/>
            </div>
            <div className = 'stat-box'>
                <img alt = "strength icon" src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img>
                <input className = "stat-input" type = "text" placeholder = "1"
                       value={statRequirements.attackRequirements.strength} 
                       onChange={(e) => handleStatReqChange('strength', parseInt(e.target.value) || 0)}/>
            </div>
            <div className = 'stat-box'>
                <img alt = "defense icon" src = "https://oldschool.runescape.wiki/images/Defence_icon.png?ca0cd"></img>
                <input className = "stat-input" type = "text" placeholder = "1"
                       value={statRequirements.attackRequirements.defense} 
                       onChange={(e) => handleStatReqChange('defense', parseInt(e.target.value) || 0)}/>            
                </div>
            <div className = 'stat-box'>
                <img alt = "magic icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                <input className = "stat-input" type = "text" placeholder = "1"
                       value={statRequirements.attackRequirements.magic} 
                       onChange={(e) => handleStatReqChange('magic', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "ranged icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                <input className = "stat-input" type = "text" placeholder = "1"
                       value={statRequirements.attackRequirements.range} 
                       onChange={(e) => handleStatReqChange('range', parseInt(e.target.value) || 0)}/>            
            </div>           
            <div className = 'stat-box'>
                <h4>Att. Bonus</h4>
            </div>
            <div className = 'stat-box'>
                <img alt = "stab bonus icon" src = "https://oldschool.runescape.wiki/images/White_dagger.png?db3e5"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.attack.stab} 
                       onChange={(e) => handleBonusChange('attack', 'stab', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "slash bonus icon" src = "https://oldschool.runescape.wiki/images/White_scimitar.png?2dc8c"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.attack.slash} 
                       onChange={(e) => handleBonusChange('attack', 'slash', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "crush icon" src = "https://oldschool.runescape.wiki/images/White_warhammer.png?2ff77"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.attack.crush} 
                       onChange={(e) => handleBonusChange('attack', 'crush', parseInt(e.target.value) || 0)}/>
            </div>
            <div className = 'stat-box'>
                <img alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.attack.magic} 
                       onChange={(e) => handleBonusChange('attack', 'magic', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.attack.range} 
                       onChange={(e) => handleBonusChange('attack', 'range', parseInt(e.target.value) || 0)}/>            
            </div>            
            <div className = 'stat-box'>
                <h4>Def. Bonus</h4>
            </div>
            <div className = 'stat-box'>
                <img alt = "stab bonus icon" src = "https://oldschool.runescape.wiki/images/White_dagger.png?db3e5"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.defense.stab} 
                       onChange={(e) => handleBonusChange('defense', 'stab', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "slash bonus icon" src = "https://oldschool.runescape.wiki/images/White_scimitar.png?2dc8c"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.defense.slash} 
                       onChange={(e) => handleBonusChange('defense', 'slash', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "crush icon" src = "https://oldschool.runescape.wiki/images/White_warhammer.png?2ff77"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.defense.crush} 
                       onChange={(e) => handleBonusChange('defense', 'crush', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.defense.magic} 
                       onChange={(e) => handleBonusChange('defense', 'magic', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.defense.range} 
                       onChange={(e) => handleBonusChange('defense', 'range', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <h4>Other Bonus</h4>
            </div>
            <div className = 'stat-box'>
                <img alt = "melee strength bonus icon" src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.other.strength} 
                       onChange={(e) => handleBonusChange('other', 'strength', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "magic strength icon" src = "https://oldschool.runescape.wiki/images/Magic_Damage_icon.png?63a1a"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.other.mageStrength} 
                       onChange={(e) => handleBonusChange('other', 'mageStrength', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "ranged strength icon" src = "https://oldschool.runescape.wiki/images/Ranged_Strength_icon.png?79763"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.other.rangeStrength} 
                       onChange={(e) => handleBonusChange('other', 'rangeStrength', parseInt(e.target.value) || 0)}/>            
            </div>
            <div className = 'stat-box'>
                <img alt = "prayer bonus icon" src = "https://oldschool.runescape.wiki/images/Prayer_icon.png?ca0dc"></img>
                <input className = "stat-input" type = "text" placeholder = "0"
                       value={bonuses.other.prayer} 
                       onChange={(e) => handleBonusChange('other', 'prayer', parseInt(e.target.value) || 0)}/>            
            </div>
        </div>

    )


}

export default OsrsItemStats