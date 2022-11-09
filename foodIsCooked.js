/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // If it's beef, the temp depends on the doneness
  if (kind === 'beef') {
    switch (doneness) {
      case 'rare':
        // Temp for rare should be above 125 but below 135
        return internalTemp > 125 && internalTemp <= 135
        break;
        case 'medium':
          // Temp for medium should be above 135 but below 155
          return internalTemp > 135 && internalTemp <= 155
        break;
        case 'well':
          //Temp for well done should be above 155
          return internalTemp > 155 
        break;
      default: // Chef is confused by request
      return null
        break;
    }
  } else { //If it's chicken, temp should be above 165
  return internalTemp > 165 
}
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true