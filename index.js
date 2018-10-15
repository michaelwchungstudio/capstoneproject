var arrayOfArtists = ['Vincent Van Gogh', 'Banksy', 'Michelangelo', 'Pablo Picasso', 'Andy Warhol', 'Leonardo Da Vinci', 'Claude Monet', 'Jackson Pollock', 'Mark Rothko', 'Roy Lichtenstein', 'Salvador Dali', "Georgia O'Keefe"];

var theWord = "";
var guessWord = "";

var guessWordHTML = document.getElementById('guessWord');

function placeWord() {
  var randomNum = Math.floor(Math.random() * arrayOfArtists.length);
  var theWord = arrayOfArtists[randomNum];
  var guessWord = "";
  var wordSplit = arrayOfArtists[randomNum].split(" ");

  console.log(wordSplit);

  for(let i = 0; i < wordSplit.length; i++) {
    for(let z = 0; z < wordSplit[i].length; z++) {
      if(/[a-zA-Z]/.test(wordSplit[i][z])) {
        guessWord += " _ ";
      }
      else {
        guessWord += wordSplit[i][z];
      }
    }

    guessWord += " ";
  }

  $("#guessWord").text(guessWord);
  // guessWordHTML.innerHTML = guessWord;
}

$("#startGame").click(function() {
  placeWord();
})
