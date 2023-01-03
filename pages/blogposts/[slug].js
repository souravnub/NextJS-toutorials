import Image from "next/image";
import { BsDot } from "react-icons/bs";
import React from "react";
import blogs from "../../Data/blogs";
import styles from "./singleBlogPage.module.css";

const SingleBlogPost = ({
    blog: { author, img, title_desc, title, desc, topics, createdAt },
}) => {
    return (
        <article className={styles.main_blog_container}>
            <span className={styles.blog_creation_date}>
                Published on {createdAt}
            </span>
            <h1>{title}</h1>
            <div className={styles.author_info_container}>
                By {author.name} <BsDot /> {author.role}
            </div>

            <div className={styles.topics_container}>
                {topics.map((topic) => {
                    return (
                        <div className="button_primary_box" key={topic}>
                            {topic}
                        </div>
                    );
                })}
            </div>

            <Image
                height={400}
                width={600}
                src={img}
                alt="blog image"
                priority
            />

            {title_desc && <h4>{title_desc}</h4>}
            <p>{desc}</p>
        </article>
    );
};

export async function getServerSideProps({ params }) {
    const { slug } = params;

    const blog = blogs.find((blog) => blog.slug === slug);

    return {
        props: {
            blog,
        },
    };
}

export default SingleBlogPost;
