import '../../css/runescapecalc.css'




const OsrsDpsResults = ({ totalBonuses, selectedMonster, styles, activeStyle}) => {

    
    // TODO: Add input for player to adjust their level
    const playerLevels = { attack: 99, strength: 99, magic: 99, ranged: 99, defence: 99 }

    //TODO: Add prayer selection
    const prayerBonus = { attack: 1, strength: 1, magic: 1, ranged: 1, defence: 1 };

    // TODO: Add potion selection 
    const potionBoost = { attack: 0, strength: 0, magic: 0, ranged: 0, defence: 0 }

    // TODO: Add other bonus detection or option(s)
    const otherBonus = { slayerHelm: 1.15, voidSet: 1.1, salveAmulet: 1.2 }

    // TODO: Figure out how to pass attack style over
    const attackStyleBonus = { Aggressive: 0, Controlled: 1, Accurate: 3, Defensive: 0}

    const strengthStyleBonus = {Aggressive: 3, Controlled: 1, Accurate: 0, Defensive: 0}

    // Crush, Stab, Slash, etc...
    const attackType = styles?.[activeStyle]?.attackType?.toLowerCase() ?? "Controlled";

    // Aggressive, Controlled, Accurate, etc...
    const attackStyle = styles[activeStyle].weaponStyle

    // Player's effective attack level. Used to calculate attack roll
    const playerEffAtt = Math.floor( (playerLevels.attack + potionBoost.attack) * prayerBonus.attack + 8 + attackStyleBonus[attackStyle])

    // Calculation of players maximum attack roll
    const playerMaxAtt = playerEffAtt * (totalBonuses.attack[attackType] + 64)

    // Calculate monster defense roll (effective defense only matters for player calc)
    const monsterMaxDef = selectedMonster ? (parseInt(selectedMonster.combatStats.defense) + 9) * (parseInt(selectedMonster.defenceBonuses[attackType]) + 64) : 0

    // Player's effective strength level. Used to calculate player's maximum hit
    const playerEffStr = Math.floor((playerLevels.strength + potionBoost.strength) * prayerBonus.strength) + (strengthStyleBonus[attackStyle]) + 8

    // Calculation for player's maximum melee hit 
    const playerMaxHit = Math.floor(((playerEffStr * (totalBonuses.other.strength + 64)) + 320) / 640)

    // Calculation for hit chance
    let hitChance;

    if (playerMaxAtt > monsterMaxDef) {
        hitChance = Math.round((1 - ((monsterMaxDef + 2) / (2 * (playerMaxAtt + 1)))) * 10000, 4) / 100
    } else {
        hitChance = Math.round((playerMaxAtt) / (2 * (monsterMaxDef + 1)) * 10000, 4) / 100
    }

    // Calculation for expected hit
    const expectedHit = (0 * (1 - hitChance / 100)) + Math.round(Math.round(((hitChance / 100) * playerMaxHit) * 100, 3) / 10 / 2, 3) / 10

    // Calculation for DPS (probably dogshit idk)
    const damPerSec = Math.round((1 / (parseInt(styles[activeStyle].attackSpeed) * 0.6) * expectedHit) * 1000, 4) / 1000

    // Calulation for TTK
    const avgTimeToKill = selectedMonster ? Math.round((parseInt(selectedMonster.combatStats.hitpoints) / damPerSec) * 100 , 4) / 100 : '0'


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
                    <td className = "results-cell"> {hitChance} </td>
                </tr>
                <th colspan = '2' className = "results-header">
                    Rolls
                </th>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Attack Roll </td>
                    <td className = "results-cell"> {playerMaxAtt} </td>
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