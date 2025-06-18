import '../../css/runescapecalc.css'
import EquipmentSelect from './EquipmentSelect'
import MonsterSelect from './OsrsMonsterSelect';
import OsrsDpsResults from './OsrsDpsResults';
import OsrsViewSelect from './OsrsViewSelect';
import { act, useState } from 'react'




const RunescapeCalc = () => {
    
    const [activeSpell, setActiveSpell] = useState(null)
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

            const unarmed = {
                    name: "unarmed",
                    bonuses: {
                        attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                        defense: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
                        strength: 0, 
                        mageStrength: 0, 
                        rangeStrength: 0, 
                        prayer: 0
                    },
                    isTwoHanded: false,
                    imageURL: 'https://oldschool.runescape.wiki/images/Weapon_slot.png?ffed1',
                    attackStyles: {
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
                    }
                }

            const [equipment, setEquipment] = useState({
                head: null,
                cape: null,
                neck: null,
                ammunition: null,
                weapon: unarmed,
                body: null,
                shield: null,
                legs: null,
                hands: null,
                feet: null,
                ring: null,
            });

            const [stats, setStats] = useState({
                attack: 99,
                strength: 99,
                defense: 99,
                hitpoints: 99,
                ranged: 99,
                magic: 99,
                prayer: 99,
                mining: 99,
                herblore: 99,
            })

    return (
        
        <div className = "calc-container">
            <OsrsViewSelect stats = {stats} setStats = {setStats} equipment = {equipment} setEquipment = {setEquipment} totalBonuses = {totalBonuses} setTotalBonuses = {setTotalBonuses} activeStyle = {activeStyle} setActiveStyle = {setActiveStyle} styles = {styles} setStyles = {setStyles} setActiveSpell = {setActiveSpell}/>
            <MonsterSelect selectedMonster = {selectedMonster} setSelectedMonster = {setSelectedMonster}/>
            <OsrsDpsResults stats = {stats} totalBonuses = {totalBonuses} selectedMonster = {selectedMonster} activeStyle = {activeStyle} styles = {styles} activeSpell = {activeSpell}/>
        </div>
        
    )
}

export default RunescapeCalc