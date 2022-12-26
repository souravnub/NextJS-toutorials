import React, { useEffect, useRef } from "react";
import styles from "./bodyOverlay.module.css";

const BodyOverlay = ({ onClick, isShown }) => {
    const bodyOverlayRef = useRef(null);

    useEffect(() => {
        const bodyOverlay = bodyOverlayRef.current;
        const onAnimationEnd = () => {
            bodyOverlay.setAttribute("data-state", "hidden");
        };

        if (!isShown) {
            bodyOverlay.addEventListener("animationend", onAnimationEnd);
        }
        return () =>
            bodyOverlay.removeEventListener("animationend", onAnimationEnd);
    }, [isShown]);

    return (
        <div
            ref={bodyOverlayRef}
            aria-hidden="true"
            onClick={onClick}
            className={styles.bodyOverlay}
            data-state={isShown ? "shown" : "hidding"}>
            <span className="sr-only">overlay</span>
        </div>
    );
};

export default BodyOverlay;
