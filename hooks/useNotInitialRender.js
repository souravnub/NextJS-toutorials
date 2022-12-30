import { useEffect, useRef } from "react";

export default function useNotInitialRender() {
    const notInitialRender = useRef();
    useEffect(() => {
        notInitialRender.current = true;
    }, []);
    return notInitialRender.current;
}
