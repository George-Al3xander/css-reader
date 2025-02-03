# [css-reader](https://www.npmjs.com/package/css-reader)

Reads and parses CSS files into JavaScript objects.

## Installation

```sh
pnpm add css-reader
```

or with npm:

```sh
npm install css-reader
```
or with yarn:

```sh
yarn add css-reader
```


## Usage

```ts
import { objectifyCss } from "css-reader";

const cssString = `
  .button {
    background-color: blue;
    color: white;
  }
`;

const cssObject = objectifyCss(cssString);

console.log(cssObject);
/*
{
  ".button": {
    backgroundColor: "blue",
    color: "white"
  }
}
*/
```

## API

### `objectifyCss(styles: string): TObjectifiedCss | null`

Parses a CSS string into a JavaScript object.

#### Parameters:
- `styles: string` - The CSS string to parse.

#### Returns:
- `TObjectifiedCss | null` - A JavaScript object representation of the CSS or `null` if parsing fails.

### `TObjectifiedCss`

`TObjectifiedCss` is equivalent to [`postcss-js`'s `CssInJs` object](https://github.com/postcss/postcss-js#cssinjs-object).

## Dependencies
- [`postcss`](https://www.npmjs.com/package/postcss)
- [`postcss-js`](https://www.npmjs.com/package/postcss-js)

## License

MIT

