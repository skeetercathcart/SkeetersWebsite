import '../../css/runescapecalc.css'
import { useMemo } from 'react'




const OsrsDpsResults = ({ prayerBonus, potionBoost, stats, totalBonuses, selectedMonster, styles, activeStyle, activeSpell}) => {

    const {
        playerMaxHit,
        hitChance,
        damPerSec,
        expectedHit,
        avgTimeToKill,
        playerAttRoll,
        monsterMaxDef
    } = useMemo(() => {

        // TODO: Add other bonus detection or option(s)
        const otherBonus = { slayerHelm: 1.15, voidSet: 1.1, salveAmulet: 1.2 }

        // Crush, Stab, Slash, etc...
        let attackType = styles?.[activeStyle]?.attackType?.toLowerCase() ?? "Controlled";

        // Aggressive, Controlled, Accurate, etc...
        const attackStyle = styles[activeStyle].weaponStyle
        
        let hitChance = 0;
        let playerMaxHit = 1;
        let playerAttRoll = 0;
        let monsterMaxDef = 0;
        let gearMult = 1;

        // Calculation for melee
        if(attackType === "slash" || attackType === "crush" || attackType === "stab") {

            // Invisible attack bonus from attack style
            const attackStyleBonus = { Aggressive: 0, Controlled: 1, Accurate: 3, Defensive: 0}
            
            // Invisible strength bonus from attack style
            const strengthStyleBonus = {Aggressive: 3, Controlled: 1, Accurate: 0, Defensive: 0}

            // Player's effective attack level. Used to calculate attack roll
            const playerEffAtt = Math.floor( (stats.attack * potionBoost.attack.x + potionBoost.attack.f) * prayerBonus.melee.attack + 8 + attackStyleBonus[attackStyle])

            // Calculation of players maximum attack roll
            const playerMaxAtt = playerEffAtt * (totalBonuses.attack[attackType] + 64)
            playerAttRoll = playerMaxAtt;

            // Calculate monster defense roll (effective defense only matters for player calc)
            monsterMaxDef = selectedMonster ? (parseInt(selectedMonster.combatStats.defense) + 9) * (parseInt(selectedMonster.defenceBonuses[attackType]) + 64) : 0

            // Player's effective strength level. Used to calculate player's maximum hit
            const playerEffStr = Math.floor((stats.strength * potionBoost.strength.x + potionBoost.strength.f) * prayerBonus.melee.strength) + (strengthStyleBonus[attackStyle]) + 8

            // Calculation for player's maximum melee hit 
            playerMaxHit = Math.floor(((playerEffStr * (totalBonuses.other.strength + 64)) + 320) / 640)

            // Calculation for hit chance
            if (playerMaxAtt > monsterMaxDef) {
                hitChance = Math.round((1 - ((monsterMaxDef + 2) / (2 * (playerMaxAtt + 1)))) * 10000, 4) / 100
            } else {
                hitChance = Math.round((playerMaxAtt) / (2 * (monsterMaxDef + 1)) * 10000, 4) / 100
            }
        } 
        // Calculation for Ranged
        else if(attackType === "heavy" || attackType === "standard" || attackType === "light") { 
            // Gear Damage Mults
            // TODO (void, salve, slayer helm, etc...)

            // Invisible ranged bonus from attack style
            const attackStyleBonus = { Accurate: 3, Rapid: 0, Longrange: 0}

            // Player's effective ranged strength. Used to calculate player's maximum hit
            const playerEffStr = Math.floor((stats.ranged * potionBoost.ranged.x + potionBoost.ranged.f) * prayerBonus.ranged.strength) + (attackStyleBonus[attackStyle]) + 8

            // Calculation for player's maximum melee hit 
            playerMaxHit = Math.floor(Math.floor( 0.5 + ((playerEffStr * (totalBonuses.other.rangeStrength + 64))) / 640) * gearMult)

            // Player's effective ranged level. Used to calculate attack roll
            const playerEffRan = Math.floor( Math.floor((stats.ranged * potionBoost.ranged.x + potionBoost.ranged.f) * prayerBonus.ranged.attack + 8) + attackStyleBonus[attackStyle])

            // Calculation of players maximum attack roll
            const playerMaxRan = Math.floor(playerEffRan * (totalBonuses.attack.range + 64) * gearMult)
            playerAttRoll = playerMaxRan;

            // Lazy fix for database model not matching the ranged defense changes to monsters
            if(attackType === "heavy" || attackType == "light") {
                attackType += 'Ranged'
            } else if(attackType === "standard") {
                attackType = "mediumRanged"
            }
            // Calculate monster defense roll (effective defense only matters for player calc)
            monsterMaxDef = selectedMonster ? (parseInt(selectedMonster.combatStats.defense) + 9) * (parseInt(selectedMonster.defenceBonuses[attackType]) + 64) : 0

            // Calculation for hit chance
            if (playerMaxRan > monsterMaxDef) {
                hitChance = Math.round((1 - ((monsterMaxDef + 2) / (2 * (playerMaxRan + 1)))) * 10000, 4) / 100
            } else {
                hitChance = Math.round((playerMaxRan) / (2 * (monsterMaxDef + 1)) * 10000, 4) / 100
            }

        } else if(attackType === "magic") {
            // TODO: Void bonuses and powered staves get invisible level boost 
            const playerEffMage = Math.floor(((stats.magic * potionBoost.magic.x + potionBoost.magic.f) * prayerBonus.magic.attack)) + 9

            if(activeSpell) {
                playerMaxHit = Math.floor(activeSpell.maxHit * (1 + (totalBonuses.other.mageStrength / 100) + prayerBonus.magic.strength))
            }

            const playerMaxMage = Math.floor(playerEffMage * (totalBonuses.attack.magic + 64))
            playerAttRoll = playerMaxMage;

            // Calculate monster defense roll (effective defense only matters for player calc)
            monsterMaxDef = selectedMonster ? (parseInt(selectedMonster.combatStats.magic) + 9) * (parseInt(selectedMonster.defenceBonuses.magic) + 64) : 0

            // Calculation for hit chance
            if (playerMaxMage > monsterMaxDef) {
                hitChance = Math.round((1 - ((monsterMaxDef + 2) / (2 * (playerMaxMage + 1)))) * 10000, 4) / 100
            } else {
                hitChance = Math.round((playerMaxMage) / (2 * (monsterMaxDef + 1)) * 10000, 4) / 100
            }
        }

        // Calculation for expected hit
        const expectedHit = (0 * (1 - hitChance / 100)) + Math.round(Math.round(((hitChance / 100) * playerMaxHit) * 100, 3) / 10 / 2, 3) / 10

        // Calculation for DPS (probably dogshit idk)
        const damPerSec = Math.round((1 / (parseInt(styles[activeStyle].attackSpeed) * 0.6) * expectedHit) * 1000, 4) / 1000

        // Calulation for TTK (Does not match wiki calc idk why)
        const avgTimeToKill = selectedMonster ? Math.round((parseInt(selectedMonster.combatStats.hitpoints) / damPerSec) * 100 , 4) / 100 : '0'
    return {
        playerMaxHit,
        hitChance,
        damPerSec,
        expectedHit,
        avgTimeToKill,
        playerAttRoll,
        monsterMaxDef
    };
    }, [prayerBonus, stats, totalBonuses, selectedMonster, styles, activeStyle, activeSpell, potionBoost]);

    return (
        <div className = 'results-container'> 
            <table className = 'results-table'>
                <th colspan = '2' className = "results-header">
                    Results
                </th>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> Max Hit </td>
                    <td className = "results-cell"> {playerMaxHit} </td>
                </tr>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Expected Hit </td>
                    <td className = "results-cell"> {expectedHit} </td>
                </tr>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> DPS </td>
                    <td className = "results-cell"> {damPerSec} </td>
                </tr>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Avg. TTK </td>
                    <td className = "results-cell"> {avgTimeToKill} </td>
                </tr>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> Accuracy </td>
                    <td className = "results-cell"> {hitChance}% </td>
                </tr>
                <th colspan = '2' className = "results-header">
                    Rolls
                </th>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Attack Roll </td>
                    <td className = "results-cell"> {playerAttRoll} </td>
                </tr>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> NPC Def Roll </td>
                    <td className = "results-cell"> {monsterMaxDef} </td>
                </tr>
            </table>
        </div>
    )
}

export default OsrsDpsResults 