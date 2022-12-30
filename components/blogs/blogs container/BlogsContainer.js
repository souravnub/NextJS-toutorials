import React from "react";
import Loader from "../../loader/loader";
import Blog from "../blog/Blog";
import styles from "./blogsContainer.module.css";

const BlogsContainer = ({ blogs, isLoading, isError, fullDiscription }) => {
    if (isLoading) {
        return (
            <div className={styles.blog_loader}>
                <Loader text="Loading blogs" />
            </div>
        );
    }

    if (isError) {
        return (
            <h2 className={styles.error_text}>
                Something went wrong while fetching blogs!
            </h2>
        );
    }

    return (
        <div className={styles.main_blogs_container}>
            {blogs.map((blog) => {
                return (
                    <Blog data={{ ...blog, fullDiscription }} key={blog.slug} />
                );
            })}
        </div>
    );
};

export default BlogsContainer;
