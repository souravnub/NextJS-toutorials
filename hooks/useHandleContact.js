import { useState } from "react";

export default function useHandlePostContact() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [isSuccess, setIsSuccess] = useState(undefined);
    const [error, setError] = useState(null);

    const postContactReq = async ({ body }) => {
        setIsLoading(true);
        setIsSuccess(undefined);

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(body),
            });
            const json = await res.json();

            if (json.success === true) {
                setIsSuccess(true);
            } else {
                setIsSuccess(false);
            }

            setData(json);
        } catch (err) {
            setIsSuccess(false);
            // setError(...some_formatted_error)
        }

        setIsLoading(false);
    };

    return { postContactReq, data, isLoading, isSuccess, error };
}
