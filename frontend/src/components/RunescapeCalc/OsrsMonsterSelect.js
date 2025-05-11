import '../../css/runescapecalc.css'
import { useState, useEffect } from "react"


const MonsterSelect = ({ selectedMonster, setSelectedMonster }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [monsterList, setMonsterList] = useState([]);
    

    useEffect(() => { 
        
        const getMonsterList = async() => {
                const allMonsters = await fetch('https://skeeterswebsite.onrender.com/api/getAllOsrsMonsters', 
                    {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json',},
                    });
                if(!allMonsters.ok) {
                    throw new Error("Failed to fetch monsters")
                }
                const monsterData = await allMonsters.json();
                setMonsterList(monsterData)
                setSelectedMonster(monsterData[0])
            }
            getMonsterList();
    }, []);

    const handleSearchTermChange = async (e) => {
        setSearchTerm(searchTerm.slice(searchTerm.length) + e)
    }

    const handleItemSelect = async (event) => {

        let monsterData = null;
        handleSearchTermChange(event.target.value);
        const monsterName = event.target.value
        const selectedMonster = monsterList.find(monster => monster.name === monsterName);
        if (selectedMonster) {
            setSelectedMonster(selectedMonster);
        } else {
            setSelectedMonster(null);
        }
        
    }


    return (
        
        <div className = 'monster-container'>
            <div className = "monster-img-container">
                {selectedMonster ? 
                <img className = "monster-img" alt = "No monster" src = {selectedMonster.imageURL}></img> : <img className = "monster-img" alt = "No monster" src = ""></img>
                }
            </div>
            
            <div>
            <input
                className = "monster-search-input"
                type="text"
                placeholder="Search for a monster..."
                list = "monsters"
                value = {searchTerm}
                onChange={handleItemSelect}
            />

            <datalist id="monsters">
                {monsterList.map(monster => (
                    <option key={monster._id} value={monster.name} />
                ))}
            </datalist>
            </div>
            {selectedMonster ?
            <table className = 'monster-stats-table'>
                <tr>
                    <th colSpan = "3" className = 'monster-stats-header'>
                        {selectedMonster.name} ({selectedMonster.combatLevel})
                    </th>
                </tr>
                <tr className = 'monster-stats-row'>
                    <th className = 'monster-stats-cell'>Stats</th>
                    <th className = 'monster-stats-cell'>Attack</th>
                    <th className = 'monster-stats-cell'>Defense</th>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "hitpoints icon" src = "https://oldschool.runescape.wiki/images/Hitpoints_icon.png"></img>
                            {selectedMonster.combatStats.hitpoints}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "attack icon" src = "https://oldschool.runescape.wiki/images/Attack_icon.png?b4bce"></img>
                            {selectedMonster.attackBonuses.attack}</div>
                        </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "stab bonus icon" src = "https://oldschool.runescape.wiki/images/White_dagger.png?db3e5"></img>
                            {selectedMonster.defenceBonuses.stab}
                        </div>
                    </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "attack icon" src = "https://oldschool.runescape.wiki/images/Attack_icon.png?b4bce"></img>
                            {selectedMonster.combatStats.attack}
                            </div>
                        </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "strength icon" src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img>
                            {selectedMonster.attackBonuses.strength}
                            </div>
                        </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "slash bonus icon" src = "https://oldschool.runescape.wiki/images/White_scimitar.png?2dc8c"></img>
                            {selectedMonster.defenceBonuses.slash}
                            </div>
                        </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "strength icon" src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img>
                            {selectedMonster.combatStats.strength}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "magic icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                            {selectedMonster.attackBonuses.magic}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "crush icon" src = "https://oldschool.runescape.wiki/images/White_warhammer.png?2ff77"></img>
                            {selectedMonster.defenceBonuses.crush}
                        </div>
                    </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "defense icon" src = "https://oldschool.runescape.wiki/images/Defence_icon.png?ca0cd"></img>
                            {selectedMonster.combatStats.defense}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_Damage_icon.png?63a1a"></img>
                            {selectedMonster.attackBonuses.magicStrength}
                            </div>
                        </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                            {selectedMonster.defenceBonuses.magic}
                            </div>
                        </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "magic bonus icon" src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img>
                            {selectedMonster.combatStats.magic}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                            {selectedMonster.attackBonuses.ranged}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Steel_dart.png?3203e"></img>
                            {selectedMonster.defenceBonuses.lightRanged}
                        </div>
                    </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'>
                        <div className = 'monster-stat'>
                            <img className = "bonus-grid-image" alt = "ranged bonus icon" src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img>
                            {selectedMonster.combatStats.ranged}
                        </div>
                    </td>
                    <td className = 'monster-stats-cell'> 
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "ranged light icon" src = "https://oldschool.runescape.wiki/images/Ranged_Strength_icon.png?79763"></img>
                            {selectedMonster.attackBonuses.rangedStrength}
                        </div>
                    </td>

                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                        <img className = "bonus-grid-image" alt = "ranged standard icon" src = "https://oldschool.runescape.wiki/images/Steel_arrow_5.png?2c4a2"></img>
                            {selectedMonster.defenceBonuses.mediumRanged}
                        </div>
                    </td>
                </tr>
                <tr className = 'monster-stats-row'>
                    <td className = 'monster-stats-cell'></td>
                    <td className = 'monster-stats-cell'></td>
                    <td className = 'monster-stats-cell'>
                        <div className = "monster-stat">
                            <img className = "bonus-grid-image" alt = "ranged heavy icon" src = "https://oldschool.runescape.wiki/images/Steel_bolts_5.png?f1c11"></img>
                            {selectedMonster.defenceBonuses.heavyRanged}
                        </div>
                    </td>
                </tr>
            </table> :
            <div>No monster selected</div>
           }
        </div>
        
    )
}

export default MonsterSelect;

