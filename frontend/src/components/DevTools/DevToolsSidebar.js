import '../../css/devtools.css'
import {useState} from 'react'

const DevToolsSidebar = ( { filter, setFilter } ) => {

    const collectionOptions = [ "osrsWeapon", "osrsGear", "osrsMonster" ]

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div className = "sidebar-container">
             <select value = {filter || ""} placeholder = "Select a Filter" onChange = {handleFilterChange}>
                <option value = "">Select a Filter</option>
                {collectionOptions.map((item) => <option key = { item } value = {item}>{item}</option>)}
            </select>
             
            
        </div>
    )


}

export default DevToolsSidebar