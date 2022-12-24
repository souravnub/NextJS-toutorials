import React from "react";
// importing css modules into our component
import styles from "./button.module.css";

const Button = ({ children }) => {
    return (
        <>
            <style jsx global>
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
