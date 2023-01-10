# &lt;jk224jv-header&gt;

A windows-like application header / infobar component that displays the current time, elapsed session time, and connection status.

## Attributes

**`data-offline`**

This attribute should contain 'true' or 'false'. It is used to display the connection status.

***Note: keep in mind the logic is looking for it you are `offline` or not.***

## Installation

Import the header component.

In HTML

``` HTML
<script type="module" src="./path/to/jk224jv-header.js"></script>
<jk224jv-header data-offline='false'></jk224jv-header>
```

or javascript

``` javascript
import './path/to/jk224jv-header/'
document.querySelector('body').appendChild(document.createElement('jk224jv-header'))
```
