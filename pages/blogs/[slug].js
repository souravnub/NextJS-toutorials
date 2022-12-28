import React, { useState } from "react";
import Link from "next/link";
import loadJsonFile from "../../utils/loadJsonFile";

const SingleBlog = ({ blog: fetchedBlog }) => {
    const [blog, setBlog] = useState(fetchedBlog);
    return (
        <div>
            {JSON.stringify(blog)}
            <h1>
                <Link href="/">Home</Link>
            </h1>
        </div>
    );
};

export async function getStaticPaths(context) {
    const blogs = await loadJsonFile("/data/blogs.json");

    // passing the paths dynamically ... now [slug.js] was a dynamic component therefore nextjs don't know that which blogs/:slug page to pre-render therefore we have to use getStaticPaths to tell nextjs about the pages that we want to pre-render using SSG ...
    const paths = blogs.map((blog) => {
        return { params: { slug: blog.slug } };
    });

    return {
        // here, paths that have params containing slug = 'something' will be pre-rendered without data using SSG
        paths,
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const blogs = await loadJsonFile("/data/blogs.json");

    const blog = blogs.find((blog) => blog.slug === slug);

    return {
        props: { blog },
    };
}

export default SingleBlog;
