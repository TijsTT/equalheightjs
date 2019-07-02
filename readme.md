# Equalize height

Equalize the height of elements on the same row, based on their offsetTop value. Most importantly, this also works for responsive layouts.

## Installing

Using npm:

```bash
$ npm install equalizeheight
```

## How to use

First, import the package into your project:

```js
import 'equalizeheight';
```

To equalize the height of elements on the same row, you simply add a data-equal-height attribute to those elements with a dedicated group name:

```html
<div>
    <span data-equal-height="group-name">Hello world!</span>
    <span data-equal-height="group-name">Hello world!</span>
    <span data-equal-height="group-name">Hello world!</span>
</div>
```

Just like that, all items on the same row with the same group name will be set to the same height. DONE!


