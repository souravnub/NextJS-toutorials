import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import styles from "./nav.module.css";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <nav
            className={styles.nav}
            aria-expanded={isNavOpen ? "true" : "false"}
            id="primary-navigation">
            <button
                className={`${styles.hammenu} ${
                    isNavOpen ? styles.hammenuClose : ""
                }`}
                aria-controls="primary-navigation"
                onClick={() => setIsNavOpen((prev) => !prev)}>
                <div className="line"></div>
                <div className="line"></div>
            </button>

            <Link href="/">Hunting Coder</Link>

            <button className={styles.createBlogButton}>
                <IoCreateOutline />
                write
            </button>
        </nav>
    );
};

export default Nav;
