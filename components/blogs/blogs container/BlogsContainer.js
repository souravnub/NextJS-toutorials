import React from "react";
import Loader from "../../loader/loader";
import Blog from "../blog/Blog";
import styles from "./blogsContainer.module.css";

const BlogsContainer = ({ blogs, isLoading, fullDiscription }) => {
    if (isLoading) {
        return (
            <div className={styles.blog_loader}>
                <Loader text="Loading blogs" />
            </div>
        );
    }

    return (
        <div className={styles.main_blogs_container}>
            {blogs.map((blog) => {
                return <Blog data={{ ...blog, fullDiscription }} />;
            })}
        </div>
    );
};

export default BlogsContainer;
