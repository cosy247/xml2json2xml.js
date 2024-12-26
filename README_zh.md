# xml2json2xml.js

`xml2json2xml.js` 是一个用于在 XML 和 JSON 之间转换的 JavaScript 库。它可以帮助您轻松地将 XML 数据转换为 JSON 格式，反之亦然。

## 特性

- 将 XML 转换为 JSON
- 将 JSON 转换为 XML
- 支持复杂的嵌套结构
- 轻量且高效

## 安装

您可以通过 npm 安装 `xml2json2xml.js`：

```shell
npm install xml2json2xml.js
```

## 使用方法

### 将 XML 转换为 JSON

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

### 将 JSON 转换为 XML

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

## 贡献

我们欢迎问题和拉取请求。如果您有任何建议或发现了一个错误，请在 [GitHub Issues](https://github.com/cosy247/xml2json2xml.js/issues) 告诉我们。

## 许可证

这个项目是在 MIT 许可证下发布的。更多细节，请参考 LICENSE 文件。
