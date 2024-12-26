# xml2json2xml.js

`xml2json2xml.js` is a JavaScript library for converting between XML and JSON. It can help you easily convert XML data to JSON format and vice versa.

## Features

- Convert XML to JSON
- Convert JSON to XML
- Support for complex nested structures
- Lightweight and efficient

## Installation

You can install `xml2json2xml.js` via npm:

```shell
npm install xml2json2xml.js
```

## Usage

### Converting XML to JSON

```javascript
const { xml2json } = require('xml2json2xml.js');
// import {xml2json} from 'xml2json2xml.js'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book>
    <title lang="en">Harry Potter and the Sorcerer's Stone</title>
    <author>J.K. Rowling</author>
    <year>1997</year>
    <price>29.99</price>
  </book>
  <book>
    <title lang="en">The Hobbit</title>
    <author>J.R.R. Tolkien</author>
    <year>1937</year>
    <price>22.99</price>
  </book>
</bookstore>`;

const json = xml2json(xml);
console.log(json);
```

### Converting JSON to XML

```javascript
const { json2xml } = require('xml2json2xml.js');
// import {json2xml} from 'xml2json2xml.js'

const json = {
  level: 0,
  encoding: 'UTF-8',
  version: '1.0',
  nodes: [
    {
      level: 1,
      name: 'bookstore',
      attrs: {},
      nodes: [
        {
          level: 2,
          name: 'book',
          attrs: {},
          nodes: [
            {
              level: 3,
              name: 'title',
              content: "Harry Potter and the Sorcerer's Stone",
              attrs: {
                lang: 'en',
              },
            },
            { level: 3, name: 'author', content: 'J.K. Rowling', attrs: {} },
            { level: 3, name: 'year', content: '1997', attrs: {} },
            { level: 3, name: 'price', content: '29.99', attrs: {} },
          ],
        },
        {
          level: 2,
          name: 'book',
          attrs: {},
          nodes: [
            {
              level: 3,
              name: 'title',
              content: 'The Hobbit',
              attrs: {
                lang: 'en',
              },
            },
            { level: 3, name: 'author', content: 'J.R.R. Tolkien', attrs: {} },
            { level: 3, name: 'year', content: '1937', attrs: {} },
            { level: 3, name: 'price', content: '22.99', attrs: {} },
          ],
        },
      ],
    },
  ],
};

const xml = json2xml(json);
console.log(xml);
```

## Contributing

We welcome issues and pull requests. If you have any suggestions or have found a bug, please let us know in [GitHub Issues](https://github.com/cosy247/xml2json2xml.js/issues).

## License

This project is released under the MIT license. For more details, please refer to the LICENSE file.
