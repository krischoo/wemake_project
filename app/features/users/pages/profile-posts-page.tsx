import { PostCard } from "~/features/community/components/post-card";
import { Route } from "./+types/profile-posts-page";
import { ProductCard } from "~/features/products/components/product-card";
import { getUserPosts } from "../queries-profiles";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "프로필 게시물" },
    { name: "description", content: "프로필 게시물 페이지" },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const posts = await getUserPosts(client, params.username);
  return { posts };
};

export default function ProfilePostsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.author_name}
          authorAvatarUrl={post.author_avatar}
          category={post.topic_name}
          createdAt={post.created_at}
          expanded
        />
      ))}
    </div>
  );
}
