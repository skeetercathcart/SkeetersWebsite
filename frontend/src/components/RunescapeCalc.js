import '../css/runescapecalc.css'
import OsrsWeaponForm from './OsrsWeaponForm';
import EquipmentSelect from './EquipmentSelect'
import MonsterSelect from './MonsterSelect';



const RunescapeCalc = () => {

    return (
        
        <div className = "calc-container">
            <EquipmentSelect/>
            <MonsterSelect/>
        </div>
        
    )
}

export default RunescapeCalc