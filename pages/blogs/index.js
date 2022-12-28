import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { readFile } from "fs/promises";
import path from "path";

const BlogsPage = ({ blogs }) => {
    return (
        <div>
            <h1>blogs page</h1>
            {blogs.map(
                ({ author, title, img, desc, read_time, topics, slug }) => {
                    return (
                        <div className={styles.blog} key={title}>
                            <Image width={200} height={150} src={img} />
                            <h1>{title}</h1>
                            <p>{desc}</p>
                            <span>{read_time}</span>

                            {topics.map((topic) => {
                                return topic;
                            })}

                            <Image
                                src={author.profile_img}
                                width={50}
                                height={50}
                            />

                            <Link
                                href={{
                                    pathname: "/blogs/" + slug,
                                }}>
                                read more...
                            </Link>
                        </div>
                    );
                }
            )}
        </div>
    );
};

export async function getStaticProps(context) {
    // have to replace the api call with login because api will not be ready at build time

    const blogs = await readFile(
        path.join(process.cwd(), "data", "blogs.json"),
        "utf-8"
    );
    const blogJson = JSON.parse(blogs);

    return {
        props: { success: true, blogs: blogJson }, // will be passed to the page component as props
    };
}

export default BlogsPage;
