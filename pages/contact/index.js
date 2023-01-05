import Image from "next/image";
import React, { useRef } from "react";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import TextArea from "../../components/inputs/TextArea";
import useHandlePostContact from "../../hooks/useHandleContact";
import handShakeSVG from "../../public/waving-hand-sign.svg";
import { RxArrowTopRight } from "react-icons/rx";
import styles from "./contactPage.module.css";
import PrimaryLoadingButton from "../../components/buttons/PrimaryLoadingButton";

const contactPage = () => {
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const messageInputRef = useRef(null);

    const { postContactReq, data, isLoading, isSuccess, error } =
        useHandlePostContact();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const reqBody = {
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            message: messageInputRef.current.value,
        };
        postContactReq({ body: reqBody });
    };

    return (
        <section className={styles.main_contact_page_container}>
            <h1>
                <span>Love to hear from you,</span>
                <span>
                    Get in touch
                    <Image src={handShakeSVG} width={50} height={50} alt="" />
                </span>
            </h1>
            <form onSubmit={handleFormSubmit}>
                <PrimaryInput
                    inputRef={nameInputRef}
                    label="Your name"
                    id="name"
                    type="text"
                    required={true}
                    placeHolder="John Doe"
                />
                <PrimaryInput
                    inputRef={emailInputRef}
                    label="Your email"
                    id="email"
                    type="email"
                    required={true}
                    placeHolder="example@mail.com"
                />
                <TextArea
                    inputRef={messageInputRef}
                    label="Message"
                    id="message"
                    resizable={true}
                    required={true}
                    placeHolder="Woha! Just want to say something."
                />
                <PrimaryLoadingButton
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    successMsg="Your message was received!">
                    Just Send <RxArrowTopRight />
                </PrimaryLoadingButton>
            </form>
        </section>
    );
};

export default contactPage;
