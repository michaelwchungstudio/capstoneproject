var arrayOfArtists = ['Vincent Van Gogh', 'Banksy', 'Michelangelo', 'Pablo Picasso', 'Andy Warhol', 'Leonardo Da Vinci', 'Claude Monet', 'Jackson Pollock', 'Mark Rothko', 'Roy Lichtenstein', 'Salvador Dali', "Georgia O'Keefe"];
var arrayOfArtistsCopy = arrayOfArtists.slice(0, arrayOfArtists.length);

var arrayOfHints = ['Dutch Post-Impressionist painter whose works are characterized by bold colors and dramatic brushstrokes. Arguably the most famous painter in the history of Western art.', 'Street artist. Often implements satire, dark humor, and political/social commentary with a distinctive stenciling technique.', 'Italian sculptor and painter during the High Renaissance. His impassioned, highly personal style eventually lead to the development of Mannerism.', "Spanish artist most known for co-founding the Cubist movement, the collage, the invention of the 'assemblage, and a wide variety of artistic styles.", 'American pop artist that explored the relationship between artistic expression, celebrity culture, and advertising.', 'Italian polymath, mastering multiple areas of interest such as painting, invention, sculpting, biology, mathematics, anatomy, etc. He produced what is widely considered the most famous painting ever created.', 'French painter and founder of French Impressionism. He is known for his exceptional understanding and portrayal of the effects of light on color and of the juxtaposition of colors with each other.', "American painter and major figure of the Abstract Expressionist movement. Most known for his unique style of 'drip' painting.", 'American artist famous for his large-scale color field paintings.', 'American pop artist, often producing works with precise compositions that documented while they parodied - a concept inspired by the comic strip.', 'Prominent Spanish surrealist with expansive skills in painting, sculpture, and film. Many considered his personality, mannerisms, and behavior to be rather eccentric and grandiose - especially indicative of his wild imagination.', 'American artist best known for her paintings of enlarged flowers, often evoking veiled representations of female genitalia.'];
var arrayOfHintsCopy = arrayOfHints.slice(0, arrayOfHints.length);

var theWord = [];
var guessWord = [];
var artistIndex = 0;
var isPlaying = false;
var numGuessesLeft = 7;
var numWins = 0;

// Function that retrieves a random word from the array
function getWord() {
  // Resets array of artists and hints if depleted
  if(arrayOfArtists.length == 0) {
    arrayOfArtists = arrayOfArtistsCopy.slice(0, arrayOfArtistsCopy.length);
    arrayOfHints = arrayOfHintsCopy.slice(0, arrayOfHintsCopy.length);
  }

  // Generates a random number between 0 and arrayOfArtists.length
  artistIndex = Math.floor(Math.random() * arrayOfArtists.length);

  // Clears the variables
  theWord = [];
  guessWord = [];

  // Assigns the word, split, to the 'theWord' variable
  theWord = arrayOfArtists[artistIndex].split("");
}

// Function that creates the 'guessWord' value ('_' for each letter)
// + generates the 'div's that hold each value of 'guessWord'
function createGuessWord() {
  // Empties the previous 'div's if there are any
  $("#guessWord").empty();
  $("#wordHint").empty();

  // For each character in 'theWord', create a 'div' with class: letterBox and id: box + i
  // + push a '_' for each letter in 'theWord' into 'guessWord'
  for(let i = 0; i < theWord.length; i++) {
    if(/[a-zA-Z]/.test(theWord[i])) {
      var tempBox = document.createElement("div");
      tempBox.className = "letterBox";
      tempBox.id = "box" + i;
      tempBox.innerHTML = "_";

      guessWord.push("_");

      $("#guessWord").append(tempBox);
    }
    // If it's a space
    else if(theWord[i] == " "){
      var tempBox = document.createElement("div");
      tempBox.className = "letterBox";
      tempBox.id = "box" + i;
      tempBox.innerHTML = " ";

      guessWord.push(" ");

      $("#guessWord").append(tempBox);
    }
    // If it's a symbol
    else {
      var tempBox = document.createElement("div");
      tempBox.className = "letterBox";
      tempBox.id = "box" + i;
      tempBox.innerHTML = theWord[i];

      guessWord.push(theWord[i]);

      $("#guessWord").append(tempBox);
    }
  }
}

// Function that grabs a hint from array equal to corresponding index
function getHint() {
  if(isPlaying) {
    $("#wordHint").text(arrayOfHints[artistIndex]);
  }
}

// Checks a letter (letter will be drawn from input - see #submitButton Event Listener)
function checkLetter(letter) {
  // Checks if the input is a letter
  if(/[a-zA-Z]/.test(letter)) {
    // Checks if the letter is in the word (check Upper and Lower)
    if(theWord.indexOf(letter.toUpperCase()) !== -1 || theWord.indexOf(letter.toLowerCase()) !== -1) {
      for(let z = 0; z < theWord.length; z++) {
        if(letter.toLowerCase() == theWord[z].toLowerCase()) {
          guessWord[z] = theWord[z];
          $("#box" + z).text(theWord[z]);
        }
      }
    }
    // If not, guess left decreases by one, div updates correspondingly
    else {
      numGuessesLeft--;
      $("#playerGuesses").text("Guesses: " + numGuessesLeft);
    }
  }
}

function clearInput() {
  $("#letterInput").val('');
}

function clearHint() {
  $("#wordHint").val('');
}

// Checks if the user has won
function winCheck() {
  if(guessWord.indexOf("_") == -1) {
    alert("You have won!");
    isPlaying = false;
    clearHint();

    numWins++;
    $("#playerWins").text("Wins: " + numWins);

    // Remove artist and hint from arrays
    arrayOfArtists.splice(artistIndex, 1);
    arrayOfHints.splice(artistIndex, 1);
  }
}

// Checks if the user has no more incorrect guesses available
function loseCheck() {
  if(numGuessesLeft == 0) {
    alert("Nice try!");
    isPlaying = false;

    // Displays the word for the user after loss
    for(let y = 0; y < theWord.length; y++) {
      $("#box" + y).text(theWord[y]);
    }

    // Remove artist and hint from arrays
    arrayOfArtists.splice(artistIndex, 1);
    arrayOfHints.splice(artistIndex, 1);
  }
}

function startGame() {
  isPlaying = true;
  numGuessesLeft = 7;
  $("#playerGuesses").text("Guesses: " + numGuessesLeft);
  clearHint();
  getWord();
  createGuessWord();
  getHint();

  console.log(theWord);
  console.log(guessWord);
}

$("#startButton").click(function() {
  startGame();
})

$("#hintButton").click(function() {
  getHint();
})

$("#submitButton").click(function() {
  checkLetter($("#letterInput").val());
  clearInput();

  if(isPlaying) {
    setTimeout(function() {
      winCheck();
      loseCheck();
    })
  }
})

// called on hitting submit
// function that takes input and checks

// shuffle
// An equivalent version which shuffles the array in the opposite direction (from lowest index to highest) is:
//
// -- To shuffle an array a of n elements (indices 0..n-1):
// for i from 0 to n−2 do
//      j ← random integer such that i ≤ j < n
//      exchange a[i] and a[j]

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

//  var testArr = [1, 2, 5, 9, 3];
//  var artistIndexTest = Math.floor(Math.random() * testArr.length);
//
// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }

// -- To shuffle an array a of n elements (indices 0..n-1):
// for i from n−1 downto 1 do
//      j ← random integer such that 0 ≤ j ≤ i
//      exchange a[j] and a[i]
