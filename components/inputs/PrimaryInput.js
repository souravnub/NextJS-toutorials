import React from "react";
import styles from "./inputs.module.css";

const PrimaryInput = ({ inputRef, id, required, label, type, placeHolder }) => {
    return (
        <div className={styles.primary_input}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                ref={inputRef}
                type={type}
                placeholder={placeHolder}
                required={required}
            />
        </div>
    );
};

export default PrimaryInput;
