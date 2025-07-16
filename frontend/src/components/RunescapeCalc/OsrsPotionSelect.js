import '../../css/runescapecalc.css'
import { useState, useMemo, useEffect } from 'react'
import { potions } from '../../assets/osrsPotions' // Potion information stored in seperate file for cluttering purposes

const OsrsPotionSelect = ({ potionBoost, setPotionBoost }) => {

    const [selectedPotions, setSelectedPotions] = useState([]);

    const potBoost = useMemo(() => {
        const boost = { attack: {x: 1, f: 0}, strength: {x: 1, f: 0}, magic: {x: 1, f: 0}, ranged: {x: 1, f: 0}, defense: {x: 1, f: 0} };
        selectedPotions.forEach(potion => {
        const { stat, xboost = 1, fboost = 0 } = potion;
        if (xboost > boost[stat].x) {
        boost[stat] = { x: xboost, f: fboost };
        }
        });
        return boost;
    }, [selectedPotions]);

    
    useEffect(() => {
    setPotionBoost(potBoost);
    }, [potBoost, setPotionBoost]);

    const togglePotion = (potion) => {
    setSelectedPotions(prev => {
      const exists = prev.some(p => p.id === potion.id);
      return exists ? prev.filter(p => p.id !== potion.id) : [...prev, potion];
    });
  };

  return (
    <div className="potion-list">
      <strong>Boosts</strong>
      {potions.map((potion) => {
        const isSelected = selectedPotions.some(p => p.id === potion.id); // Check which potions from 'potions' are in the selectedPotions array 
        return (
          <div
            key={potion.id}
            className={`potion-cell ${isSelected ? 'selected' : ''}`} // If potion is in selectedPotions, give highlighted CSS
            onClick={() => togglePotion(potion)}
          >
            <img className="potion-img" src={potion.icon} alt={potion.label} />
            {potion.label}
            <p className="right">{isSelected ? '✔' : '+'}</p>
          </div>
        );
      })}
    </div>
  );


}

export default OsrsPotionSelect