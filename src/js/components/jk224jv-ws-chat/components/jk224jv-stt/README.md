# &lt;jk224jv-stt&gt;

jk224jv-tts is a custom HTML element that provides provides speech-to-text transformation. It creates a module that allows users to enable/disable speech-to-text, select a language, and listen to their speech.

  ***Note! uses the SpeechRecognition API. It's only supported by some browsers, so you should check the browser support before using it.***.

  ***Note! On some browsers, like Chrome, using Speech Recognition on a web page involves a server-based recognition engine. Your audio is sent to a web service for recognition processing, so it won't work offline.***

## Events

### sttRecieved

Fires when a sentence is transcribed. The resulting text is passed as a sting in the `event.detail`.

## Example

Installation in a HTML file:

``` HTML
<!-- Include the component script in your HTML file -->
<script type="module" src="path/to/jk224jv-stt.js"></script>

<!-- Use the component in your HTML -->
<jk224jv-stt>
  <!-- You can use this component standalone, but is intended to be use it as part of a larger application -->
</jk224jv-stt>


```
