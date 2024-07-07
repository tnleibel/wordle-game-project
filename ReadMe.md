![Wordle Screenshot](https://imgur.com/IfGB7a9)

# WORDLE

## INTRO
WORDLE hardly needs an introduction, but here's one anyways! Wordle was created in 2021 by Josh Wardle (yes, he named the game after himself). He made it for his partner as something they could play together during the pandemic, before making it widely available later that year. Within two months, hundreds of thousands were playing the game, and within three the New York Times had acquired the game for a LOT of money.

Wordle is played over six turns. Each turn, the player will input a five-letter word as a guess, and the game will then flip the tiles containing the guessed word. Letters will turn grey if they are not in the word, yellow if they are in the word but in a different position, and green if they are in the word and the correct position. Get five green letters before you run out of turns, and you win!

Personally, I've always loved word games, and I've been a Wordle addict since shortly after it was acquired by the NYT, so it seemed like a natural fit for me in my first attempt at making a web game. With all due respect to Josh Wardle, who very purposefully made Wordle minimally replayable, I have made the game infinitely replayable with just a simple refresh of the page, for the sake of myself and all the other Wordle addicts I know (grandma, this one's for you!)

## PLAY THE GAME
You can access the deployed game [here!](https://tnleibel.github.io/wordle-game-project/)

The rules for the game are included on the page, simply click the rules button and a pop up will get you up to speed.

Once you've finished one puzzle, win or lose, simply refresh the page to receive a new word to figure out! With over 5000 words in the word list, you can play to your heart's content!

## ATTRIBUTIONS

- The tile flipping animation was licensed from [animista.net](https://animista.net/play/basic/flip/flip-horizontal-top), full credits are contained in the style.css file in this directory.

- The word list is made up of a combination of two lists, the first was posted by Bill Cruise on [kaggle.com](https://www.kaggle.com/datasets/bcruise/wordle-valid-words?select=valid_solutions.csv), and the second was posted by slushman on [github.com](https://gist.github.com/slushman/34e60d6bc479ac8fc698df8c226e4264)

## TECHNOLOGIES USED

My version of Wordle was coded in VSCode using HTML to create the bones of the webpage, Javascript to add functionality to the game, and CSS to make the page visually appealing and compliant with accesibility standards.

## WHAT'S NEXT (STRETCH GOALS)

While I feel well above the minimum requirements for my Wordle game, there are still a couple things I would like to improve to make the experience that much better.

- There are still two edge cases that I am trying to fix: 

1. The first involves letters coming up yellow before the same letter comes up green later in the word (in this case the first instance of the letter should be grey, unless there are two instances of the letter in the word).

2. The second involves the changing of keyboard key colors to correspond with the status of letters in the grid. If a letter first comes up yellow in a word, then grey later on in the word, the corresponding keyboard key turns grey when it should turn yellow and stay yellow until that letter becomes green (this part works fine as of now).

- Having had friends and family test the game on a variety of devices, there are still some issues with the keyboard improperly rendering on iPhones specifically, I will be adding more media queries to specifically address the issues on this platform. From all the testing that's been done, these issues only show up on iPhones, regardless of the browser used to access the website.