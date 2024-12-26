/**
 * DOMParser实例，用于将XML或HTML源代码从字符串解析为DOM文档。
 * @type {DOMParser}
 */
const domparser = new DOMParser();

/**
 * 递归地将XML节点转换为JSON表示。
 *
 * @param {NodeList} nodes - 要转换的XML节点列表。
 * @param {number} [level=1] - 当前递归的层级，用于跟踪节点的深度。
 * @returns {Array|String} - 返回表示XML节点的JSON对象数组，如果发生解析错误则返回字符串。
 */
function getXmlNodeJson(nodes, level = 1) {
  const jsons = [];
  for (const node of nodes) {
    if (node.nodeName === '#text' && node.nodeValue.trim() === '') continue;
    if (node.nodeName === '#comment') continue;
    if (node.nodeName === 'parsererror') return node.textContent;
    if (node.nodeName === '#text') {
      jsons.push({
        level,
        name: node.nodeName,
        content: node.nodeValue,
      });
    } else {
      const attrs = [...node.attributes].reduce((attr, { name, value }) => {
        attr[name] = value;
        return attr;
      }, {});
      if (node.textContent === node.innerHTML) {
        jsons.push({
          level,
          name: node.nodeName,
          content: node.textContent,
          attrs,
        });
      } else {
        jsons.push({
          level,
          name: node.nodeName,
          attrs,
          nodes: getXmlNodeJson(node.childNodes, level + 1),
        });
      }
    }
  }
  return jsons;
}

/**
 * 将XML字符串转换为JSON对象。
 *
 * @param {string} xml - 要转换的XML字符串。
 * @returns {Object|undefined} XML的JSON表示，如果发生错误则返回undefined。
 */
export function xml2json(xml) {
  if (Object.prototype.toString.call(xml) !== '[object String]')
    return console.error('xml2json: Parameter should be a String.');
  const xmlRoot = domparser.parseFromString(xml.trim(), 'application/xml');
  const nodes = getXmlNodeJson(xmlRoot.childNodes);
  if (!Array.isArray(nodes)) return console.error(`xml2json:\n\n${nodes}\n${xml}`);
  return {
    level: 0,
    encoding: xmlRoot.xmlEncoding,
    version: xmlRoot.xmlVersion,
    nodes,
  };
}

/**
 * 将XML节点数组转换为字符串表示。
 *
 * @param {Array} nodes - 要转换的XML节点数组。每个节点应该是一个具有以下属性的对象：
 * @param {string} [nodes[].name] - XML节点的名称。如果未提供，则默认为'none'。
 * @param {Object} [nodes[].attrs] - 表示XML节点属性的对象。如果未提供，则默认为空对象。
 * @param {Array} [nodes[].nodes] - 子XML节点的数组。如果未提供，则默认为空数组。
 * @returns {string} XML节点的字符串表示。
 */
function getXmlNodeString(nodes) {
  return nodes
    .map((node) => {
      const name = node.name || 'none';
      const attrs = Object.entries(node.attrs || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      const innerXml = Array.isArray(node.nodes) ? getXmlNodeString(node.nodes) : node.content;
      return innerXml ? `<${name} ${attrs}>${innerXml}</${name}>` : `<${name} ${attrs}/>`;
    })
    .join('');
}

/**
 * 将JSON对象转换为XML字符串。
 *
 * @param {Object} json - 要转换的JSON对象。
 * @param {string} [json.version='1.0'] - XML版本。
 * @param {string} [json.encoding='utf-8'] - XML编码。
 * @param {Array} [json.nodes] - 要包含在XML中的节点数组。
 * @returns {string} 生成的XML字符串。
 */
export function json2xml(json) {
  if (Object.prototype.toString.call(json) !== '[object Object]')
    return console.error('json2xml: Parameter should be a Object.');
  const xmlString = `<?xml version="${json.version || '1.0'}" encoding="${json.encoding || 'utf-8'}"?>`;
  if (Array.isArray(json.nodes)) return xmlString + getXmlNodeString(json.nodes);
  return xmlString;
}
