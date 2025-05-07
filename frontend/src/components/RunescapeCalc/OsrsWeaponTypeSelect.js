import '../../css/runescapecalc.css'

const OsrsWeaponTypeSelect = ({weaponType, setWeaponType}) => {

    const handleWeaponTypeChange = (event) => {
        setWeaponType(event.target.value);
    }


    return (
        
        <div>
            <li>
                <div  className = "style-select">
                <label>Weapon Type: </label>
                <select value = {weaponType} onChange = {handleWeaponTypeChange}>
                    <option value = "Melee">Melee</option>
                    <option value = "Ranged">Ranged</option>
                    <option value = "Magic">Magic</option>
                    <option value = "Other">Other</option>
                </select>
                </div>
            </li>
        </div>
        
    )
}

export default OsrsWeaponTypeSelect