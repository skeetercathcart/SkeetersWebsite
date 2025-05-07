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
            for (const rank in deckObj[suit]) { // Path is stored under each rank
                cards.push(deckObj[suit][rank].default) // Push the image path (stored as 'default' attribute ) for each rank of each suit
            }
        }
        return(cards)
    }

    // Accepts a deck of cards as an array. Returns a randomized copy of that array. 
    const shuffleDeck = (deck) => {
        
        // Convert deck from Object to Array
        const flatDeck = flattenDeck(deck)
        // Create a copy of the deck to shuffle
        const shuffledDeck = [...flatDeck];
        let q; // Counter for progression through the deck
        // Loop through deck. Hardcoded to be one deck, could be implemented similiarly for multiple decks.
        for(let i = 0; i < 52; i++) {
            // 52 - i ensures index range is only between current card and the remainder of the deck. Math.random then gives pseudo-random selection. Ok if card "swaps" with itself. 
            q = i + Math.floor(Math.random() * (52 - i));

            // Perform Swap (tradionially store temp var and swap)
            [shuffledDeck[i], shuffledDeck[q]] = [shuffledDeck[q], shuffledDeck[i]];
             
        }

        // Use the shuffled deck and "deal" cards to the dealer and the player. Dealer gets one card because the other is "hidden"
        setGameDeck(shuffledDeck)
        const newDealerCards = [shuffledDeck[0]]
        const newPlayerCards = [shuffledDeck[1], shuffledDeck[2]]
        setDealerCards(newDealerCards)
        setPlayerCards(newPlayerCards)
        // Calc initial scores
        const freshPlayerScore = calculateScore(playerCards)
        setPlayerScore(freshPlayerScore)
        const freshDealerScore = calculateScore(dealerCards)
        setDealerScore(freshDealerScore)
    }

    // Function to calculate the score of an individual hand
    const calculateScore = (hand) => {
        let tempScore = 0;
        let aceCount = 0; // Keep track of aces in order to adjust score if hand goes over 21

        // Standard score counting
        hand.forEach(card => {
            const cardValue = getCardValue(card);
            tempScore += cardValue
            if (card.includes('A')) {
                aceCount += 1
            }
        })

        // If score is over 21, remove 10 for each ace, until under 21 again 
        while(tempScore > 21 && aceCount > 0) {
            tempScore = tempScore - 10
            aceCount -= 1
        }

        return ( tempScore )

    }

    // Function to get the value of a card. 
    const getCardValue = (card) => {
        // Elements in the array are paths to a card image, they are not string of the variable names (i.e. s2, s3, s4 etc...)
        // Extract the part like "Diamonds_9" or "Spades_K"
        const match = card.match(/\/([A-Za-z]+)_(\d+|A|J|Q|K)\./); 
        // Extract rank, since suit doesn't matter
        const rank = match ? match[2] : '';

        // Scoring for each rank. Aces will be handled as 1 as needed when totalling the hand.
        if (rank === 'A') return 11;
        if (['K', 'Q', 'J', '10'].includes(rank)) return 10;
        return parseInt(rank); // numbers 2-9
    }

    // Function to change the deck art when selected from sidebar
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

    // Function to deal the player a new card
    const handlePlayerHitButton = () => {
        // Next card is taken as the next unused element from the deck array
        const nextCard = gameDeck[playerCards.length + dealerCards.length]
        // Set player's new hand
        setPlayerCards([...playerCards, nextCard])
    }

    // Function to deal the dealer a new card
    const hitDealer = () => {
        // Next card is taken as the next unused element from the deck array
        const nextCard = gameDeck[playerCards.length + dealerCards.length];
        // Set dealer's new hand
        setDealerCards((prev) => [...prev, nextCard]);
    };

    // Function for when the player stays
    const handlePlayerStayButton = () => {
        setStay(true)
    }

    // On initial load, shuffle the deck and deal
    useEffect(() => {
            shuffleDeck(deck)
    }, [])

    // When the player stays, hit the dealer. If the dealer is under 17, hit until dealer is above 17
    useEffect(() => {
        if (stay && dealerScore < 17) {
            hitDealer();
        }
    }, [stay, dealerScore]);
    
    // Calculate the dealer score whenever the dealer gets cards
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
                    setDealerWin(true)
                }  else if (playerScore > dealerScore) { 
                    setPlayerWin(true)
                } else if (playerScore === dealerScore) {
                    setPush(true)
                }
            }
        }
    }, [dealerScore, stay]);

    // Calc the player score whenever they get a new card
    useEffect(() => {
        if(playerCards){
            setPlayerScore(calculateScore(playerCards));
        }
    }, [playerCards]);

    // Show player bust if they exceed 21
    useEffect(() => {
        if(playerScore > 21) {
            setPlayerBust(true)
        }
    }, [playerScore])

    // Shuffle the deck / reset the game when a new deck is selected
    useEffect(() => {
        shuffleDeck(deck)
    }, [deck])



    return (
        <div className = "casino-container"> 
            <div className = 'card-select'>
                <h className = "card-style-header">Select Card Style</h>
                <div className = 'card-option' onClick = {() => handleDeckSelectClick(deck1)}>
                    <img className = "card-preview" src = {deck1.spades.A.default} alt="Playing Card"></img>
                    <img className = "card-preview" src = {CardBack1} alt="Playing Card"></img>
                </div>
                <div className = 'card-option' onClick = {() => handleDeckSelectClick(deck2)}>
                    <img className = "card-preview" src = {deck2.spades.A.default} alt="Playing Card"></img>
                    <img className = "card-preview" src = {CardBack2} alt="Playing Card"></img>
                </div>
            </div>
            <div className = "play-container">
                <div className = "dealer">
                    {dealerBust === true && 
                    <button className = "bust" onClick = {resetGame}>BUST</button>}
                    {dealerWin ===  true && 
                    <div className = "win">WIN</div>}
                    {push ===  true && 
                    <div className = "push">PUSH</div>}
                    <img className = "playing-card" src = {dealerCards[0]} alt="Playing Card"></img>
                    {(stay === false) ? 
                    (<img className = "playing-card" src = {activeBack} alt="Playing Card"></img>) :
                    (dealerCards.slice(1).map((card, index) => (
                        <img key={index} className = "playing-card" src = {card} alt = "Playing Card" />
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
                        playerCards.map((card, index) => {
                            return (
                                <img 
                                    key={index} 
                                    className="playing-card" 
                                    src={card} 
                                    alt="Playing Card"
                                />
                            );
                        })
                    }
                </div>
            </div>
            <div className = "rules-container"> 
                <h2>Blackjack Rules</h2>
                <ul>
                    <li>The goal is to get as close to <strong>21</strong> as possible without going over.</li>
                    <li>Each player is dealt 2 cards. The dealer also gets 2 cards (one face down).</li>
                    <li>Cards 2-10 are worth their face value.</li>
                    <li>Face cards (J, Q, K) are worth 10 points.</li>
                    <li>Aces can be worth <strong>1 or 11</strong>, whichever is better for your hand.</li>
                    <li>If your first two cards total 21 (Ace + 10 or face card), that’s called <strong>Blackjack</strong> and you win — unless the dealer also has Blackjack (a tie).</li>
                    <li>You can choose to:
                        <ul>
                            <li><strong>Hit</strong> (take another card)</li>
                            <li><strong>Stand</strong> (keep your current hand)</li>
                        </ul>
                    </li>
                    <li>If your total goes over 21, you <strong>bust</strong> and lose the round.</li>
                    <li>The dealer must hit until they reach at least 17 points.</li>
                    <li>If you have a higher score than the dealer without busting, you win!</li>
                </ul>
            </div>
        </div>
    )
}

export default BlackJack