# &lt;jk224jv-wm&gt;

A window manager (wm) that can open, close, minimize and restore windows. The window manager also has a dock that displays minimized windows. The window manager supports storing data in the form of cookies and localstorage to improve user experience.

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

    The wm will create an object `{ title: event.target.title {string} dataid: event.target.dataid {number} }` that is pushed into an array of minimized windows. The array is sent to the dock component via the public method `update(minimizedWindows[])`. The wm will also set the attribute `minimized` on the event.target

* 'restoreClicked': sent from the dock component.

    The wm will remove the object with dataid matching the event.detail from the minimizedWindows[] array. It will also remove the `minimized` attribute from the related component.

    ** Note: the window component should look for the minimized attribute and hide if set.

* 'closeMe': sent by the window component.

    The wm will look for remove the corresponging element from the DOM and also remove it from its array of openWindows.

* 'startNew': sent by the dock component.

    The wm will create a new window element and append as a child to that element whatever element is listed in the 'startNew'event.detail. The child will be put in the slot named `window-content`

    The window element will then be appended to the desktop `#surface`.

* 'clickedIn': sent by window component.

    The wm will reset all window elements to their default z-index, stored in the attrivute `datazdefault`.

    The wm will then set the attribute zindex and the style.zIndex of the event.target to 999. Making it be "focused" and allow the window to pass the new index to child.
