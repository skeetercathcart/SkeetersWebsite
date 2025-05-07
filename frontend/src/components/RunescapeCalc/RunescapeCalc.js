import '../../css/runescapecalc.css'
import EquipmentSelect from './EquipmentSelect'
import MonsterSelect from './OsrsMonsterSelect';
import OsrsDpsResults from './OsrsDpsResults';

import { useState } from 'react'



const RunescapeCalc = () => {
    
    const [selectedMonster, setSelectedMonster] = useState(null)
    const [activeStyle, setActiveStyle] = useState('style1')
    const [styles, setStyles] = useState({
        style1: {
            combatStyle: 'Punch',
            attackType: 'Crush',
            weaponStyle: 'Accurate',
            attackSpeed: "4",
        },
        style2: {
            combatStyle: 'Kick',
            attackType: 'Crush',
            weaponStyle: 'Aggressive',
            attackSpeed: "4",
        },
        style3: {
            combatStyle: 'Block',
            attackType: 'Crush',
            weaponStyle: 'Defensive',
            attackSpeed: "4",
        },
        style4: {
            combatStyle: '',
            attackType: '',
            weaponStyle: '',
            attackSpeed: '',
        },
        style5: {
            combatStyle: '',
            attackType: '',
            weaponStyle: '',
            attackSpeed: '',
        }
    });
    const [totalBonuses, setTotalBonuses] = useState({
                attack: {
                    stab: '0',
                    slash: '0',
                    crush: '0',
                    magic: '0',
                    range: '0',            
                },
                defense: {
                    stab: '0',
                    slash: '0',
                    crush: '0',
                    magic: '0',
                    range: '0',
                },
                other: {
                    strength: '0',
                    mageStrength: '0',
                    rangeStrength: '0',
                    prayer: '0'
                },
            });

    return (
        
        <div className = "calc-container">
            <EquipmentSelect totalBonuses = {totalBonuses} setTotalBonuses = {setTotalBonuses} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle} styles = {styles} setStyles = {setStyles}/>
            <MonsterSelect selectedMonster = {selectedMonster} setSelectedMonster = {setSelectedMonster}/>
            <OsrsDpsResults totalBonuses = {totalBonuses} selectedMonster = {selectedMonster} activeStyle = {activeStyle} styles = {styles}/>
        </div>
        
    )
}

export default RunescapeCalc