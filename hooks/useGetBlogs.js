import { useEffect, useState } from "react";
import { userData } from "../Data/user";
import fetchBlogs from "../utils/fetchBlogs";
import useNotInitialRender from "./useNotInitialRender";

// todo : what if there is no dependency arr ????/
export default function useGetBlogs({ type, initialBlogs }, dependencyArr) {
    const notInitialRender = useNotInitialRender();

    const [blogs, setBlogs] = useState(initialBlogs);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getBlogs = async (blogsType) => {
        console.log("requesting");
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
        // [] === [] : false...therefore previous approach was wrong
        if (Array.isArray(dependencyArr) && dependencyArr.length === 0) {
            getBlogs(type);
        }

        // each and every useeffect fires on initial render (page reloads),, therefore if we want that if dependency is provided then run fetch blogs only then
        if (notInitialRender) {
            getBlogs(type);
        }
    }, dependencyArr);

    return {
        blogs,
        isLoading,
        isError,
    };
}
