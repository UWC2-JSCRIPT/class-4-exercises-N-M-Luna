/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {

  // Create a 52-card deck of cards
  const deck = []
  let card

  // For each of the suits,
  const suits = ['hearts', 'spades', 'club', 'diamonds']
  for (suit of suits) {

    // For each of the 13 different cards,
    for (var i = 2; i < 15; i++) {
      
      // Create a card object (with val, displayVal, and suit)
      let value, display
      switch (i) {
        case 11:
          display = 'Jack'
          value = 10
          break;
        case 12:
          display = 'Queen'
          value = 10
          break;
        case 13:
          display = 'King'
          value = 10
        break;
        case 14:
          display = 'Ace'
          value = 11
        break;
        default:
          display = i.toString()
          value = i
        break;
      }
    
      card = {
        val: value,
        displayVal: display,
        suit: suit
      }

      //Push the new card in the deck we're building
        deck.push(card)
        console.log(card)
      }
    }
    
    return deck;
  }


// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);