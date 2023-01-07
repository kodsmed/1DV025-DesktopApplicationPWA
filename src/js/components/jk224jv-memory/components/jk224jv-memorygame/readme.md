# jk224jv-memorygame

The jk224jv-memorygame component generates a grid of jk224jv-flipcard elements and listens for their cardflipped events. When the user flips two matching cards, the cards stay face up. When the user flips two non-matching cards, the cards flip back over. The component keeps track of the number of turns the user has taken and ends the game when all pairs have been found. It also listens for keydown events and allows the user to navigate the card grid with the arrow keys.

## Attributes

`columns` : A number attribute that sets the number of columns in the card grid. Accepts values from 1 to 10. Default is 2.

`rows` : A number attribute that sets the number of rows in the card grid. Accepts values from 1 to 4. Default is 2.

`preview` : A boolean attribute that, if present, enables a preview mode where all the cards are displayed face up at the start of the game. Default is false.

## Example

```HTML
<body>
  <jk224jv-memorygame columns="4" rows="3" preview></jk224jv-memorygame>
  <script src="path/to/jk224jv-memorygame.js"></script>
</body>
```

This would create a memory game with a 4x3 grid of cards and enable preview mode. The columns and rows attributes can be omitted or set to different values to customize the size of the grid. The preview attribute can be omitted to disable preview mode.
