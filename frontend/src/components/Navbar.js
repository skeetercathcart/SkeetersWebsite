import { Link } from 'react-router-dom'
import '../css/navbar.css'


const Navbar = () => {
    return (
        <div>
            <div className = 'background'>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/runescapecalc">
                    <button>Runescape Calc</button>
                </Link>
            </div>
        </div>
        
    )
}

export default Navbar