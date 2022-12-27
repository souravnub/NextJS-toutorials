import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleBlog = () => {
    const [blog, setBlog] = useState(null);
    const router = useRouter();

    const getBlogs = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${router.query.slug}`
        );
        const jsonres = await res.json();
        if (jsonres.success) {
            setBlog(jsonres.blog);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    if (!blog) {
        return <>loading...</>;
    }

    return <div>{JSON.stringify(blog)}</div>;
};

export default SingleBlog;
