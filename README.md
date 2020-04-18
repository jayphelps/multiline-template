# multiline-template

Multiline tagged templates using a pipe `|` to signal line start. No more crazy indent hacks.

## Install

```
npm install --save multiline-template
```

## Usage

Using [Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals), you use the **pipe** `|` to signal where you want to line to actually start in the resulting string.

```js
import multiline from 'multiline-template';
// or
const multiline = require('multiline-template');

const msg =  multiline`
  |first
  |second
  |third
  |fourth
`;

console.log(msg);
```

```
first
second
third
fourth
```

It also indents interpolated values to the provided indention level

```js
import multiline from 'multiline-template';

const part =  multiline`
  |second
  |third
`;

const msg =  multiline`
  |first
  |  ${part}
  |fourth
`;

console.log(msg);
```

```
first
  second
  third
fourth
```

The line will always start where you say, no matter how much indention comes before the pipe.

```js
import multiline from 'multiline-template';

(function () {
  (function () {

    // there is actually a lot of excess indention
    // before the pipes, but it is ignored!
    const part =  multiline`
      |second
      |third
    `;

    const msg =  multiline`
      |first
      |  ${part}
      |fourth
    `;

    console.log(msg);

  })();
})();
```

```
first
  second
  third
fourth
```

## Credit
This was heavily inspired by [Scala's multiline string pipe markers](https://docs.scala-lang.org/overviews/scala-book/two-notes-about-strings.html#multiline-strings), though there are some differences e.g. how nesting works.

:shipit:
