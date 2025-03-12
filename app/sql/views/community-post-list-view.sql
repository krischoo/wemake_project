CREATE VIEW community_post_list_view AS
SELECT
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name AS topic_name,
    profiles.name AS author_name,
    profiles.avatar AS author_avatar,
    profiles.username AS author_username,
    COUNT(post_upvotes.post_id) AS upvotes
FROM posts
INNER JOIN topics USING (topic_id)
INNER JOIN profiles USING (profile_id)
LEFT JOIN post_upvotes USING (post_id)
GROUP BY posts.post_id, topics.name, profiles.name, profiles.avatar, profiles.username
