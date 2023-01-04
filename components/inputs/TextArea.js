import React from "react";
import styles from "./inputs.module.css";

const TextArea = ({
    inputRef,
    id,
    required,
    label,
    type,
    placeHolder,
    resizable,
}) => {
    return (
        <div className={styles.primary_input}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                id={id}
                ref={inputRef}
                type={type}
                placeholder={placeHolder}
                required={required}
                style={{ resize: !resizable ? "none" : "vertical" }}
            />
        </div>
    );
};

export default TextArea;
