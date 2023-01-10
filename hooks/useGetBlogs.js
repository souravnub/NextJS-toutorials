import { useEffect, useState } from "react";
import { userData } from "../Data/user";
import fetchBlogs from "../utils/fetchBlogs";
import useNotInitialRender from "./useNotInitialRender";

export default function useGetBlogs(
    { type, initialBlogs, params, callback },
    dependencyArr
) {
    const notInitialRender = useNotInitialRender();

    const [blogs, setBlogs] = useState(initialBlogs);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [totalBlogsInDB, setTotalBlogsInDB] = useState(0);

    const getBlogs = async (blogsType) => {
        setIsLoading(true);

        try {
            const { success, blogs, db_count } = await fetchBlogs({
                type: blogsType,
                following: blogsType === "following" && userData.following,
                params,
            });

            if (success === true) {
                setIsError(false);
                setBlogs(blogs);
                setTotalBlogsInDB(db_count);

                callback({ blogs, totalBlogsInDB: db_count });
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
        totalBlogsInDB,
    };
}
