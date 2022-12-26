import { readFile } from "fs";

export default function (req, res) {
    const { slug } = req.query;
    if (slug === "redirect") {
        res.redirect(
            // status code should be 307 if we want to redirect.
            307,
            "https://www.geeksforgeeks.org/express-js-res-redirect-function/"
        );
        return;
    }
    // find a blog with associated slug and send in json
    res.json({ blog: `blog relate to : ${slug}` });
}
