import '../../css/blackjack.css'
import CardBack1 from '../../assets/cardBacks/CardBack1.svg'
// Ace cards
import sA from '../../assets/cardImages/Spades_A.svg'
import s2 from '../../assets/cardImages/Spades_2.svg'
import s3 from '../../assets/cardImages/Spades_3.svg'
import s4 from '../../assets/cardImages/Spades_4.svg'
import s5 from '../../assets/cardImages/Spades_5.svg'
import s6 from '../../assets/cardImages/Spades_6.svg'
import s7 from '../../assets/cardImages/Spades_7.svg'
import s8 from '../../assets/cardImages/Spades_8.svg'
import s9 from '../../assets/cardImages/Spades_9.svg'
import s10 from '../../assets/cardImages/Spades_10.svg'
import sJ from '../../assets/cardImages/Spades_J.svg'
import sQ from '../../assets/cardImages/Spades_Q.svg'
import sK from '../../assets/cardImages/Spades_K.svg'
// Club cards
import cA from '../../assets/cardImages/Clubs_A.svg'
import c2 from '../../assets/cardImages/Clubs_2.svg'
import c3 from '../../assets/cardImages/Clubs_3.svg'
import c4 from '../../assets/cardImages/Clubs_4.svg'
import c5 from '../../assets/cardImages/Clubs_5.svg'
import c6 from '../../assets/cardImages/Clubs_6.svg'
import c7 from '../../assets/cardImages/Clubs_7.svg'
import c8 from '../../assets/cardImages/Clubs_8.svg'
import c9 from '../../assets/cardImages/Clubs_9.svg'
import c10 from '../../assets/cardImages/Clubs_10.svg'
import cJ from '../../assets/cardImages/Clubs_J.svg'
import cQ from '../../assets/cardImages/Clubs_Q.svg'
import cK from '../../assets/cardImages/Clubs_K.svg'
// Heart (of the) cards
import hA from '../../assets/cardImages/Hearts_A.svg'
import h2 from '../../assets/cardImages/Hearts_2.svg'
import h3 from '../../assets/cardImages/Hearts_3.svg'
import h4 from '../../assets/cardImages/Hearts_4.svg'
import h5 from '../../assets/cardImages/Hearts_5.svg'
import h6 from '../../assets/cardImages/Hearts_6.svg'
import h7 from '../../assets/cardImages/Hearts_7.svg'
import h8 from '../../assets/cardImages/Hearts_8.svg'
import h9 from '../../assets/cardImages/Hearts_9.svg'
import h10 from '../../assets/cardImages/Hearts_10.svg'
import hJ from '../../assets/cardImages/Hearts_J.svg'
import hQ from '../../assets/cardImages/Hearts_Q.svg'
import hK from '../../assets/cardImages/Hearts_K.svg'
// Diamond cards
import dA from '../../assets/cardImages/Diamonds_A.svg'
import d2 from '../../assets/cardImages/Diamonds_2.svg'
import d3 from '../../assets/cardImages/Diamonds_3.svg'
import d4 from '../../assets/cardImages/Diamonds_4.svg'
import d5 from '../../assets/cardImages/Diamonds_5.svg'
import d6 from '../../assets/cardImages/Diamonds_6.svg'
import d7 from '../../assets/cardImages/Diamonds_7.svg'
import d8 from '../../assets/cardImages/Diamonds_8.svg'
import d9 from '../../assets/cardImages/Diamonds_9.svg'
import d10 from '../../assets/cardImages/Diamonds_10.svg'
import dJ from '../../assets/cardImages/Diamonds_J.svg'
import dQ from '../../assets/cardImages/Diamonds_Q.svg'
import dK from '../../assets/cardImages/Diamonds_K.svg'
import { useState, useEffect } from 'react'

const BlackJack = () => {

    const [deck, setDeck] = useState(Array.from({ length: 52 }, (_, i) => i + 1))

    // Accepts a deck of cards as an array. Returns a randomized copy of that array. 
    const shuffleDeck = (deck) => {
  
        const shuffledDeck = [...deck];
        let q;
        // Loop through deck. Hardcoded to be one deck, could be implemented similiarly for multiple decks.
        for(let i = 0; i < 52; i++) {
            // 52 - i ensures index range is only between current card and the remainder of the deck. Math.random then gives pseudo-random selection. Ok if card "swaps" with itself. 
            q = i + Math.floor(Math.random() * (52 - i));

            // Perform Swap (tradionially store temp var and swap)
            [shuffledDeck[i], shuffledDeck[q]] = [shuffledDeck[q], shuffledDeck[i]];
             
        }

        setDeck(shuffledDeck)
    }

    useEffect(() => {
            shuffleDeck(deck)
    }, [])

    return (
        <div> 
            <img className = "card-back" src = {CardBack1} alt="Playing Card"></img>
            <img className = "card-back" src = {sA} alt="Playing Card"></img>
            <img className = "card-back" src = {s2} alt="Playing Card"></img>
            <img className = "card-back" src = {s3} alt="Playing Card"></img>
            <img className = "card-back" src = {s4} alt="Playing Card"></img>
            <img className = "card-back" src = {s5} alt="Playing Card"></img>
            <img className = "card-back" src = {s6} alt="Playing Card"></img>
            <img className = "card-back" src = {s7} alt="Playing Card"></img>
            <img className = "card-back" src = {s8} alt="Playing Card"></img>
            <img className = "card-back" src = {s9} alt="Playing Card"></img>
            <img className = "card-back" src = {s10} alt="Playing Card"></img>
            <img className = "card-back" src = {sJ} alt="Playing Card"></img>
            <img className = "card-back" src = {sQ} alt="Playing Card"></img>
            <img className = "card-back" src = {sK} alt="Playing Card"></img>
            <img className = "card-back" src = {cA} alt="Playing Card"></img>
            <img className = "card-back" src = {c2} alt="Playing Card"></img>
            <img className = "card-back" src = {c3} alt="Playing Card"></img>
            <img className = "card-back" src = {c4} alt="Playing Card"></img>
            <img className = "card-back" src = {c5} alt="Playing Card"></img>
            <img className = "card-back" src = {c6} alt="Playing Card"></img>
            <img className = "card-back" src = {c7} alt="Playing Card"></img>
            <img className = "card-back" src = {c8} alt="Playing Card"></img>
            <img className = "card-back" src = {c9} alt="Playing Card"></img>
            <img className = "card-back" src = {c10} alt="Playing Card"></img>
            <img className = "card-back" src = {cJ} alt="Playing Card"></img>
            <img className = "card-back" src = {cQ} alt="Playing Card"></img>
            <img className = "card-back" src = {cK} alt="Playing Card"></img>
            <img className = "card-back" src = {hA} alt="Playing Card"></img>
            <img className = "card-back" src = {dA} alt="Playing Card"></img>
            <img className = "card-back" src = {h2} alt="Playing Card"></img>
            <img className = "card-back" src = {h3} alt="Playing Card"></img>
            <img className = "card-back" src = {h4} alt="Playing Card"></img>
            <img className = "card-back" src = {h5} alt="Playing Card"></img>
            <img className = "card-back" src = {h6} alt="Playing Card"></img>
            <img className = "card-back" src = {h7} alt="Playing Card"></img>
            <img className = "card-back" src = {h8} alt="Playing Card"></img>
            <img className = "card-back" src = {h9} alt="Playing Card"></img>
            <img className = "card-back" src = {h10} alt="Playing Card"></img>
            <img className = "card-back" src = {hJ} alt="Playing Card"></img>
            <img className = "card-back" src = {hQ} alt="Playing Card"></img>
            <img className = "card-back" src = {hK} alt="Playing Card"></img>
            <img className = "card-back" src = {hA} alt="Playing Card"></img>
            <img className = "card-back" src = {dA} alt="Playing Card"></img>
            <img className = "card-back" src = {d2} alt="Playing Card"></img>
            <img className = "card-back" src = {d3} alt="Playing Card"></img>
            <img className = "card-back" src = {d4} alt="Playing Card"></img>
            <img className = "card-back" src = {d5} alt="Playing Card"></img>
            <img className = "card-back" src = {d6} alt="Playing Card"></img>
            <img className = "card-back" src = {d7} alt="Playing Card"></img>
            <img className = "card-back" src = {d8} alt="Playing Card"></img>
            <img className = "card-back" src = {d9} alt="Playing Card"></img>
            <img className = "card-back" src = {d10} alt="Playing Card"></img>
            <img className = "card-back" src = {dJ} alt="Playing Card"></img>
            <img className = "card-back" src = {dQ} alt="Playing Card"></img>
            <img className = "card-back" src = {dK} alt="Playing Card"></img>
        </div>
    )
}

export default BlackJack