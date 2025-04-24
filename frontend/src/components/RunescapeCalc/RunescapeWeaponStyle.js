const OsrsCombatStyleSelect = ({ weaponType, styles, setStyles, styleNumber }) => {

    const handleStyleChange = (property, value) => {
        setStyles((prevState) => ({
            ...prevState,
            [styleNumber]: {
                ...prevState[styleNumber],
                [property]: value,
            },
        }));
    };


    return (
        <div>
            <li>
                <div className = "style-select">
                                <label>Combat Style: </label>
                                <select name = "Combat Style" value = {styles[styleNumber].combatStyle} onChange = {(e) => handleStyleChange('combatStyle', e.target.value)}>
                                    {weaponType === 'Melee' && (
                                        <>
                                        <option value = "Chop">Chop</option>
                                        <option value = "Slash">Slash</option>
                                        <option value = "Smash">Smash</option>
                                        <option value = "Block">Block</option>
                                        <option value = "Flick">Flick</option>
                                        <option value = "Lash">Lash</option>
                                        <option value = "Deflect">Deflect</option>
                                        <option value = "Punch">Punch</option>
                                        <option value = "Kick">Kick</option>
                                        <option value = "Lunge">Lunge</option>
                                        <option value = "Pound">Pound</option>
                                        <option value = "Pummel">Pummel</option>
                                        <option value = "Spike">Spike</option>
                                        <option value = "Swipe">Swipe</option>
                                        <option value = "Reap">Reap</option>
                                        <option value = "Jab">Jab</option>
                                        <option value = "Bash">Bash</option>
                                        <option value = "Pound">Pound</option>
                                        <option value = "Fend">Fend</option>
                                        <option value = "Impale">Impale</option>
                                        </>
                                    )}
                                    {weaponType === 'Ranged' && (
                                        <>
                                        <option value = "Rapid">Rapid</option>
                                        <option value = "Accurate">Accurate</option>
                                        <option value = "Short Fuse">Short Fuse</option>
                                        <option value = "Medium Fuse">Medium Fuse</option>
                                        <option value = "Long Fuse">Long Fuse</option>
                                        </>

                                    )}
                                    {weaponType === 'Magic' && (
                                        <>
                                        <option value = "Bash">Bash</option>
                                        <option value = "Pound">Pound</option>
                                        <option value = "Focus">Focus</option>
                                        <option value = "Jab">Jab</option>
                                        <option value = "Swipe">Swipe</option>
                                        <option value = "Fend">Fend</option>
                                        <option value = "Spell">Spell</option>
                                        </>

                                    )}
                                    {weaponType === 'Other' && (
                                        <>
                                        <option value = "Scorch">Scorch</option>
                                        <option value = "Flare">Flare</option>
                                        <option value = "Blaze">Blaze</option>
                                        </>

                                    )}
                                </select>
                            </div>
                        </li>
                        <li>
                            <div className = "style-select">
                                <label>Attack Type: </label>
                                <select name = "Combat Style" value = {styles[styleNumber].attackStyle} onChange = {(e) => handleStyleChange('attackStyle', e.target.value)}>
                                    {weaponType === 'Melee' && (
                                        <>
                                        <option value = "Crush">Crush</option>
                                        <option value = "Slash">Slash</option>
                                        <option value = "Stab">Stab</option>
                                        </>
                                    )}
                                    {weaponType === 'Ranged' && (
                                        <>
                                        <option value = "Light">Light</option>
                                        <option value = "Standard">Standard</option>
                                        <option value = "Heavy">Heavy</option>                                    
                                        </>

                                    )}
                                    {weaponType === 'Magic' && (
                                        <>
                                        <option value = "Magic">Magic</option>
                                        <option value = "Crush">Crush</option>
                                        <option value = "Slash">Slash</option>
                                        <option value = "Stab">Stab</option>
                                        </>

                                    )}
                                    {weaponType === 'Other' && (
                                        <>
                                        <option value = "Slash">Slash</option>
                                        <option value = "Standard">Standard</option>
                                        <option value = "Magic">Magic</option>
                                        <option value = "Ranged">Ranged</option>
                                        </>

                                    )}
                                </select>                               
                            </div>
                        </li>
                        <li>
                            <div  className = "style-select">
                                <label>Weapon Style: </label>
                                <select name = "Combat Style" value = {styles[styleNumber].weaponStyle} onChange = {(e) => handleStyleChange('weaponStyle', e.target.value)}>
                                {weaponType === 'Melee' && (
                                        <>
                                        <option value = "Accurate">Accurate</option>
                                        <option value = "Aggressive">Aggressive</option>
                                        <option value = "Controlled">Controlled</option>
                                        <option value = "Defensive">Defensive</option>
                                        </>
                                    )}
                                    {weaponType === 'Ranged' && (
                                        <>
                                        <option value = "Rapid">Rapid</option>
                                        <option value = "Longrange">Longrange</option>
                                        <option value = "Short Fuse">Short Fuse</option>
                                        <option value = "Medium Fuse">Medium Fuse</option>
                                        <option value = "Long Fuse">Long Fuse</option>                                   
                                        </>

                                    )}
                                    {weaponType === 'Magic' && (
                                        <>
                                        <option value = "Accurate">Accurate</option>
                                        <option value = "Aggressive">Aggressive</option>
                                        <option value = "Defensive">Defensive</option>
                                        <option value = "Autocast">Autocast</option>
                                        <option value = "Defensive Autocast">Defensive Autocast</option>
                                        </>

                                    )}
                                    {weaponType === 'Other' && (
                                        <>
                                        <option value = "Accurate">Accurate</option>
                                        <option value = "Aggressive">Aggressive</option>
                                        <option value = "Defensive">Defensive</option>
                                        <option value = "Rapid">Rapid</option>
                                        </>

                                    )}
                                </select>
                            </div>
                        </li>
        </div>
        
    )
}

export default OsrsCombatStyleSelect