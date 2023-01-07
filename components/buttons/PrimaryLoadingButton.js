import React, { useEffect, useRef, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import CircularLoader from "../loaders/circular loader/CircularLoader";
import styles from "./buttons.module.css";
import { AnimatePresence, motion } from "framer-motion";

const svgVariants = {
    start: {
        strokeDashoffset: "48px",
    },
    end: {
        strokeDashoffset: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const successContainerVariants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
    },
};
const errorContainerVariants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
    },
};

const successTextEle = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
    },
};

// for this component to work the success state should be undefined when the request is send to backend, then true or false after loading....therefore it depends a bit on the api
const PrimaryLoadingButton = ({
    children,
    inlineStyles,
    isLoading,
    isSuccess,
    successMsg = "Done",
    errorMsg = "Error",
    errorMsgColor,
    successMsgColor,
    loaderStrokeColor = "var(--clr-primary-100)",
    //in ms
    MsgDuration = 3000,
    onClick,
}) => {
    const btnRef = useRef(null);
    const successMsgRef = useRef(null);
    const errorMsgRef = useRef(null);

    const [currentState, setCurrentState] = useState("normal");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentState === "success" || currentState === "error") {
                setCurrentState("normal");
            }
        }, MsgDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, [isSuccess, currentState]);

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
                ref={btnRef}
                onClick={onClick}
                className={styles.primary_loading_btn}
                disabled={isLoading}
                style={inlineStyles}>
                {/* children copy will provide button height and width */}
                <div aria-hidden={true} className={styles.children_copy}>
                    {children}
                </div>

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
                        <motion.div
                            variants={successContainerVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                            style={{ "--color": successMsgColor }}
                            className={styles.success_msg_container}>
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
                            <div
                                className={styles.success_msg}
                                ref={successMsgRef}>
                                {[...successMsg].map((alp, idx) => {
                                    return (
                                        <motion.span
                                            variants={successTextEle}
                                            key={idx}>
                                            {alp === " " ? <>&nbsp;</> : alp}
                                        </motion.span>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {currentState === "error" && (
                        <motion.div
                            style={{ "--color": errorMsgColor }}
                            variants={errorContainerVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                            className={styles.error_msg_container}>
                            <motion.div
                                className={styles.svg_container}
                                variants={successTextEle}>
                                <BiErrorCircle
                                    size="20px"
                                    style={{ "--color": successMsgColor }}
                                />
                            </motion.div>
                            <div ref={errorMsgRef} className={styles.error_msg}>
                                {[...errorMsg].map((alp, idx) => {
                                    return (
                                        <motion.span
                                            variants={successTextEle}
                                            key={idx}>
                                            {alp === " " ? <>&nbsp;</> : alp}
                                        </motion.span>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </>
    );
};

export default PrimaryLoadingButton;
