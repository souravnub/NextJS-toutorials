import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

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

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
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

export default BlogsPage;
