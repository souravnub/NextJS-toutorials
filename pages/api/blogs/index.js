import blogs from "../../../Data/blogs";

export default async function handler(req, res) {
    const { type, following } = req.query;

    let allBlogs = blogs;

    // added 3sec delay to response
    await new Promise((r) => setTimeout(r, 3000));

    switch (type) {
        case "following":
            let following_blogs = [];
            following.split(",").forEach((followed_user_id) => {
                following_blogs = following_blogs.concat(
                    allBlogs.filter(
                        (blog) => blog.author.id === followed_user_id
                    )
                );
            });

            return res.json({ success: true, blogs: following_blogs });
    }

    res.json({ success: true, blogs: allBlogs });
}
