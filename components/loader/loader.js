import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./loader.module.css";

const Loader = ({ text, transitionDuration = 300, dotCount = 3 }) => {
    const loaderDotsContainerRef = useRef(null);
    const [shownDotsCount, setShownDotsCount] = useState(0);

    useEffect(() => {
        const handleDotsAnimation = () => {
            setShownDotsCount((prev) => prev + 1);
        };

        const interval = setInterval(handleDotsAnimation, transitionDuration);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (shownDotsCount > dotCount) {
            setShownDotsCount(0);
        }

        const dots = Array.from(
            loaderDotsContainerRef.current.querySelectorAll("span")
        );

        if (shownDotsCount === 0) {
            dots.forEach((dot) => {
                dot.style.opacity = 0;
            });
        } else {
            // if (shownDotsCount === 1) {
            //     dots[0].style.opacity = 1;
            // } else if (shownDotsCount === 2) {
            //     dots[1].style.opacity = 1;
            // } else if (shownDotsCount === 3) {
            //     dots[2].style.opacity = 1;
            // }

            dots.forEach((dot, idx) => {
                if (shownDotsCount === idx + 1) {
                    dot.style.opacity = 1;
                }
            });
        }
    }, [shownDotsCount]);

    return (
        <div className={styles.loader_container} aria-hidden="true">
            <Image src="/planet.png" width={35} height={35} alt="" />

            <div className={styles.loader_text_container}>
                <span>{text}</span>
                <div
                    className={styles.loader_dots_container}
                    ref={loaderDotsContainerRef}>
                    {Array(dotCount)
                        .fill(null)
                        .map((_, idx) => {
                            return <span key={idx}>.</span>;
                        })}
                </div>
            </div>
        </div>
    );
};

export default Loader;
