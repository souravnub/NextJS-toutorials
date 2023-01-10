import blogs from "../../../Data/blogs";

function getByPageCount(arr, page, count) {
    const lastBlogIndex = count * page;
    const firstBlogIndex = lastBlogIndex - count;
    const currentBlogs = arr.slice(firstBlogIndex, lastBlogIndex);
    return currentBlogs;
}

export default async function handler(req, res) {
    let { type, following, page = 1, count } = req.query;
    page = parseInt(page);
    count = parseInt(count);

    let allBlogs = blogs;

    if (count) {
        allBlogs = getByPageCount(allBlogs, page, count);
    }

    // added 3sec delay to response
    await new Promise((r) => setTimeout(r, 3000));

    switch (type) {
        case "following":
            let following_blogs = [];
            let required_following_blogs = [];

            following.split(",").forEach((followed_user_id) => {
                following_blogs = following_blogs.concat(
                    blogs.filter((blog) => blog.author.id === followed_user_id)
                );
            });

            if (count) {
                required_following_blogs = getByPageCount(
                    following_blogs,
                    page,
                    count
                );
            }

            return res.json({
                success: true,
                number_fetched: required_following_blogs.length,
                db_count: following_blogs.length,
                blogs: required_following_blogs,
            });
    }

    res.json({
        success: true,
        number_fetched: allBlogs.length,
        db_count: blogs.length,
        blogs: allBlogs,
    });
}
