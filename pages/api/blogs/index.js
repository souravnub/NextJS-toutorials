import { readFile } from "fs/promises";
import path from "path";

export default async function (req, res) {
    try {
        const blogs = await readFile(
            path.join(process.cwd(), "data", "blogs.json"),
            "utf-8"
        );
        const blogJson = JSON.parse(blogs);
        res.json({ success: true, blogs: blogJson });
    } catch (error) {
        res.json({ success: false, blogs: null });
    }
}
