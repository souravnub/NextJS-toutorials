import { useState } from "react";

export default function useHandlePostContact() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const postContactReq = async ({ body }) => {
        setIsLoading(true);

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

            setData(json);
        } catch (err) {
            setIsError(true);
            // setError(...some_formatted_error)
        }

        setIsLoading(false);
    };

    return { postContactReq, data, isLoading, isError, error };
}
