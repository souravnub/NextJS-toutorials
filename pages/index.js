import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import blogsFromDatabase from "../Data/blogs";
import { userData } from "../Data/user";

import { FiSearch } from "react-icons/fi";
import { TbChevronDown } from "react-icons/tb";

import styles from "../styles/Home.module.css";

import BlogsContainer from "../components/blogs container/BlogsContainer";
import useGetBlogs from "../hooks/useGetBlogs";
import useNotInitialRender from "../hooks/useNotInitialRender";

const DEFAULT_BLOGS_PAGE = 1;
const DEFAULT_BLOGS_COUNT = 2;

export default function Home({ blogs: propBlogs }) {
    const serachInputRef = useRef(null);
    const notInitialRender = useNotInitialRender();

    const [blogs, setBlogs] = useState(propBlogs);
    const [hadBlogTypeChanged, setHadBlogTypeChanged] = useState(false);
    const [currentBlogsType, setCurrentBlogsType] = useState("all");
    const [page, setPage] = useState(DEFAULT_BLOGS_PAGE);
    const [DBBlogsCount, setDBBlogsCount] = useState(0);

    useGetBlogs(
        {
            type: currentBlogsType,
            initialBlogs: propBlogs,
            params: { page, count: DEFAULT_BLOGS_COUNT },

            callback: ({ blogs, totalBlogsInDB }) => {
                setBlogs((prev) => [...prev, ...blogs]);
                setDBBlogsCount(totalBlogsInDB);
            },
        },
        [page, hadBlogTypeChanged]
    );

    useEffect(() => {
        if (notInitialRender) {
            setPage(1);
            setBlogs([]);
            setHadBlogTypeChanged((prev) => !prev);
        }
    }, [currentBlogsType]);

    useEffect(() => {
        console.log(blogs);
    }, [blogs]);

    const DROPDOWN_OPTIONS = ["all", "following", "popular", "latest"];

    const handleBlogSearch = (e) => {
        e.preventDefault();
        const searchVal = serachInputRef.current.value;
        // get blogs related to search value and set blogs
        console.log(searchVal);
    };

    const handleTopicSelect = (e) => {
        serachInputRef.current.value = e.target.innerText;
    };

    const handleFetchMoreBlogs = () => {
        // page 1 is fetched server side ,,, & ,,, then with infinte scroll page 2 will be fetched and so on
        setPage((prev) => prev + 1);
    };

    return (
        <main className={styles.main_container}>
            <section className={styles.content_container_left}>
                <div className={styles.search_content_container}>
                    <div className={styles.search_input_container}>
                        <form onSubmit={handleBlogSearch}>
                            <input
                                type="text"
                                required={true}
                                ref={serachInputRef}
                                placeholder="Search..."
                            />
                            <button type="submit">
                                <FiSearch />
                            </button>
                        </form>
                    </div>

                    <article className={styles.my_topics_container}>
                        <span>My topics :</span>
                        <div className={styles.topic_select_buttons_container}>
                            {userData.searched_topics.map((topic) => {
                                return (
                                    <button
                                        key={topic}
                                        onClick={handleTopicSelect}
                                        className="button_primary_pill">
                                        {topic}
                                    </button>
                                );
                            })}
                        </div>
                    </article>
                </div>

                <article className={styles.main_blog_container}>
                    <div
                        className={styles.blog_container_top_section_container}>
                        <h3>Articles : {currentBlogsType}</h3>

                        <div className={styles.select_container}>
                            <TbChevronDown />
                            <select
                                onChange={(e) => {
                                    setCurrentBlogsType(e.target.value);
                                }}>
                                {DROPDOWN_OPTIONS.map((option, index) => {
                                    return (
                                        <option key={index}>{option}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <BlogsContainer
                        blogs={blogs}
                        totalBlogsInDB={DBBlogsCount}
                        fullDiscription={false}
                        handleFetchMore={handleFetchMoreBlogs}
                    />
                </article>
            </section>

            <aside className={styles.content_container_right}>
                <article className={styles.promotion_container}>
                    <div className={styles.promotion_content_container}>
                        <h3>
                            Get unlimited access to everything on Hunting Coder
                        </h3>
                        <p>Plans starting at less than $1/week.</p>

                        <button className="button_primary_box">
                            Get unlimited access
                        </button>
                    </div>

                    <Image
                        alt=""
                        src="https://www.svgrepo.com/show/284506/notes-notebook.svg"
                        width={80}
                        height={80}
                    />
                </article>
            </aside>
        </main>
    );
}

export async function getServerSideProps(context) {
    const lastBlogIndex = DEFAULT_BLOGS_COUNT * DEFAULT_BLOGS_PAGE;
    const firstBlogIndex = lastBlogIndex - DEFAULT_BLOGS_COUNT;
    const blogs = blogsFromDatabase.slice(firstBlogIndex, lastBlogIndex);

    return {
        props: { blogs },
    };
}
