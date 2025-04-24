import '../../css/devtools.css'
import { useState } from 'react';
import DevToolsOsrsItems from './DevToolsOsrsItems';
import DevToolsTable from './DevToolsTable';
import DevToolsSidebar from './DevToolsSidebar'


const DevTools = () => {

    const [filter, setFilter] = useState('osrsWeapon')


    return (
        <>
        <DevToolsSidebar filter = {filter} setFilter = {setFilter}/> 
        <DevToolsTable filter = {filter}/>
        </>
    )
    
}

export default DevTools