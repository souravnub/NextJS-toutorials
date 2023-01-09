import React, { useEffect, useRef, useState } from "react";
import CircularLoader from "../loaders/circular loader/CircularLoader";
import styles from "./buttons.module.css";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";

const svgVariants = {
    hidden: {
        strokeDashoffset: "48px",
    },
    shown: {
        strokeDashoffset: 0,
        transition: {
            duration: 0.5,
        },
    },
};
const errorSvgVariants = {
    hidden: {
        width: 0,
    },
    shown: {
        width: 100,
        transition: {
            duration: 0.1,
        },
    },
};
const successContainerVariants = {
    hidden: {
        opacity: 0,
    },
    shown: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
    },
};
const errorContainerVariants = successContainerVariants;

const TextEleVariants = {
    hidden: {
        opacity: 0,
    },
    shown: {
        opacity: 1,
    },
};

function getEleWidth(ele) {
    if (!ele) {
        return 0;
    }
    return ele.getBoundingClientRect().width;
}

function setBtnWidth() {
    const hiddenContainers = Array.from(
        document.getElementsByClassName(styles.container_copy)
    );

    let maxWidthContainer = hiddenContainers[0];

    hiddenContainers.forEach((container) => {
        if (getEleWidth(container) > getEleWidth(maxWidthContainer)) {
            maxWidthContainer = container;
        }
    });

    // all the copy content will be absolutely placed,, but the one that is having the largest width will give button it's width therefore it will be relative.
    maxWidthContainer.style.position = "relative";
}

// for this component to work the success state should be undefined when the request is send to backend, then true or false after loading....therefore it depends a bit on the api
const PrimaryLoadingButton = ({
    children,
    inlineStyles,
    isLoading,
    isSuccess,
    successText = "Done",
    errorText = "Error",
    errorTextColor,
    successTextColor,
    loaderStrokeColor = "var(--clr-primary-100)",
    //in ms - it is the time to wait after completion of text animation
    MsgDuration = 1000,
    onClick,
}) => {
    const [currentState, setCurrentState] = useState("normal");
    const [hadTextAnimationCompleted, setHadTextAnimationCompleted] =
        useState(undefined);

    useEffect(() => {
        setBtnWidth();
    }, []);

    useEffect(() => {
        if (hadTextAnimationCompleted === true) {
            const timeout = setTimeout(() => {
                if (currentState === "success" || currentState === "error") {
                    setCurrentState("normal");
                    setHadTextAnimationCompleted(undefined);
                }
            }, MsgDuration);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isSuccess, currentState, hadTextAnimationCompleted]);

    useEffect(() => {
        if (isLoading) {
            setCurrentState("loading");
        }
        if (isSuccess === true) {
            setCurrentState("success");
        }
        if (isSuccess === false) {
            setCurrentState("error");
        }
        if (!isLoading && isSuccess === undefined) {
            setCurrentState("normal");
        }
    }, [isLoading, isSuccess]);

    return (
        <>
            <button
                onClick={onClick}
                className={styles.primary_loading_btn}
                disabled={isLoading}
                style={inlineStyles}>
                {/* children copy will provide button height and width */}
                <div aria-hidden={true} className={styles.container_copy}>
                    {children}
                </div>
                <SuccessTextContainerCopy text={successText} />
                <ErrorTextContainerCopy text={errorText} />

                <AnimatePresence>
                    {currentState === "normal" && (
                        <motion.div
                            className={styles.children_container}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.5 },
                            }}
                            exit={{ opacity: 0, y: "100%" }}>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {currentState === "loading" && (
                        <motion.div
                            className={styles.loader_container}
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ y: "100%", opacity: 0 }}>
                            <CircularLoader
                                thickness="4px"
                                strokeColor={loaderStrokeColor}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {currentState === "success" && (
                        <SuccessTextContainer
                            setHadTextAnimationCompleted={
                                setHadTextAnimationCompleted
                            }
                            textColor={successTextColor}
                            text={successText}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {currentState === "error" && (
                        <ErrorTextContainer
                            setHadTextAnimationCompleted={
                                setHadTextAnimationCompleted
                            }
                            textColor={errorTextColor}
                            text={errorText}
                        />
                    )}
                </AnimatePresence>
            </button>
        </>
    );
};

function ErrorTextContainerCopy({ text }) {
    return (
        <div
            className={`${styles.error_msg_container} ${styles.container_copy}`}>
            <ErrorSvg />
            <div className={styles.error_msg}>
                {[...text].map((alp, idx) => {
                    return (
                        <span key={idx}>{alp === " " ? <>&nbsp;</> : alp}</span>
                    );
                })}
            </div>
        </div>
    );
}
function SuccessTextContainerCopy({ text }) {
    return (
        <div
            className={`${styles.success_msg_container} ${styles.container_copy}`}
            style={{ position: "relative" }}>
            <SuccessSvg />
            <div className={styles.success_msg}>
                {[...text].map((alp, idx) => {
                    return (
                        <span key={idx}>{alp === " " ? <>&nbsp;</> : alp}</span>
                    );
                })}
            </div>
        </div>
    );
}

function ErrorTextContainer({ setHadTextAnimationCompleted, textColor, text }) {
    return (
        <motion.div
            style={{ "--color": textColor }}
            variants={errorContainerVariants}
            initial="hidden"
            animate="shown"
            exit="exit"
            onAnimationStart={() => {
                setHadTextAnimationCompleted(false);
            }}
            onAnimationComplete={() => {
                setHadTextAnimationCompleted(true);
            }}
            className={styles.error_msg_container}>
            <ErrorSvg />
            <div className={styles.error_msg}>
                {[...text].map((alp, idx) => {
                    return (
                        <motion.span variants={TextEleVariants} key={idx}>
                            {alp === " " ? <>&nbsp;</> : alp}
                        </motion.span>
                    );
                })}
            </div>
        </motion.div>
    );
}

function SuccessTextContainer({
    setHadTextAnimationCompleted,
    textColor,
    text,
}) {
    return (
        <motion.div
            variants={successContainerVariants}
            initial="hidden"
            animate="shown"
            exit="exit"
            onAnimationStart={() => setHadTextAnimationCompleted(false)}
            onAnimationComplete={() => setHadTextAnimationCompleted(true)}
            style={{ "--color": textColor }}
            className={styles.success_msg_container}>
            <SuccessSvg />
            <div className={styles.success_msg}>
                {[...text].map((alp, idx) => {
                    return (
                        <motion.span variants={TextEleVariants} key={idx}>
                            {alp === " " ? <>&nbsp;</> : alp}
                        </motion.span>
                    );
                })}
            </div>
        </motion.div>
    );
}

function SuccessSvg() {
    return (
        <svg
            className={styles.checkmark}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52">
            <motion.path
                variants={svgVariants}
                className={styles.checkmark_check}
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
        </svg>
    );
}

function ErrorSvg() {
    return (
        // gave initial and animate key because want to animate the lines without staggering
        <svg viewBox="0 0 100 100">
            <motion.rect
                variants={errorSvgVariants}
                initial="hidden"
                animate="shown"
                width="100"
                height="6"
                rx="4"
                x="3"
                y="50"
                className={`${styles.error_line_1} ${styles.error_line}`}></motion.rect>
            <motion.rect
                initial="hidden"
                animate="shown"
                variants={errorSvgVariants}
                width="100"
                height="6"
                x="0"
                rx="4"
                y="50"
                className={`${styles.error_line_2} ${styles.error_line}`}></motion.rect>
        </svg>
    );
}

export default PrimaryLoadingButton;
