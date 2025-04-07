import '../css/devtools.css'
import { useState, useEffect } from 'react';
import DevToolsOsrsItems from './DevToolsOsrsItems';
import DevToolsTable from './DevToolsTable';
import DevToolsSidebar from './DevToolsSidebar'


const DevTools = () => {

    return (
        <>
        <DevToolsSidebar/>
        <DevToolsTable/>
        </>
    )
    
}

export default DevTools