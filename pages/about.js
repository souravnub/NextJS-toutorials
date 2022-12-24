import React from "react";
import Button from "../components/button/Button";
const about = () => {
    return (
        <div className="main-div">
            <style jsx>
                {`
                    .main-div {
                        background-color: white;
                        min-height: 100vh;
                    }
                    .text {
                        font-size: 1.3rem;
                        background-color: black;
                        color: white;
                        padding: 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
            <span className="text">hello this is about page</span>
            <Button>hello world</Button>
            <button className="button">wow world</button>
        </div>
    );
};

export default about;
