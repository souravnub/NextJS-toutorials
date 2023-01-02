export default async function fetchBlogs({ type, following }) {
    let serach_string;

    if (type === "following") {
        serach_string = `/api/blogs?type=${type}&following=${following}`;
    } else if (type) {
        serach_string = `/api/blogs?type=${type}`;
    } else {
        serach_string = `/api/blogs`;
    }

    const res = await fetch(serach_string);
    const json = await res.json();

    return json;
}
