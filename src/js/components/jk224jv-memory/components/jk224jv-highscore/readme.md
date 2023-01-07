# jk224jv-highscore

This is a custom element that displays highscores for a memory game. It has two lists, one for games played with preview enabled and one for games played without. The list displays the top 5 scores for each of these categories. The element also contains an input field for the user to input their nickname when they get a high score.

## Usage & Public Method

To add a new result to the highscore board, use the addResult(result) method on the jk224jv-highscore element. The result parameter should be an object with the following properties:

* `moves {number}`: the number of moves taken to complete the game.
* `columns {number}`: the number of columns in the game.
* `rows {number}`: the number of rows in the game.
* `preview {boolean}`: whether preview was enabled for the game.
* `username {string}`: the player's username.

See example for how this may be done.

The element will handle adding the new score to the appropriate list and saving it to local storage.

## Events

The element listens for an `inputReceived` event.

The inputReceived event should have a detail property with the string value containing the username.

The element does not emit any events.

## Notes

* Results are stored in local storage, so they will persist across page refreshes.

* Results are scrambled using the variable `key`, default: 'Life Univerce and Everything: 42', before being stored in local storage.

## Example

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>My Memory Game</title>
  </head>
  <body>
    <jk224jv-highscore></jk224jv-highscore>
    <script type="module" src="./components/jk224jv-highscore/index.js"></script>
    <script>
      const highscore = document.querySelector('jk224jv-highscore');

      highscore.addResult({
        moves: 12,
        columns: 4,
        rows: 2,
        preview: false,
        username: 'Player 1'
      });
    </script>
  </body>
</html>
```
