import { PostCard } from "~/features/community/components/post-card";
import { Route } from "./+types/profile-posts-page";
import { ProductCard } from "~/features/products/components/product-card";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "프로필 게시물" },
		{ name: "description", content: "프로필 게시물 페이지" },
	];
};

export default function ProfilePostsPage() {
	return (
		<div className="flex flex-col gap-5">
			{Array.from({ length: 5 }).map((_, index) => (
				<PostCard
					key={`postId-${index}`}
					id={`postId-${index}`}
					title="What is best writing app?"
					author="Kris"
					authorAvatarUrl="https://github.com/apple.png"
					category="Productivity"
					createdAt="2 hours ago"
					expanded
				/>
			))}
		</div>
	);
}
