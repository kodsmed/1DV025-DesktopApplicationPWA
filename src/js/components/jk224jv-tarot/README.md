# the Omnissiah´s tarot - Browser edition

This is a web application that uses the Tarot to provide guidance and answer questions. The app includes three different readings:

Card of the day: a single card is drawn to provide guidance for the day
Three card spread: three cards are drawn to answer a specific question or provide guidance on a specific topic.
Credits: displays information about the app and its creator

## Usage

To use the app, simply click on one of the three buttons to start a reading. The app will provide guidance based on the drawn cards, consisting of the symbolism of the card being written below it.

## Authors and acknowledgment

- ॐ नमः शिवाय
- Sir Terry Pratchett, becuase Terry should always be acknowledged.
- Douglas Adams, becuase Douglas should always be acknowledged.
- The term Omnissiah is from the 40k universe and might be considered the ip of Games Workshop Limited. This app or its author is no way shape or form affilliated with or endorsed by Games Workshop Limited.

## License

MIT

## Bugs and support

Please contact me throught discord, slack or student email. In that prefered order.

## Installation

To run the app, you'll need to include the jk224jv-tarot custom element in an HTML file, along with the required dependencies. You'll also need to include the necessary images and stylesheets in the HTML file.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <link href="./css/common.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <jk224jv-tarot></jk224jv-tarot>
    <script src="./lib/tarotdeck.js"></script>
    <script src="./jk224jv-tarot.js"></script>
    <img src="./images/cog.png" id="cog" alt="cog">
    <img src="./images/rod.png" id="rod" alt="rod">
    <img src="./images/sharp.png" id="sharp" alt="sharp">
    <img src="./images/swords.png" id="sword" alt="sword">
    <img src="./images/machinecult.png" id="center" alt="">
  </body>
</html>
```

Once the HTML file is set up, you can open it in a browser to run the app.

### Compatibility

The app may not work on older browsers that do not support the `canvas` element. If you encounter any issues running the app, please try updating your browser to the latest version.

The app will tell you if your browser is not supported.
