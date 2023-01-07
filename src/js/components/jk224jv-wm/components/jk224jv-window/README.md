# &lt;jk224jv-window&gt;

jk224jv-window is a custom HTML element that creates a windows-like box (div) with the following capabilities:

* Movable
* Closable
* Minimizable
* Maximizable

## Slots

Note that the jk224jv-window component uses the slot element to define the content that goes inside the window. Any content you want to go inside the window should be placed inside the slot element.

1. name = 'window-content', content that should fill the window.

## Attributes

The jk224jv-window component has several attributes that you can use to customize its appearance and behavior:

* `width` : sets the width of the window (in pixels).
* `height` : sets the height of the window (in pixels).
* `zindex` : sets the z-index of the window (used to control which window appears on top when multiple windows overlap).
* `xpos` : sets the initial x-position of the window (in pixels).
* `ypos` : sets the initial y-position of the window (in pixels).
* `minimized` : makes the window invissible.

## Events

* `clickedIn` : fires when user click inside the element. (usefull to listen for in a window-manager style app)
* `closeMe` : fires when user click the close button.
* `minimizeMe` : fires when user click the minimize button. (this also hides the window)

## Example

```HTML
<jk224jv-window width="400px" height="300px" title="My Window" zindex="1" xpos="10" ypos="10">
  <!-- Any content you want to go inside the window can be placed here -->
  <p slot='window-content'>Hello, this is the content of my window!</p>
</jk224jv-window>
```
