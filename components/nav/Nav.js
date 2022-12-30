import React, { useEffect, useRef } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./nav.module.css";
import Link from "next/link";
import { useState } from "react";
import BodyOverlay from "../body overlay/BodyOverlay";
import { useRouter } from "next/router";

const Nav = () => {
    const router = useRouter();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [haveNotifications, setHaveNotifications] = useState(true);
    const navRef = useRef();
    const navigationMenuRef = useRef();

    useEffect(() => {
        const navHeight = navRef.current.getBoundingClientRect().height;
        document.body.style.paddingBlockStart = navHeight + "px";
    }, []);

    useEffect(() => {
        if (isNavOpen) {
            closeNav();
        }
    }, [router.pathname]);

    const handleToggleNav = () => {
        // setIsNavOpen((prev) => !prev);
        if (isNavOpen) {
            closeNav();
        } else {
            openNav();
        }
    };

    const handleBodyOverlayClick = () => {
        closeNav();
    };

    function openNav() {
        const navigationMenu = navigationMenuRef.current;
        document.body.style.overflow = "hidden";
        navigationMenu.setAttribute("data-state", "opened");
        setIsNavOpen(true);
    }
    function closeNav() {
        const navigationMenu = navigationMenuRef.current;
        document.body.style.overflow = "auto";
        navigationMenu.setAttribute("data-state", "closing");
        navigationMenuRef.current.addEventListener(
            "animationend",
            () => {
                navigationMenu.setAttribute("data-state", "closed");
            },
            { once: true }
        );
        setIsNavOpen(false);
    }

    return (
        <>
            <BodyOverlay onClick={handleBodyOverlayClick} isShown={isNavOpen} />

            <nav
                className={styles.nav}
                ref={navRef}
                style={{
                    backgroundColor: isNavOpen
                        ? "var(--clr-primary-200)"
                        : "var(--clr-primary-100)",
                }}>
                <button
                    className={`${styles.hammenu} ${
                        isNavOpen ? styles.hammenuClose : ""
                    }`}
                    aria-controls="primary-navigation"
                    aria-expanded={isNavOpen ? "true" : "false"}
                    onClick={handleToggleNav}>
                    <span className="sr-only">Menu</span>
                    <div className="line" aria-hidden="true"></div>
                    <div className="line" aria-hidden="true"></div>
                </button>

                <Link href="/">Hunting Coder</Link>

                <div className={styles.navUtilitiesContainer}>
                    <button
                        className={`${styles.notificationButton} ${
                            haveNotifications ? "have-notifications" : ""
                        }`}>
                        <IoMdNotificationsOutline />
                    </button>

                    <button className={styles.createBlogButton}>
                        <IoCreateOutline />
                        compose
                    </button>
                </div>

                <ul
                    ref={navigationMenuRef}
                    id="primary-navigation"
                    role="list"
                    data-state="closed"
                    className={styles.navigation_menu}>
                    <li>
                        <Link href="/">home</Link>
                    </li>
                    <li>
                        <Link href="/about">about</Link>
                    </li>
                    <li>
                        <Link href="/blog">blog</Link>
                    </li>

                    <li className="mobile-only">
                        <Link href="/notifications">notifications</Link>
                    </li>
                    <li className="mobile-only">
                        <Link href="/composeblog">compose</Link>
                    </li>

                    <li>
                        <Link href="/contact">contact</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
