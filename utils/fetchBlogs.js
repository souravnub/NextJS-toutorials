export default async function fetchBlogs({ type, following }) {
    let serach_string;

    if (type === "following") {
        serach_string = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?type=${type}&following=${following}`;
    } else if (type) {
        serach_string = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?type=${type}`;
    } else {
        serach_string = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`;
    }

    const res = await fetch(serach_string);
    const json = await res.json();

    return json;
}
