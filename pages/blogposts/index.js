import React from "react";
import blogs from "../../Data/blogs";
const BlogsPage = ({ blogs }) => {
    return <div>blogsPage</div>;
};

export async function getServerSideProps(context) {
    return {
        props: { blogs },
    };
}

export default BlogsPage;
