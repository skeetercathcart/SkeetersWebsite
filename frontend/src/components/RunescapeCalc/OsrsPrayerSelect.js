import '../../css/runescapecalc.css'
import { useState, useEffect, useMemo } from 'react';
import { prayers } from '../../assets/osrsPrayers';

const OsrsPrayerSelect = ( { activePrayers, setActivePrayers, prayerBonus, setPrayerBonus }) => {

    const togglePrayer = (prayer) => {

        setActivePrayers((prev) => {
            const isActive = prev.some((p) => p.id === prayer.id)

            if(isActive) {
                return (prev.filter((p) => p.id !== prayer.id))
            } else {
                const selectedPrayerKeys = Object.keys(prayer.boosts); // Array of effected bonuses of selected prayer
                const activePrayerKeys = prev.flatMap((p) => Object.keys(p.boosts))
                // Make an array of the keys from active prayers and check them against the keys of the selected prayers
                const mutualKeys = activePrayerKeys.filter((style) => selectedPrayerKeys.includes(style));
                if(mutualKeys.length === 0 || mutualKeys.includes('magic') || mutualKeys.includes('ranged')) {
                    return [prayer] // If mutual keys don't exist, exist for ranged, or exist for mage, deactivate the other prayers and activate the selected prayer
                } else if(mutualKeys.includes('melee')  && !activePrayerKeys.includes('ranged') && !activePrayerKeys.includes('magic')  && !selectedPrayerKeys.includes('ranged') && !selectedPrayerKeys.includes('magic')){
                    const selectedPrayerMelee = Object.keys(prayer.boosts.melee)
                    const activePrayerMelee = prev.flatMap((p) => Object.keys(p.boosts.melee))
                    const mutualMeleeKeys = activePrayerMelee.filter((style) => selectedPrayerMelee.includes(style));
                    if(mutualMeleeKeys.length > 0) { // Have to go through whole object now to check for matching melee keys and filter out that prayer if it matches
                        const filteredPrayers = prev.filter((p) => { // Loop through active prayers
                            const activeMeleeKey = Object.keys(p.boosts.melee); // Check melee style
                            return !activeMeleeKey.some((key) => selectedPrayerMelee.includes(key)) // Return if it matches or not
                        })
                        return ( [...filteredPrayers, prayer])
                    } else {
                        return ([...prev, prayer])
                    }
                } else {
                    return ([prayer])
                }
                
            }
        })

    
    }

    // Update prayerBonus when active prayers are changed
    useEffect(() => {

            const newPrayerBonus = {
            melee: { attack: 1.0, 
                     strength: 1.0,
                     defense: 1.0 }, 
            magic: { attack: 1.0,
                     defense: 1.0,
                     strength: 0.0}, 
            ranged: { attack: 1.0,
                      strength: 1.0}, 
            }
        
       activePrayers.forEach((prayer) => {
        const boosts = prayer.boosts;

        // Iterate over each style: melee, magic, ranged
        Object.entries(boosts).forEach(([style, stats]) => {
            Object.entries(stats).forEach(([stat, value]) => {
            
            newPrayerBonus[style][stat] = value;
            
            });
        });
        });

        setPrayerBonus(newPrayerBonus)
        
    }, [activePrayers])
    
    

    return (

        <div className = "prayer-select-container">
            <div className="prayer-select-grid">
                {prayers.map((prayer) => {
                    const isActive = activePrayers.some((p) => p.id === prayer.id);
                    return (
                        <div
                            key={prayer.id}
                            className={`prayer-select-cell ${isActive ? 'active' : ''}`}
                            onClick={() => togglePrayer(prayer)}
                        >
                            <img src={prayer.icon} alt={prayer.id} />
                        </div>
                    );
                })}
            </div>           
        </div>
    )

}

export default OsrsPrayerSelect;