import { json2xml, xml2json } from '../dist/index.mjs';

// xml2json();
// json2xml();

const xmlJson = xml2json(`
<?xml version="1.0" encoding="UTF-8"?>
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
</bookstore>
`);

console.log(xmlJson);
console.log(json2xml(xmlJson));
