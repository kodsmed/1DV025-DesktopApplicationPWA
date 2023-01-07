# &lt;jk224jv-wm&gt;

A window manager that can open, close, minimize and restore windows. The window manager also has a dock that displays minimized windows. The window manager supports storing data in the form of cookies and localstorage to improve user experience.

## Installation

Import the wm component. It will in-turn import its own subcomponents: window and dock.

In HTML

``` HTML
<script type="module" src="./jk224jv-wm.js"></script>
<jk224jv-wm></jk224jv-wm>
```

or javascript

``` javascript
import './jk224jv-wm/'
document.querySelector('body').appendChild(document.createElement('jk224jv-wm'))
```

## Usage

It is intended and highly recommened that you use this component with its companion components (dock and window). But, should you wich to use it without those components this is how it could be done:

### Events

The window manager listens for and handles a series of events

* 'minimizeMe': sent by the window component.

The window manager will create an object `{ title: event.target.title {string} dataid: event.target.dataid {number} }` that is pushed into an array of minimized windows. The array is sent to the dock component via the public method `update(minimizedWindows[])`

* 'restoreClicked': sent from the dock component.

, this.#restoreHandler.bind(this))
      this.#surface.addEventListener('closeMe', this.#closeWindow.bind(this))
      window.addEventListener('startNew', (event) => this.#startNewHandler(event))
      this.#surface.addEventListener('clickedIn', this.#focusHandler.bind(this))

## Example

```javascript
// enter code here
```

![Example](./images/example.gif)
