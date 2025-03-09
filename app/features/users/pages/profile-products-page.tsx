import { ProductCard } from "~/features/products/components/product-card";
import { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "프로필 상품" },
		{ name: "description", content: "프로필 상품 페이지" },
	];
};

export default function ProfileProductsPage() {
	return (
		<div className="flex flex-col gap-5">
			{Array.from({ length: 5 }).map((_, index) => (
				<ProductCard
					key={index}
					id={`productid-${index}`}
					name="Product Name"
					description="Product Description"
					commentCount={12}
					viewCount={12}
					upvoteCount={120}
				/>
			))}
		</div>
	);
}
