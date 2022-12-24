## NextJs Features

1. **CSS Modules :** nextJS already comes in with built-in css modules. These modules helps us to keep our css scoped to each and individual component only.
   In a plain react app, what happens is : that while compiling all the css files are made into a single css file which is minified. This may cause some of the classes to overlap/collide due to which we might get bugs in our css.
   When we use css modules and define a filename such that: <filename>.module.css then when compiling a single file is not generated while many minified css files are generated and these files are individually imported into their respective components, which prevent the issue of css overlapping/collision. Hence, we get a bug free css after compilation and minification.

_component.js_

```js
// importing css modules into our component
import styles from "../styles/App.module.css";

// using css modules' classes in our jsx
<button className={styles.createBlogButton}>write</button>;
```

_App.module.css_

```css
.createBlogButton {
    background: red;
}
```

By default we cannot import a css file into any other component except \_app.js. NextJs throws an error when we try to do so. Hence, nextJs would allow global styles to be imported into \_app.js only OR we have to use modular level css (css modules : filename.module.css) in any other component.

Similarly, styleSheets like Bootstrap can only be imported in \_app.js, to use third-party styles in a single component : [using styles from third party source in single component](https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules)

2.**STYLED JSX :** we can use styled jsx in our components for modular scope of css. **_remember: we cannot use child class selectors in styledJSX_**, for extra info : [blog in styledJSX by nextjs](https://nextjs.org/blog/styling-next-with-styled-jsx). Using styled jsx, the styles would not collide if the styled jsx is not made global.
Styled JSX is also in two formats :

-   component scopped
-   global scopped

    1. **component scopped :** such jsx is valid till component level only. The component when imported into another component containing same css classes, the styles will not be shared over the component in which it is imported.

    _Button.js_

    ```js
    // styled jsx is not global here

    const Button = ({ children }) => {
        return (
            <>
                <style jsx>
                    {`
                        .button {
                            background: green;
                            color: black;
                            border: none;
                            padding: 1.4rem;
                        }
                    `}
                </style>

                <button className="button">{children}</button>
            </>
        );
    };

    export default Button;
    ```

    _about.js_

    ```js
    import React from "react";
    import Button from "../components/button/Button";
    const about = () => {
        return (
            <div>
                <span>hello this is about page</span>
                // the button below will have styles from styledJSX of Button.js
                <Button>hello world</Button>
                // the button below will not have the styles from Button.js styledJSX,
                because styledJSX in Button.js was not global
                <button className="button">wow world</button>
            </div>
        );
    };

    export default about;
    ```

    2.**global styledJSX :** a component that has styledJSX that is scopped globally will be able to share the styles with the component that it is imported into (provided that the component that is importing it has similar css classes as in global styledJSX of the imported component). **If we want to use global styledJSX in another component then we also need to use the component that contain global styledJSX in that component.**

    _Button.js_

    ```js
    const Button = ({ children }) => {
        return (
            <>
                <style jsx global>
                    {" "}
                    // here's the change
                    {`
                        .button {
                            background: green;
                            color: black;
                            border: none;
                            padding: 1.4rem;
                        }
                    `}
                </style>

                <button className="button">{children}</button>
            </>
        );
    };

    export default Button;
    ```

    _about .js_

    ```js
    import React from "react";
    import Button from "../components/button/Button";
    const about = () => {
        return (
            <div className="main-div">
                <style jsx>
                    {`
                        .main-div {
                            background-color: white;
                            min-height: 100vh;
                        }
                        .text {
                            font-size: 1.3rem;
                            background-color: black;
                            color: white;
                            padding: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    `}
                </style>
                <span className="text">hello this is about page</span>
                //the button below will get the styles from styledJSX
                <Button>hello world</Button>
                // the button has class .button and the globally scopped
                styledJSX in Button.js also have class .button in it ...
                therefore below button will get styles of that class
                <button className="button">wow world</button>
            </div>
        );
    };

    export default about;
    ```
