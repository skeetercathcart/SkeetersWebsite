import '../css/runescapecalc.css'
import EquipmentSelect from './EquipmentSelect'
import MonsterSelect from './OsrsMonsterSelect';
import OsrsDpsResults from './OsrsDpsResults';



const RunescapeCalc = () => {

    return (
        
        <div className = "calc-container">
            <EquipmentSelect/>
            <MonsterSelect/>
            <OsrsDpsResults/>
        </div>
        
    )
}

export default RunescapeCalc