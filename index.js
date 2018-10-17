var arrayOfArtists = ['Vincent Van Gogh', 'Banksy', 'Michelangelo', 'Pablo Picasso', 'Andy Warhol', 'Leonardo Da Vinci', 'Claude Monet', 'Jackson Pollock', 'Mark Rothko', 'Roy Lichtenstein', 'Salvador Dali', "Georgia O'Keefe"];
var completedArtists = [];

var arrayOfHints = ['Dutch Post-Impressionist painter whose works are characterized by bold colors and dramatic brushstrokes. Arguably the most famous painter in the history of Western art.', 'Street artist. Often implements satire, dark humor, and political/social commentary with a distinctive stenciling technique.', 'Italian sculptor and painter during the High Renaissance. His impassioned, highly personal style eventually lead to the development of Mannerism.', "Spanish artist most known for co-founding the Cubist movement, the collage, the invention of the 'assemblage, and a wide variety of artistic styles.", 'American pop artist that explored the relationship between artistic expression, celebrity culture, and advertising.', 'Italian polymath, mastering multiple areas of interest such as painting, invention, sculpting, biology, mathematics, anatomy, etc. He produced what is widely considered the most famous painting ever created.', 'French painter and founder of French Impressionism. He is known for his exceptional understanding and portrayal of the effects of light on color and of the juxtaposition of colors with each other.', "American painter and major figure of the Abstract Expressionist movement. Most known for his unique style of 'drip' painting.", 'American artist famous for his large-scale color field paintings.', 'American pop artist, often producing works with precise compositions that documented while they parodied - a concept inspired by the comic strip.', 'Prominent Spanish surrealist with expansive skills in painting, sculpture, and film. Many considered his personality, mannerisms, and behavior to be rather eccentric and grandiose - especially indicative of his wild imagination.', 'American artist best known for her paintings of enlarged flowers, often evoking veiled representations of female genitalia.'];

var theWord = [];
var guessWord = [];
var artistIndex = 0;
var isPlaying = false;
// var numGuesses = 5;
// var numWins = 0;

// Function that retrieves a random word from the array
function getWord() {
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

function getHint() {
  if(isPlaying) {
    $("#wordHint").text(arrayOfHints[artistIndex]);
  }
}

// Checks a letter (letter will be drawn from input - see #submitButton Event Listener)
function checkLetter(letter) {
  var arrayOfBoxes = document.getElementsByClassName('letterBox');

  for(let z = 0; z < theWord.length; z++) {
    if(letter.toLowerCase() == theWord[z].toLowerCase()) {
      guessWord[z] = theWord[z];
      $("#box" + z).text(theWord[z]);
    }
  }
}

function clearInput() {
  $("#letterInput").val('');
}

function clearHint() {
  $("#wordHint").val('');
}

// Alert pops up before box is changed *
function winCheck() {
  if(guessWord.indexOf("_") == -1) {
    alert("You have won!");
    isPlaying = false;
    clearHint();
  }
}

function startGame() {
  getWord();
  createGuessWord();
  isPlaying = true;

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
    winCheck();
  }
})

// called on hitting submit
// function that takes input and checks
