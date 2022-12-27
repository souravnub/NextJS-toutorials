import { readFile } from "fs/promises";
import path from "path";

export default async function (req, res) {
    const { slug } = req.query;
    try {
        const result = await readFile(
            path.join(process.cwd(), "data", "blogs.json"),
            "utf-8"
        );
        const res_json = JSON.parse(result);
        const blogs = res_json;
        const blog = blogs.find(
            (blog) => blog.slug.toLowerCase() === slug.toLowerCase()
        );
        res.json({ success: true, blog });
    } catch (error) {
        console.log(error);
        res.json({ success: false, blogs: null });
    }
}
