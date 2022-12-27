import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
    // the page source would have all the blogs ... as the page is pre-rendered using server-side-rendering therefore no issue with SEO ... (but using SSG in this case would have been more good [came to know it afterwards])
    return (
        <>
            {/* {JSON.stringify(blogs)} */}
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
        </>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
    const resJSON = await res.json();
    return {
        props: { blogs: resJSON.blogs }, // will be passed to the page component as props
    };
}
