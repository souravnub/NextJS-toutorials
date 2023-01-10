import React from "react";
import styles from "./circularLoader.module.css";

const CircularLoader = ({ thickness, strokeColor, size }) => {
    return (
        <div className={styles.loader} style={{ "--width": size }}>
            <svg className={styles.circular} viewBox="25 25 50 50">
                <circle
                    className={styles.path}
                    style={{
                        "--thickness": thickness,
                        "--stroke-color": strokeColor,
                    }}
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                />
            </svg>
        </div>
    );
};

export default CircularLoader;
