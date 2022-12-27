import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleBlog = () => {
    // will have only <>loading...</> in its page source as it was by default rendered by nextjs with SSG ... but the content that is hydrated afterwards with client-side-javascript will not be shown in the page source ... as nextjs was not knowing that the page will be having it's content hydrated with client-side-js ... using a pre-rendering method for fetching data and hydration can resolve the issue
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
