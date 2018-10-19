// Consider storing all information on artist in one 'Artist' object {name: x, description: y, artwork: z} so they are always "together"
// This way, you could use the Durstenfeld shuffle and simply go 1, 2, 3, etc. and reshuffle every "round" instead of copying data (less efficient)
var arrayOfArtists = ['Vincent Van Gogh', 'Banksy', 'Michelangelo', 'Pablo Picasso', 'Andy Warhol', 'Leonardo Da Vinci', 'Claude Monet', 'Jackson Pollock', 'Mark Rothko', 'Roy Lichtenstein', 'Salvador Dali', "Georgia O'Keefe"];
var arrayOfArtistsCopy = arrayOfArtists.slice(0, arrayOfArtists.length);

var arrayOfHints = ['Dutch Post-Impressionist painter whose works are characterized by bold colors and dramatic brushstrokes. Arguably the most famous painter in the history of Western art.', 'Street artist. Often implements satire, dark humor, and political/social commentary with a distinctive stenciling technique.', 'Italian sculptor and painter during the High Renaissance. His impassioned, highly personal style eventually lead to the development of Mannerism.', "Spanish artist most known for co-founding the Cubist movement, the collage, the invention of the 'assemblage, and a wide variety of artistic styles.", 'American pop artist that explored the relationship between artistic expression, celebrity culture, and advertising.', 'Italian polymath, mastering multiple areas of interest such as painting, invention, sculpting, biology, mathematics, anatomy, etc. He produced what is widely considered the most famous painting ever created.', 'French painter and founder of French Impressionism. He is known for his exceptional understanding and portrayal of the effects of light on color and of the juxtaposition of colors with each other.', "American painter and major figure of the Abstract Expressionist movement. Most known for his unique style of 'drip' painting.", 'American artist famous for his large-scale color field paintings.', 'American pop artist, often producing works with precise compositions that documented while they parodied - a concept inspired by the comic strip.', 'Prominent Spanish surrealist with expansive skills in painting, sculpture, and film. Many considered his personality, mannerisms, and behavior to be rather eccentric and grandiose - especially indicative of his wild imagination.', 'American artist best known for her paintings of enlarged flowers, often evoking veiled representations of female genitalia.'];
var arrayOfHintsCopy = arrayOfHints.slice(0, arrayOfHints.length);

var arrayOfArtwork = ['artwork/vangogh.jpg', 'artwork/banksy.jpg', 'artwork/michelangelo.jpg', 'artwork/picasso.jpg', 'artwork/warhol.jpg', 'artwork/davinci.jpg', 'artwork/monet.jpg', 'artwork/pollock.jpg', 'artwork/rothko.jpg', 'artwork/lichtenstein.jpg', 'artwork/dali.jpg', 'artwork/okeeffe.jpg'];
var arrayOfArtworkCopy = arrayOfArtwork.slice(0, arrayOfArtwork.length);

// Variables
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
    arrayOfArtwork = arrayOfArtworkCopy.slice(0, arrayOfArtworkCopy.length);
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
  $("#guessDisplay").empty();
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

      $("#guessDisplay").append(tempBox);
    }
    // If it's a space
    else if(theWord[i] == " "){
      var tempBox = document.createElement("div");
      tempBox.className = "spaceBox";
      tempBox.id = "box" + i;
      tempBox.innerHTML = " ";

      guessWord.push(" ");

      $("#guessDisplay").append(tempBox);
    }
    // If it's a symbol
    else {
      var tempBox = document.createElement("div");
      tempBox.className = "symbolBox";
      tempBox.id = "box" + i;
      tempBox.innerHTML = theWord[i];

      guessWord.push(theWord[i]);

      $("#guessDisplay").append(tempBox);
    }
  }
}

// Function that grabs a hint from array equal to corresponding index
function getHint() {
  $("#wordHint").text(arrayOfHints[artistIndex]);
}

// Function that grabs the artwork from array equal to corresponding index
function getArtwork() {
  $("#artwork").css({
    'background-image': 'url(' + arrayOfArtwork[artistIndex] + ')'
  });
}

// Checks if a letter (letter will be drawn from input) is in the word
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
      $("#playerGuesses").text(numGuessesLeft);
    }
  }
}

// checks if the word (drawn from input) is the correct word
function checkWord(word) {
  var wordCopy = word.split("");
  var isEqual = true;

  // compares each letter - if not the same, break out of the loop and set the boolean to false => next if statement will not trigger, subtract one guess
  if(wordCopy.length == theWord.length) {
    for(let z = 0; z < wordCopy.length; z++) {
      if(wordCopy[z].toLowerCase() !== theWord[z].toLowerCase()) {
        isEqual = false;
        numGuessesLeft--;
        $("#playerGuesses").text(numGuessesLeft);
        break;
      }
    }
  }
  else {
    isEqual = false;
    numGuessesLeft--;
    $("#playerGuesses").text(numGuessesLeft);
  }

  // if the two words are equal, set the guess word to equal the word and change all the boxes to reflect the correct letter
  if(isEqual) {
    guessWord = theWord;
    for(let w = 0; w < guessWord.length; w++) {
      $("#box" + w).text(theWord[w]);
    }
  }
}

// Simple clearing functions
function clearWordInput() {
  $("#wordInput").val('');
}

function clearHint() {
  $("#wordHint").val('');
}

function clearArtwork() {
  $("#artwork").css({
    'background-image': 'none'
  });
}

function clearLetterInput() {
  $("#letterInput").text('_');
}

// Checks if the user has won
function winCheck() {
  if(guessWord.indexOf("_") == -1) {
    winModal();
    isPlaying = false;
    getArtwork();

    numWins++;
    $("#playerWins").text(numWins);

    // Remove artist, hint, and artwork from arrays
    arrayOfArtists.splice(artistIndex, 1);
    arrayOfHints.splice(artistIndex, 1);
    arrayOfArtwork.splice(artistIndex, 1);
  }
}

// Checks if the user has no more incorrect guesses available
function loseCheck() {
  if(numGuessesLeft == 0) {
    lossModal();
    isPlaying = false;
    getArtwork();

    // Displays the word for the user after loss
    for(let y = 0; y < theWord.length; y++) {
      $("#box" + y).text(theWord[y]);
    }

    // Remove artist and hint from arrays
    arrayOfArtists.splice(artistIndex, 1);
    arrayOfHints.splice(artistIndex, 1);
    arrayOfArtwork.splice(artistIndex, 1);
  }
}

// Pop-up for win
function winModal() {
  var modalBox = document.createElement('div');
  modalBox.className = "modalBox";

  var modalText = document.createElement('div');
  modalText.className = "modalText";
  modalText.innerHTML = "Nice! You figured it out!"

  var modalButton = document.createElement('div');
  modalButton.classList.add("gameButton");
  modalButton.id = "exitModalButton";
  modalButton.innerHTML = "CONTINUE";

  $(".mainContent").append(modalBox);
  $(".modalBox").append(modalText);
  $(".modalBox").append(modalButton);
}

// Pop-up for loss
function lossModal() {
  var modalBox = document.createElement('div');
  modalBox.className = "modalBox";

  var modalText = document.createElement('div');
  modalText.className = "modalText";
  modalText.innerHTML = "Nice try :-)"

  var modalButton = document.createElement('div');
  modalButton.classList.add("gameButton");
  modalButton.id = "exitModalButton";
  modalButton.innerHTML = "CONTINUE";

  $(".mainContent").append(modalBox);
  $(".modalBox").append(modalText);
  $(".modalBox").append(modalButton);
}

// Main function - starts the game and acts as the "next" button
// Possibly try setting a timeout so that after 5 - 10 seconds, after displaying everything (if loss or win), this function or "next" button is triggered
function startRound() {
  isPlaying = true;
  numGuessesLeft = 7;
  $("#playerGuesses").text(numGuessesLeft);
  clearWordInput();
  clearLetterInput();
  clearHint();
  clearArtwork();
  getWord();
  createGuessWord();
  getHint();

  console.log(theWord);
  console.log(guessWord);
}

// Event Listeners
$("#submitButton").click(function() {
  if(isPlaying) {
    checkWord($("#wordInput").val());
    clearWordInput();

    setTimeout(function() {
      winCheck();
      loseCheck();
    })
  }
})

$("#artButton").click(function() {
  if(isPlaying) {
    getArtwork();
  }
})

$("#nextButton").click(function() {
  startRound();
})

// on click, resets the game
$("#resetButton").click(function() {
  arrayOfArtists = arrayOfArtistsCopy.slice(0, arrayOfArtistsCopy.length);
  arrayOfHints = arrayOfHintsCopy.slice(0, arrayOfHintsCopy.length);
  arrayOfArtwork = arrayOfArtworkCopy.slice(0, arrayOfArtworkCopy.length);

  numGuessesLeft = 7;
  numWins = 0;

  $("#playerWins").text(numWins);
  $("#playerGuesses").text(numGuessesLeft);

  startRound();
})

// track keypress, display letter
$(document).keypress(function(l) {
  if(/[a-zA-Z]/.test(l.key) && l.keyCode !== 13) {
    $("#letterInput").text(l.key.toUpperCase());
  }
})

// on pressing 'enter', will check the keypress value as letter
$(document).keypress(function(e) {
  if(isPlaying && /[a-zA-Z]/.test($("#letterInput").text()) && e.keyCode == 13) {
    checkLetter($("#letterInput").text());
    clearLetterInput();

    winCheck();
    loseCheck();
  }
})

// when in the input box, stop the above keypress listening
$('#wordInput').keypress(function(e) {
  e.stopPropagation();
});

// on click, exits the modal
window.addEventListener('click', function(e) {
  if(e.target.id == 'exitModalButton') {
    $('.modalBox').hide();

    startRound();
  }
})

// On load, start the game
$(window).on('load', function() {
  startRound();
});
