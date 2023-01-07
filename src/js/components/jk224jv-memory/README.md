# jk224-memory

The jk224jv-memory component provides a UI for selecting the size of a new jk224jv-memorygame game and displaying game results. It listens for the memoryWon event and displays the game result data in the UI. It also includes a jk224jv-highscore component for displaying high scores.

## Events

Listens to and handles:
`memoryWon`: Dispatched by the jk224jv-memorygame component when the user wins the game. The event includes the game result data in its detail.

## Example

```HTML
<body>
  <jk224jv-memory></jk224jv-memory>

  <!-- Other HTML content -->

  <!-- Import the component's JavaScript module -->
  <script type="module" src="./jk224jv-memory.js"></script>
</body>
```
