import '../css/runescapecalc.css'
import { useState } from 'react';
import OsrsWeaponTypeSelect from './OsrsWeaponTypeSelect';
import OsrsCombatStyleSelect from './RunescapeWeaponStyle';
import OsrsItemStats from './OsrsItemStats';



const OsrsWeaponForm = () => {

    const [showForm, setFormVisible] = useState(false);
    const [weaponName, setWeaponName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [weaponType, setWeaponType] = useState('Melee');
    const [twoHanded, setTwoHanded] = useState(false);
    const [styles, setStyles] = useState({
        style1: {
            combatStyle: '',
            attackStyle: '',
            weaponStyle: '',
        },
        style2: {
            combatStyle: '',
            attackStyle: '',
            weaponStyle: '',
        },
        style3: {
            combatStyle: '',
            attackStyle: '',
            weaponStyle: '',
        },
        style4: {
            combatStyle: '',
            attackStyle: '',
            weaponStyle: '',
        },
        style5: {
            combatStyle: '',
            attackStyle: '',
            weaponStyle: '',
        }
    });

    
    const [statRequirements, setStatRequirements] = useState({
        attackRequirements: {
            attack: '',
            strength: '',
            range: '',
            magic: ''
        }  
    });

    const [bonuses, setBonuses] = useState({
        attack: {
            slash: '',
            stab: '',
            crush: '',
            range: '',
            magic: '',
        },
        defense: {
            slash: '',
            stab: '',
            crush: '',
            range: '',
            magic: '',
        },
        other: {
            strength: '',
            rangeStrength: '',
            mageStrength: '',
            prayer: ''
        },
    }); 

    const formToggle = () => {
        setFormVisible(!showForm)
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log('Weapon Name:', weaponName);
        console.log('Weapon Type:', weaponType);
        console.log('Two Handed:', twoHanded);
        console.log('Combat Styles:', JSON.stringify(styles));
       

        const reqBody = {
            wepName: weaponName,
            imageUrl: imageUrl,
            wepType: weaponType,
            attStyles: styles,
            attReqs: statRequirements,
            bonuses: bonuses,
            twoHanded: twoHanded

        }

        console.log("REEEEEEEEEEEEEE" + JSON.stringify(reqBody))

        try {
            const response = await fetch(process.env.REACT_APP_API_URI + '/api/addWeapon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            if (!response.ok) {
               // const data = await response.json();
               // errorMessage.textContent = data.message; // Display error message  
                return;
            }
            } catch (error) {
                console.error('Error:', error.message);
            }
    }

    return (
        <div>
        <div className = 'side-toolbar'>
        <button onClick = {formToggle}>Add Weapon</button>
        </div>
        {showForm && (
            <div className = "modal-container">
        <form className = "weapon-form" onSubmit = { handleSubmit }>
            <div className = 'header-split'>
                <div className = "form-header">
                    <div className = "style-select">
                        <label for = "name">Weapon Name</label>
                        <input type = "text" id = "name" name = "name" 
                               value = {weaponName} onChange = {(e) => setWeaponName(e.target.value)} required></input>
                    </div>
                    <div className = "style-select">
                        <label for = "name">Image URL</label>
                        <input type = "text" id = "imageURL" name = "imageURL" 
                               value = {imageUrl} onChange = {(e) => setImageUrl(e.target.value)} required></input>
                    </div>
                    <h3>Combat Options:</h3>
                    <OsrsWeaponTypeSelect weaponType = {weaponType} setWeaponType={setWeaponType}/>
                    <div className = 'style-select'>Two Handed <input type = 'checkbox' checked = {twoHanded} onChange = {(e) => setTwoHanded(e.target.checked)}></input></div>
                </div>
                <OsrsItemStats bonuses={bonuses} setBonuses={setBonuses} statRequirements={statRequirements} setStatRequirements={setStatRequirements} />
            </div>
            <div className = ''>
                <div className = "combat-style">
                    <div className = "grid-square">
                        <label className = "style-label">Style 1</label>
                        <OsrsCombatStyleSelect weaponType = {weaponType} styles = {styles} setStyles = {setStyles} styleNumber = "style1"/>
                    </div>
                    <div className = "grid-square">
                        <label className = "style-label">Style 2</label>
                        <OsrsCombatStyleSelect weaponType = {weaponType} styles = {styles} setStyles = {setStyles} styleNumber = "style2"/>
                    </div>
                    <div className = "grid-square">
                        <label className = "style-label">Style 3</label>
                        <OsrsCombatStyleSelect weaponType = {weaponType} styles = {styles} setStyles = {setStyles} styleNumber = "style3"/>
                    </div>
                    <div className = "grid-square">
                        <label className = "style-label">Style 4</label>
                        <OsrsCombatStyleSelect weaponType = {weaponType} styles = {styles} setStyles = {setStyles} styleNumber = "style4"/>
                    </div>
                    {weaponType === 'Magic' && (
                        <div className = "grid-square">
                        <label className = "style-label">Style 5</label>
                        <OsrsCombatStyleSelect weaponType = {weaponType} styles = {styles} setStyles = {setStyles} styleNumber = "style5"/>
                    </div>
                    )}
                    <div className = "submit-square">
                        <button type = "submit">Submit</button>
                    </div>
                    
                </div>
                
            </div>
        </form>
        </div>)}
        </div>
        
        
        
        
    )
}

export default OsrsWeaponForm