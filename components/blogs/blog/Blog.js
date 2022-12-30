import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./blog.module.css";

const Blog = ({
    data: {
        author,
        slug,
        img,
        title,
        desc,
        read_time,
        topics,
        createdAt,
        fullDiscription,
    },
}) => {
    return (
        <>
            <article className={styles.blog} key={slug}>
                <div className={styles.author_section_container}>
                    <Image
                        src={author.profile_img}
                        width={50}
                        height={50}
                        alt="Blog author"
                    />

                    <div className={styles.author_info_container}>
                        <div className={styles.author_info_top_container}>
                            <span className={styles.author_name}>
                                {author.name}
                            </span>
                            <span className={styles.blog_creation_date}>
                                {createdAt}
                            </span>
                        </div>
                        <span>{author.role}</span>
                    </div>
                </div>

                <div className={styles.blog_content_container}>
                    <div className={styles.blog_info_container}>
                        <h2>{title}</h2>
                        <p>
                            {fullDiscription
                                ? desc
                                : `${desc.substring(0, 100)}...`}
                        </p>

                        <div className={styles.blog_topics_container}>
                            {topics.map((topic) => {
                                return (
                                    <div
                                        className="button_primary_pill"
                                        key={topic}>
                                        {topic}
                                    </div>
                                );
                            })}
                            <div className="button_primary_pill">
                                {read_time} read
                            </div>

                            <Link
                                href={`/blogposts/${slug}`}
                                className="button_border_pill">
                                Read More
                            </Link>
                        </div>
                    </div>

                    <Image
                        className={styles.blog_img}
                        src={img}
                        width={250}
                        height={170}
                        alt="blog banner"
                    />
                </div>
            </article>
        </>
    );
};

export default Blog;
