# &lt;jk224jv-dock&gt;

The jk224jv-dock component creates a taskbar with buttons to start new applications and buttons for each minimized application.

It includes listeners for the startNew and restoreClicked events, and a update method to refresh the taskbar with new minimized windows information.

## Events

`startNew`: Dispatched when the user clicks the button to start a new application. The event includes the dataid of the clicked button in its detail.

`restoreClicked`: Dispatched when the user clicks a minimized application button in the taskbar. The event includes the dataid of the clicked button in its detail.

## Public methods

`update(mWins: object[])`: Updates the taskbar with the given minimized windows information.

## Example

```HTML
// in head:
<script type="module" src="./~filepath/jk224jv-dock/index.js"></script>

// in body:
<jk224jv-dock id="dock"></jk224jv-dock>
```

```javascript
import './jk224jv-dock.js'
const dock = document.createElement('jk224jv-dock')
document.querySelector('body').appendChild(dock)
const placedDock = document.querySelector('jk224jv-dock')

const minimizedWindows = []
const minimizedWindowData = {
  title: myVar.title,
  dataid: myVar.dataid
}
minimizedWindows.push(minimizedWindowData)

placedDock.update(minimizedWindows)
```
