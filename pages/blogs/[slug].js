import React, { useState } from "react";

const SingleBlog = ({ blog: fetchedBlog }) => {
    const [blog, setBlog] = useState(fetchedBlog);
    return <div>{JSON.stringify(blog)}</div>;
};

export async function getServerSideProps(context) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${context.query.slug}`
    );
    try {
        const data = await res.json();

        return {
            props: data, // will be passed to the page component as props
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default SingleBlog;
