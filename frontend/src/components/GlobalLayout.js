import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const GlobalLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
        
    )
}

export default GlobalLayout