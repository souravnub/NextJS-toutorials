import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
    return (
        <>
            {/* {JSON.stringify(blogs)} */}
            {blogs.map(({ author, title, img, desc, read_time, topics }) => {
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
                    </div>
                );
            })}
        </>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch("http://192.168.100.248:3000/api/blogs");
    const resJSON = await res.json();
    return {
        props: { blogs: resJSON.blogs }, // will be passed to the page component as props
    };
}
