/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === "object" ? child : createTextElement(child);
      }
      )
    }
  }
}

/* The children array could also contain primitive values like strings or numbers. 
So we’ll wrap everything that isn’t an object inside its own element 
and create a special type for them: TEXT_ELEMENT
*/

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  const isProperty = key => key !== "children";
  // 添加属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    })
  // assign the element props to the node.
  element.props.children.forEach(child => render(child, dom));
  // append the new node to the container
  container.appendChild(dom);
}

const Didact = {
  createElement,
  render
};

/*
用 @jsx Didact.createElement 的返回值就类似于下面调用函数的返回值

const element = Didact.createElement(
  "div",
  { style: "background: yellow" },
  Didact.createElement("h1", null, "Hello world"),
  // 返回值为 {type: "h1", props: { children: [{type: "TEXT_ELEMENT", props: { nodeValue: "hello world", children: [] }}]}},
  Didact.createElement("h2", {style: "text-align: right"}, "from Didact"),
)
*/

// console.log(Didact.createElement("h1", null, "Hello world"));

/** @jsx Didact.createElement */

const element = (
  <div style="background: yellow">
    <h1>Hello world</h1>
    <h2 style="text-align: right">from Didact</h2>
  </div>
);

console.log(element, 'element');

const container = document.getElementById("root");
Didact.render(element, container);
