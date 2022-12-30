import { useEffect, useRef, useState } from "react";
import { userData } from "../Data/user";
import fetchBlogs from "../utils/fetchBlogs";
import useNotInitialRender from "./useNotInitialRender";

export default function useGetBlogs({ type, initialBlogs }, dependencyArr) {
    const notInitialRender = useNotInitialRender();

    const [blogs, setBlogs] = useState(initialBlogs);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getBlogs = async (blogsType) => {
        setIsLoading(true);

        try {
            const { success, blogs } = await fetchBlogs({
                type: blogsType,
                following: blogsType === "following" && userData.following,
            });

            if (success === true) {
                setIsError(false);
                setBlogs(blogs);
            } else {
                setIsError(true);
                setBlogs(null);
            }
        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        // each and every useeffect fires on initial render (page reloads)
        if (notInitialRender) getBlogs(type);
    }, dependencyArr);

    return { blogs, isLoading, isError };
}
