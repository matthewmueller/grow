
# grow

  Grow textareas. Will work with any input, including long lines that don't have spaces.

## Example

```html
<textarea id="content"></textarea>
```

```js
grow(content)
```

## Installation

    $ component install matthewmueller/grow

## Implementation

This technique copies the textarea value to a "shadow" div to compute the proper height then updates the textarea.

Loosely based off of https://github.com/jaz303/jquery-grab-bag/blob/master/javascripts/jquery.autogrow-textarea.js

> Note: Use `component/grow` if you only need your textarea to grow from newlines.

## API

### `grow(el)`

Initializes a growing textarea

## TODO

* remove jquery dependency (needs a component that gets the computed style)

## License

  MIT
