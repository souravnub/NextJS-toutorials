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

        const { success, blogs } = await fetchBlogs({
            type: blogsType,
            following: blogsType === "following" && userData.following,
        });

        setIsLoading(false);

        if (success === true) {
            setIsError(false);
            setBlogs(blogs);
        } else {
            setIsError(true);
            setBlogs(null);
        }
    };

    useEffect(() => {
        if (notInitialRender) getBlogs(type);
    }, dependencyArr);

    return { blogs, isLoading, isError };
}
