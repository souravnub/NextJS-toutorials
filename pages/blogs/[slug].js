import React from "react";

const SingleBlog = ({ blog }) => {
    return <div>{JSON.stringify(blog)}</div>;
};

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `http://192.168.100.248:3000/api/blogs/${params.slug}`
    );
    const { blog } = await res.json();
    return {
        props: { blog },
    };
    return {
        props: {},
    };
}

export default SingleBlog;
