# &lt;jk224jv-tts&gt;

jk224jv-tts is a custom HTML element that provides text-to-speech functionality. The component includes an input checkbox to enable or disable the text-to-speech feature, and a dropdown menu to select the voice to use.

  ***Note! uses SpeechSynthesis API that is experimental and may change without previous notice***.

## Methods

The jk224jv-tts component has one public method that can be called by the parent component, script or file:

### **play(text *{string}*)**

Playes the provided text as speech using the currently selected voice.

## Example

Installation in a HTML file:

``` HTML
<!-- Include the component script in your HTML file -->
<script type="module" src="path/to/jk224jv-tts.js"></script>

<!-- Use the component in your HTML -->
<jk224jv-tts>
  <!-- You can use this component standalone, but is intended to be use it as part of a larger application -->
</jk224jv-tts>

<script>
  document.querySelector('#enable').checked
  const ttsElement = document.querySelector('jk224jv-tts')
  ttsElement.play('Hello, this is the text-to-speech component speaking!')
</script>
```
