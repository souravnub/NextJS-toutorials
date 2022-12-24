import React from "react";
// importing css modules into our component
import styles from "./button.module.css";

const Button = ({ children }) => {
    return (
        // using css modules' classes in our jsx
        <button className={styles.createBlogButton}>{children}</button>
    );
};

export default Button;
