import '../css/runescapecalc.css'
import { useState, useEffect } from "react"


const MonsterSelect = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [monsterList, setMonsterList] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState({})

    useEffect(() => { 
        
        const getMonsterList = async() => {
                const allMonsters = await fetch('http://localhost:3500/api/getAllOsrsMonsters', 
                    {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json',},
                    });
                if(!allMonsters.ok) {
                    throw new Error("Failed to fetch monsters")
                }
                const monsterData = await allMonsters.json();
                console.log('monsterData: ' + JSON.stringify(monsterData));
                setMonsterList(monsterData)
            }
            getMonsterList();
    }, [selectedMonster]);

    const handleSearchTermChange = async (e) => {
        setSearchTerm(searchTerm.slice(searchTerm.length) + e)
    }

    const handleItemSelect = async (event) => {

        let monsterData = null;
        console.log('current search term: ' + searchTerm);
        handleSearchTermChange(event.target.value);
        console.log('updated search term: ' + searchTerm)
        console.log("event value: " + event.target.value)
        const monsterName = event.target.value
        

        console.log('finding selected item: ' + monsterName)
        const selectedMonster = monsterList.find(monster => monster.name === monsterName);
        setSelectedMonster(selectedMonster.imageURL);
    }


    return (
        
        <div>
            <div className = "monster-img-container">
                {selectedMonster ? 
                <img className = "monster-img" alt = "No monster" src = {selectedMonster}></img> : <img className = "monster-img" alt = "No monster" src = ""></img>
                }
            </div>
            
            <div>
            <input
                type="text"
                placeholder="Search for a monster..."
                list = "monsters"
                value = {searchTerm}
                onChange={handleItemSelect}
            />

            <datalist id="monsters">
                {monsterList.map(monster => (
                    <option key={monster._id} value={monster.name} />
                ))}
            </datalist>
            </div>
            Gimme a KekW in the chat
        </div>
        
    )
}

export default MonsterSelect;