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

### `readCssFile`

```ts
import { readCssFile } from "css-reader";

(async () => {
    const cssObject = await readCssFile("styles.css");
    console.log(cssObject);
    /*
    {
      ".button": {
        backgroundColor: "blue",
        color: "white"
      },
      ".container": {
        display: "flex",
        padding: "10px"
      }
    }
    */

    const paddingValue = await readCssFile("styles.css", ".container", "padding");
    console.log(paddingValue); // "10px"
})();
```

### `objectifyCss`

```ts
import { objectifyCss } from "css-reader";

const cssString = `
  .button {
    background-color: blue;
    color: white;
  }
  .container {
    display: flex;
    padding: 10px;
  }
`;

const cssObject = objectifyCss(cssString);
console.log(cssObject);
/*
{
  ".button": {
    backgroundColor: "blue",
    color: "white"
  },
  ".container": {
    display: "flex",
    padding: "10px"
  }
}
*/
```

### `getCssProperty`

**Note:** When retrieving nested CSS properties, use the full selector as written in the original CSS. For example, `getCssProperty(source, "div p")` correctly finds `p` inside `div`, while `getCssProperty(source, "div", "p")` will not work as expected.
```ts
import { getCssProperty } from "css-reader";

const cssObject = {
  ".button": {
    backgroundColor: "blue",
    color: "white"
  },
  ".container": {
    display: "flex",
    padding: "10px"
  }
};

const paddingValue = getCssProperty(cssObject, ".container", "padding");
console.log(paddingValue); // "10px"

const nonExistentValue = getCssProperty(cssObject, ".button", "font-size");
console.log(nonExistentValue); // null
```

## API

### `readCssFile(filePath: string, ...propertyPath: string[]): Promise<TObjectifiedCss | string | null>`

Reads a CSS file and returns either the entire objectified CSS or a specific property if a path is provided.

#### Parameters:
- `filePath: string` - Path to the CSS file.
- `propertyPath: string[]` - Optional property path to retrieve a specific CSS value.

#### Returns:
- `Promise<TObjectifiedCss | string | null>` - The objectified CSS or the value of the specified property, or `null` if an error occurs.

### `objectifyCss(styles: string): TObjectifiedCss | null`

Parses a CSS string into a JavaScript object.

#### Parameters:
- `styles: string` - The CSS string to parse.

#### Returns:
- `TObjectifiedCss | null` - A JavaScript object representation of the CSS or `null` if parsing fails.

### `getCssProperty<TReturnType>(source: TObjectifiedCss | string, ...propertyPath: [string, ...string[]]): TReturnType | null`

Retrieves a specific CSS property value from an objectified CSS structure.

#### Parameters:
- `source: TObjectifiedCss | string` - The CSS object or string to retrieve the property from.
- `propertyPath: [string, ...string[]]` - The property path to retrieve the value.

#### Returns:
- `TReturnType | null` - The value of the specified property or `null` if not found.

It is defined as:

```ts
type TObjectifiedCss = {
    [key: string]: string | TObjectifiedCss | TObjectifiedCss[];
};
```

## License

MIT

