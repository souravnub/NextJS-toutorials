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
