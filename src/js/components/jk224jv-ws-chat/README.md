# &lt;jk224jv-ws-chat&gt;

jk224jv-ws-chat is a custom HTML element that creates a chat using websockets. It includes the following features:

* Text-to-speech (TTS) functionality
* Display of received messages
* Input field for sending messages

## Installation

Import the wm component. It will in-turn import its own subcomponents.

In HTML

``` HTML
<script type="module" src="./jk224jv-ws-chat.js"></script>
<jk224jv-ws-chat></jk224jv-wschat>
```

or javascript

``` javascript
import './path/to/module/jk224jv-ws-chat/'
document.querySelector('body').appendChild(document.createElement('jk224jv-ws-chat'))
```

## Dependencies

This component requires the following elements they are imported by the main component.

* jk224jv-input-dialogue: provides the input field for sending messages.
* jk224jv-tts: provides the TTS functionality.

## Events

This component listens for the following event:

### ***inputReceived*** : sent by the jk224jv-input-dialogue element

  The chat will send a message to the server with the content in the event.detail.
