import React, { useRef } from "react";
import useHandlePostContact from "../../hooks/useHandleContact";

const contactPage = () => {
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const messageInputRef = useRef(null);

    const { postContactReq, data, isLoading, isError, error } =
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
        <form onSubmit={handleFormSubmit}>
            <label for="name">name</label>
            <input
                ref={nameInputRef}
                type="text"
                required
                placeholder="name"
                id="name"
            />
            <label for="email">email</label>
            <input
                ref={emailInputRef}
                type="email"
                id="email"
                placeholder="email"
            />
            <label for="message">message</label>
            <textarea
                ref={messageInputRef}
                placeholder="message"
                id="message"
                cols="30"
                rows="10"></textarea>
            <button className="button_primary_box" disabled={isLoading}>
                Submit
            </button>
        </form>
    );
};

export default contactPage;
