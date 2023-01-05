import React, { useEffect, useRef } from "react";
import { MdErrorOutline } from "react-icons/md";
import CircularLoader from "../loaders/circular loader/CircularLoader";
import styles from "./buttons.module.css";

const findEleWidth = (ele) => {
    return ele.getBoundingClientRect().width;
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
    MsgDuration = 2000,
    onClick,
}) => {
    const btnRef = useRef(null);
    const successMsgRef = useRef(null);
    const errorMsgRef = useRef(null);

    const childrenContainerRef = useRef(null);
    const successMsgContainerRef = useRef(null);
    const errorMsgContainerRef = useRef(null);

    useEffect(() => {
        //transitioning the success msg alphabets
        const alphabets = Array.from(successMsgRef.current.children);

        alphabets.forEach((alphabet, idx) => {
            alphabet.style.transitionDelay =
                (100 * (idx + 1)) / alphabets.length + "ms";
        });

        // transitioning the error msg alphabets
        const error_alp = Array.from(errorMsgRef.current.children);
        error_alp.forEach((alphabet, idx) => {
            alphabet.style.transitionDelay =
                (100 * (idx + 1)) / error_alp.length + "ms";
        });

        // finding suitable width of the button
        const widthArr = [
            findEleWidth(childrenContainerRef.current),
            findEleWidth(successMsgContainerRef.current),
            findEleWidth(errorMsgContainerRef.current),
        ];

        let largestWidth = widthArr[0];
        widthArr.forEach((width) => {
            if (width > largestWidth) {
                largestWidth = width;
            }
        });

        btnRef.current.style.minWidth = largestWidth + "px";
    }, []);

    useEffect(() => {
        const btn = btnRef.current;

        const timeout = setTimeout(() => {
            if (btn.classList.contains(styles.success_state)) {
                btn.classList.remove(styles.success_state);
            } else if (btn.classList.contains(styles.error_state)) {
                btn.classList.remove(styles.error_state);
            }
        }, MsgDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, [isSuccess]);

    return (
        <>
            <button
                ref={btnRef}
                onClick={onClick}
                className={`${styles.primary_loading_btn} ${
                    isLoading === true ? styles.loading_state : ""
                } ${isSuccess === true ? styles.success_state : ""} ${
                    isSuccess === false ? styles.error_state : ""
                }`}
                disabled={isLoading}
                style={inlineStyles}>
                {/* children copy will provide button height and width */}
                <div aria-hidden={true} className={styles.children_copy}>
                    {children}
                </div>

                <div
                    className={styles.children_container}
                    ref={childrenContainerRef}>
                    {children}
                </div>

                <div className={styles.loader_container}>
                    <CircularLoader
                        thickness="4px"
                        strokeColor={loaderStrokeColor}
                    />
                </div>

                <div
                    style={{ "--color": successMsgColor }}
                    className={styles.success_msg_container}
                    ref={successMsgContainerRef}>
                    <svg
                        className={styles.checkmark}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52">
                        <path
                            className={styles.checkmark_check}
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                    </svg>
                    <div className={styles.success_msg} ref={successMsgRef}>
                        {[...successMsg].map((alp, idx) => {
                            if (alp === " ") {
                                return <span key={idx}>&nbsp;</span>;
                            } else {
                                return <span key={idx}>{alp}</span>;
                            }
                        })}
                    </div>
                </div>

                <div
                    style={{ "--color": errorMsgColor }}
                    className={styles.error_msg_container}
                    ref={errorMsgContainerRef}>
                    <MdErrorOutline />
                    <div ref={errorMsgRef} className={styles.error_msg}>
                        {[...errorMsg].map((alp, idx) => {
                            if (alp === " ") {
                                return <span key={idx}>&nbsp;</span>;
                            } else {
                                return <span key={idx}>{alp}</span>;
                            }
                        })}
                    </div>
                </div>
            </button>
        </>
    );
};

export default PrimaryLoadingButton;
