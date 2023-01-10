function genURL(url, params) {
    if (url.includes("?")) {
        return url + "&" + new URLSearchParams(params);
    }

    return url + "?" + new URLSearchParams(params);
}

export default async function fetchBlogs({ type, following, params }) {
    let serach_string;

    if (type === "following") {
        serach_string = genURL("/api/blogs", { type, following, ...params });
    } else if (type) {
        serach_string = genURL("/api/blogs", { type, ...params });
    } else {
        serach_string = genURL("/api/blogs", { ...params });
    }

    const res = await fetch(serach_string);
    const json = await res.json();

    return json;
}
