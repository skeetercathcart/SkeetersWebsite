import { useNavigate } from 'react-router-dom'
import '../css/navbarbutton.css'


const NavbarButton = () => {

    const navigate = useNavigate();

    const goToRSCalc = () => {
        navigate('/runescapecalc');
    }

    const goHome = () => {
        navigate('/');
    }


    return (
        <div>
            <button onClick={goHome}>HOME</button>
        </div>
        
    )
}

export default NavbarButton