
// /** @jsxRuntime classic */
// /** @jsx jsx */
// import { jsx } from 'theme-ui';

/* 
上述三行代码处理以下报错
  pragma and pragmaFrag cannot be set when runtime is automatic.
*/

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  }
}

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
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    })
  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

const Didact = {
  createElement,
  render
};

/** @jsx Didact.createElement */

// const element = (
//   <div style="background: yellow">
//     <h1>Hello world</h1>
//     <h2 style="text-align: right">from Didact</h2>
//   </div>
// );

const element = Didact.createElement(
  "div",
  { style: "background: yellow" },
  Didact.createElement("h1", null, "Hello world"),
  Didact.createElement("h2", {style: "text-align: right"}, "from Didact"),
)

console.log(element, 'element');

// const element = Didact.createElement("div", {
//   style: "background: yellow",
// },
//   [
//     { type: "h1", children: "Hello world" },
//     { type: "h2", props: { style: "text-align: right"}, children: "from Didact"}
//   ]
// )

// console.log(element)

const container = document.getElementById("root");
Didact.render(element, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
