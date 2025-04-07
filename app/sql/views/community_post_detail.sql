CREATE OR REPLACE VIEW community_post_detail AS
SELECT
--- 게시물 파트 ---
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id,
    topics.name as topic_name,
    topics.slug as topic_slug,
    COUNT(post_replies.reply_id) as replies_count,
--- 프로필 파트 ---
    profiles.username as author_username,
    profiles.avatar as author_avatar,
    profiles.name as author_name,
    profiles.role as author_role,
    profiles.created_at as author_created_at,
    (SELECT COUNT(*) FROM products
    WHERE products.profile_id = profiles.profile_id) as products_count,
    (SELECT EXISTS(
        SELECT 1
        FROM public.post_upvotes
        WHERE post_upvotes.post_id = posts.post_id
        AND post_upvotes.profile_id = auth.uid()))
        AS is_upvoted
FROM posts
INNER JOIN topics USING (topic_id)
LEFT JOIN post_replies USING (post_id)
INNER JOIN profiles ON posts.profile_id = profiles.profile_id
GROUP BY posts.post_id, topics.topic_id, profiles.profile_id