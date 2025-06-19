import '../../css/runescapecalc.css'
import { useState, useEffect, useMemo } from 'react'
import OsrsPotionSelect from './OsrsPotionSelect';

const OsrsStatSelect = ( { potionBoost, setPotionBoost, stats, setStats }) => {

    const effStats = useMemo(() => ({
        attack: Math.floor(stats.attack * potionBoost.attack.x + potionBoost.attack.f),
        strength: Math.floor(stats.strength * potionBoost.strength.x + potionBoost.strength.f),
        defense: Math.floor(stats.defense * potionBoost.defense.x + potionBoost.defense.f),
        ranged: Math.floor(stats.ranged * potionBoost.ranged.x + potionBoost.defense.f),
        magic: Math.floor(stats.magic * potionBoost.magic.x + potionBoost.magic.f),
        hitpoints: stats.hitpoints,
    }), [stats, potionBoost]);

    const handleChange = (e) => {
        const {name, value } = e.target;

        setStats((prev) => ({
            ...prev, 
            [name]: parseInt(value)
        }));
    }
    
    return (
        <div className = "stat-container">
            <div className = "stat-grid">
                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Attack_icon.png?b4bce"></img></div>
                <div class = "stat-cell"><p>{effStats.attack} / </p><input name = "attack" onChange = {handleChange} value = {stats.attack} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c"></img></div>
                <div class = "stat-cell"><p>{effStats.strength} / </p><input name = "strength" onChange = {handleChange} value = {stats.strength} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Defence_icon.png?ca0cd"></img></div>
                <div class = "stat-cell"><p>{effStats.defense} / </p><input name = "defense" onChange = {handleChange} value = {stats.defense} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Hitpoints_icon.png"></img></div>
                <div class = "stat-cell"><input name = "hitpoints" onChange = {handleChange} value = {effStats.hitpoints} class = "stat-input"></input><p> / </p><input name = "hitpoints" onChange = {handleChange} value = {stats.hitpoints} class = "stat-input"></input></div>
                
                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Ranged_icon.png?01b0e"></img></div>
                <div class = "stat-cell"><p>{effStats.ranged} / </p><input name = "ranged" onChange = {handleChange} value = {stats.ranged} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Magic_icon.png?334cf"></img></div>
                <div class = "stat-cell"><p>{effStats.magic} / </p><input name = "magic" onChange = {handleChange} value = {stats.magic} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Prayer_icon.png?ca0dc"></img></div>
                <div class = "stat-cell"><p>{stats.prayer} / </p><input name = "prayer" onChange = {handleChange} value = {stats.prayer} class = "stat-input"></input></div>
                
                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Mining_icon.png?00870"></img></div>
                <div class = "stat-cell"><p>{stats.mining} / </p><input name = "mining" onChange = {handleChange} value = {stats.mining} class = "stat-input"></input></div>

                <div class = "stat-cell"> <img src = "https://oldschool.runescape.wiki/images/Herblore_icon.png?ffa9e"></img></div>
                <div class = "stat-cell"><p>{stats.herblore} / </p><input name = "herblore" onChange = {handleChange} value = {stats.herblore} class = "stat-input"></input></div>
            </div>
            <div className = "stat-boost-container">
                <OsrsPotionSelect potionBoost = {potionBoost} setPotionBoost = {setPotionBoost}/>
            </div>
        </div>
    )


}

export default OsrsStatSelect