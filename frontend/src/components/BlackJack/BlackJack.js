import '../../css/blackjack.css'
// Card Backs
import CardBack1 from '../../assets/cardBacks/CardBack1.svg'
import CardBack2 from '../../assets/cardBacks/CardBack2.svg'
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

    //const [deck, setDeck] = useState(Array.from({ length: 52 }, (_, i) => i + 1))
    const [deck, setDeck] = useState([sA, s2, s3, s4, s5, s6, s7, s8, s9, s10, sJ, sQ, sK,
                                      cA, c2, c3, c4, c5, c6, c7, c8, c9, c10, cJ, cQ, cK,
                                      dA, d2, d3, d4, d5, d6, d7, d8, d9, d10, dJ, dQ, dK,
                                      hA, h2, h3, h4, h5, h6, h7, h8, h9, h10, hJ, hQ, hK,
    ])
    const [gameDeck, setGameDeck] = useState([])
    const [stay, setStay] = useState(false)
    const [push, setPush] = useState(false)
    const [dealerWin, setDealerWin] = useState(false)
    const [playerWin, setPlayerWin] = useState(false)
    const [dealerStay, setDealerStay] = useState(false)
    const [playerScore, setPlayerScore] = useState(0)
    const [dealerScore, setDealerScore] = useState(0)
    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])
    const [playerBust, setPlayerBust] = useState(false)
    const [dealerBust, setDealerBust] = useState(false)

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

        setGameDeck(shuffledDeck)
        const newDealerCards = [shuffledDeck[0]]
        const newPlayerCards = [shuffledDeck[1], shuffledDeck[2]]
        setDealerCards(newDealerCards)
        setPlayerCards(newPlayerCards)
        const freshPlayerScore = calculateScore(playerCards)
        setPlayerScore(freshPlayerScore)
        const freshDealerScore = calculateScore(dealerCards)
        setDealerScore(freshDealerScore)
    }

    const calculateScore = (hand) => {
        let tempScore = 0;
        let aceCount = 0;

        hand.forEach(card => {
            const cardValue = getCardValue(card);
            tempScore += cardValue
            if (card.includes('A')) {
                aceCount += 1
            }
        })

        return ( tempScore )

    }

    const getCardValue = (card) => {
        // Elements in the array are url links, they are not string of the variable names (i.e. s2, s3, s4 etc...)
        // Extract the part like "Diamonds_9" or "Spades_K"
        const match = card.match(/\/([A-Za-z]+)_(\d+|A|J|Q|K)\./);
        const rank = match ? match[2] : '';

        if (rank === 'A') return 11;
        if (['K', 'Q', 'J', '10'].includes(rank)) return 10;
        return parseInt(rank); // numbers 2-9
    }

    
    const handlePlayerBustClick = () => {
        shuffleDeck(deck)
    }

    // Cleanup and reset
    const resetGame = () => {
        setStay(false);
        setDealerStay(false);
        setPlayerBust(false);
        setDealerBust(false);
        setPush(false)
        setDealerWin(false);
        setPlayerWin(false);
        shuffleDeck(deck);
    };

    const handlePlayerHitButton = () => {
        // Use a hit counter to properly deal new cards
        const nextCard = gameDeck[playerCards.length + dealerCards.length]
        setPlayerCards([...playerCards, nextCard])
        setPlayerScore(calculateScore(playerCards))
    }

    const hitDealer = () => {
        const nextCard = gameDeck[playerCards.length + dealerCards.length];
        setDealerCards((prev) => [...prev, nextCard]);
    };

    const handlePlayerStayButton = () => {
        setStay(true)
    }

    useEffect(() => {
            shuffleDeck(deck)
    }, [])

    useEffect(() => {
        if (stay && dealerScore < 17) {
            hitDealer();
        }
    }, [stay, dealerScore]);
    

    useEffect(() => {
        if (dealerCards.length > 0) {
            const score = calculateScore(dealerCards);
            setDealerScore(score);
        }
    }, [dealerCards]);

    useEffect(() => {
        if (stay) {
            if (dealerScore < 17) {
                // Delay dealer hit to look natural
                const timer = setTimeout(() => {
                    hitDealer();
                }, 1000); // 1 second delay for realism
                return () => clearTimeout(timer);
            } else if (dealerScore > 21) {
                setDealerBust(true);
            } else {
                // Dealer stays automatically if 17-21
                if (dealerScore > playerScore) {
                    console.log("Dealer wins");
                    setDealerWin(true)
                }  else if (playerScore > dealerScore) { 
                    console.log("Player wins")
                    setPlayerWin(true)
                } else if (playerScore === dealerScore) {
                    setPush(true)
                }
            }
        }
    }, [dealerScore, stay]);

    useEffect(() => {
        if(playerCards){
            setPlayerScore(calculateScore(playerCards));
        }
    }, [playerCards]);

    useEffect(() => {
        if(playerScore > 21) {
            setPlayerBust(true)
        }
    }, [playerScore])



    return (
        <div className = "casino-container"> 
            <div className = "dealer">
                {dealerBust === true && 
                <button className = "bust" onClick = {resetGame}>BUST</button>}
                {dealerWin ===  true && 
                <div className = "win">WIN</div>}
                {push ===  true && 
                <div className = "push">PUSH</div>}
                <img className = "card-back" src = {dealerCards[0]} alt="Playing Card"></img>
                {(stay === false) ? 
                (<img className = "card-back" src = {CardBack1} alt="Playing Card"></img>) :
                (dealerCards.slice(1).map((card, index) => (
                    <img key={index} className = "card-back" src = {card} alt = "Playing Card"/>
                )))
                }
            </div>
            <div className = "score-card">
                <div className = "score"> {dealerScore} </div>
                <button className = "hit-btn" onClick = {handlePlayerHitButton}>Hit</button> 
                {(playerBust === false) && (stay === false) ? 
                (<button className = "hit-btn" onClick = {handlePlayerStayButton}>Stay</button>) : 
                (<button className = "hit-btn" onClick = {resetGame}>Reset</button>)
                } 
                <div className = "score">{playerScore}</div>
            </div>
            <div className = "player">
                {playerBust === true && 
                <div className = "bust">BUST</div>}
                {playerWin ===  true && 
                <div className = "win">WIN</div>}
                {push ===  true && 
                <div className = "push">PUSH</div>}
                {playerCards &&
                    playerCards.map((_, index) => (
                    <img 
                        key={index} 
                        className="card-back" 
                        src={playerCards[index]} 
                        alt="Playing Card" 
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default BlackJack