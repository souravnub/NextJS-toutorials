import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Hunting Coder</title>
                <meta
                    name="description"
                    content="A blog website made for hunting coders. Allows coders to access resources from all around the world at one place. Hunting for bugs, fixes and new technologies made easy."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
