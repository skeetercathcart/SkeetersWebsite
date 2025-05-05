import { Link } from 'react-router-dom'
import '../css/navbar.css'


const Navbar = () => {
    return (
        <div>
            <div className = 'background'>
                <Link to="/">
                    <button className = 'navbar-btn'>Home</button>
                </Link>
                <Link to="/runescapecalc">
                    <button className = 'navbar-btn'>Runescape Calc</button>
                </Link>
                <Link to="/blackjack">
                    <button className = 'navbar-btn'>Blackjack</button>
                </Link>
            </div>
        </div>
        
    )
}

export default Navbar