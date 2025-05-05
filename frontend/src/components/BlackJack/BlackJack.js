import '../../css/blackjack.css'
import { deck1, deck2 } from '../../assets/decks'
import { useState, useEffect } from 'react'
// Card Backs
import CardBack1 from '../../assets/cardBacks/CardBack1.svg'
import CardBack2 from '../../assets/cardBacks/CardBack2.svg'


const BlackJack = () => {

    const [deck, setDeck] = useState(deck1)
    const [activeDeck, setActiveDeck] = useState(deck1)
    const [activeBack, setActiveBack] = useState(CardBack1)
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

    // Takes imported deck object and turns it into and array of just image paths
    const flattenDeck = (deckObj) => {
        const cards = [] // Initialize empty array
        for (const suit in deckObj) { // Each suit is its own attribute, loop through each
            console.log('deck object suit: ' + JSON.stringify(deckObj[suit]))
            for (const rank in deckObj[suit]) { // Path is stored under each rank
                console.log('deck object rank: ' + JSON.stringify(deckObj[suit][rank]))
                cards.push(deckObj[suit][rank].default) // Push the image path (stored as 'default' attribute ) for each rank of each suit
            }
        }
        return(cards)
    }

    // Accepts a deck of cards as an array. Returns a randomized copy of that array. 
    const shuffleDeck = (deck) => {
        
        const flatDeck = flattenDeck(deck)
        const shuffledDeck = [...flatDeck];
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

        while(tempScore > 21 && aceCount > 0) {
            tempScore = tempScore - 10
            aceCount -= 1
        }

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

    const handleDeckSelectClick = (deckName) => {
        setDeck(deckName)
        if(deckName === deck1) {
            setActiveBack(CardBack1)
        } else if(deckName === deck2) {
            setActiveBack(CardBack2)
        }
        resetGame()
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
                }, 4000); // 1 second delay for realism
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

    useEffect(() => {
        shuffleDeck(deck)
    }, [deck])



    return (
        <div className = "casino-container"> 
            <div className = 'card-select'>
                <div className = 'card-option' onClick = {() => handleDeckSelectClick(deck1)}>
                    <img className = "card-preview" src = {deck1.spades.A.default} alt="Playing Card"></img>
                    <img className = "card-preview" src = {CardBack1} alt="Playing Card"></img>
                </div>
                <div className = 'card-option' onClick = {() => handleDeckSelectClick(deck2)}>
                    <img className = "card-preview" src = {deck2.spades.A.default} alt="Playing Card"></img>
                    <img className = "card-preview" src = {CardBack2} alt="Playing Card"></img>
                </div>
            </div>
            <div className = "dealer">
                {dealerBust === true && 
                <button className = "bust" onClick = {resetGame}>BUST</button>}
                {dealerWin ===  true && 
                <div className = "win">WIN</div>}
                {push ===  true && 
                <div className = "push">PUSH</div>}
                <img className = "card-back" src = {dealerCards[0]} alt="Playing Card"></img>
                {(stay === false) ? 
                (<img className = "card-back" src = {activeBack} alt="Playing Card"></img>) :
                (dealerCards.slice(1).map((card, index) => (
                    <img key={index} className = "card-back" src = {card} alt = "Playing Card" style = {{ 
                        marginLeft: `-100px`
                    }}/>
                )))
                }
            </div>
            <div className = "score-card">
                <div className = "dealer-score-title">Dealer Score</div>
                <div className = "dealer-score"> {dealerScore} </div>
                <button className = "hit-btn" onClick = {handlePlayerHitButton}>Hit</button> 
                {(playerBust === false) && (stay === false) ? 
                (<button className = "stay-btn" onClick = {handlePlayerStayButton}>Stay</button>) : 
                (<button className = "stay-btn" onClick = {resetGame}>Reset</button>)
                } 
                <div className = "player-score-title">Player Score</div>
                <div className = "player-score">{playerScore}</div>
            </div>
            <div className = "player">
                {playerBust === true && 
                <div className = "bust">BUST</div>}
                {playerWin ===  true && 
                <div className = "win">WIN</div>}
                {push ===  true && 
                <div className = "push">PUSH</div>}
                {playerCards &&
                    <img src = {playerCards[0]} ></img> &&
                    playerCards.map((card, index) => {
                        return (
                            <img 
                                key={index} 
                                className="playing-card" 
                                src={card} 
                                alt="Playing Card" 
                                style={{
                                    marginLeft: `-100px`
                                }}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}

export default BlackJack