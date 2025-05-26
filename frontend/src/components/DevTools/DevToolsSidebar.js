import '../../css/devtools.css'
import {useState} from 'react'
import OsrsAddSpellForm from './OsrsAddSpellForm'

const DevToolsSidebar = ( { filter, setFilter } ) => {

    const [showForm, setShowForm] = useState(false)
    const collectionOptions = [ "osrsWeapon", "osrsGear", "osrsMonster", "osrsSpell" ]

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShowForm = () => {
        setShowForm(!showForm)
    }

    return (

        <div className = "sidebar-container">
             <select value = {filter || ""} placeholder = "Select a Filter" onChange = {handleFilterChange}>
                <option value = "">Select a Filter</option>
                {collectionOptions.map((item) => <option key = { item } value = {item}>{item}</option>)}
            </select>
            <button onClick = {handleShowForm}>
                New Spell
            </button>
            { showForm && <OsrsAddSpellForm/>}
        </div>
    )

}

export default DevToolsSidebar