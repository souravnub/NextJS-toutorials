import React, { useRef, useState } from "react";
import CircularLoader from "../loaders/circular loader/CircularLoader";
import styles from "./buttons.module.css";

const PrimaryLoadingButton = ({
    children,
    inlineStyles,
    isLoading,
    onClick,
}) => {
    const btnRef = useRef(null);

    return (
        <>
            <button
                ref={btnRef}
                onClick={onClick}
                className={`${styles.primary_loading_btn} ${
                    isLoading ? styles.loading_state : ""
                }`}
                disabled={isLoading}
                style={inlineStyles}>
                {/* children copy will provide button height and width */}
                <div aria-hidden={true} className={styles.children_copy}>
                    {children}
                </div>

                <div className={styles.children_container}>{children}</div>

                <div className={styles.loader_container}>
                    <CircularLoader
                        thickness="4px"
                        strokeColor="var(--clr-primary-100)"
                    />
                </div>
            </button>
        </>
    );
};

export default PrimaryLoadingButton;
