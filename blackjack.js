const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = []
  }

  drawCard() { 
    //Pick a random card
    const i = Math.ceil(Math.random()*blackjackDeck.length)
    const card = blackjackDeck[i]
    this.hand.push(card)
  }
}; 

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); 
const player = new CardPlayer('Player'); 

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let total = 0
  let isSoft = false
  let firstAce = true

  // Add values of cards 
  hand.forEach(card => {
    total += card.val
    if (card.displayVal === 'Ace'){
      if (firstAce) {
        // 1st ace drawn is soft
        isSoft = true
        firstAce = false
      } else {
        // 2nd+ ace drawn: +1
        total -= 10
      }
    } 
    //If the count goes over 21 and there's an ace that's being counted as 11,
    if (total > 21 && isSoft) {
      // The ace now counts as 1
      total -= 10
      isSoft = false
    }
  })

  const blackJackScore = {
    total: total, 
    isSoft: isSoft
  }
  return blackJackScore
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  const dealerScore = calcPoints(dealerHand)
  if (dealerScore < 16) {
    return true
  } else if (dealerScore === 17) {
    return isSoft
  } else { // if dealerScore > 17 
    return false
  } 
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  let winner 
  if (playerScore > dealerScore) {
    winner = `Player`
  } else if (playerScore === dealerScore) {
    winner = `It's a tie.`
  } else { //if (playerScore < dealerScore)
    winner = `Dealer`
  }

  return `Score:
  Player: ${playerScore} points
  Dealer: ${dealerScore} points
  Winner: ${winner}`
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard(); // if player.score === 21, player wins
  let playerScore = calcPoints(player.hand).total;
  if (playerScore === 21) {
    return determineWinner(playerScore, dealerScore);
  }
  dealer.drawCard(); // if dealer.score === 21, dealer wins
  let dealerScore = calcPoints(dealer.hand).total;
  if (dealerScore === 21) {
    return determineWinner(playerScore, dealerScore);
  }
  
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);
  
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());