import type { MetaFunction } from "react-router";
import { Route } from "./+types/category-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
	return [
		{ title: `Developer Tools | writenow` },
		{
			name: "description",
			content: `Browse developer tools products`,
		},
	];
};

export default function CategoryPage() {
	return (
		<div className="space-y-10">
			<Hero
				title={"Developer Tools"}
				subtitle={"Tools for developers to build their products"}
			/>

			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{Array.from({ length: 5 }).map((_, index) => (
					<ProductCard
						key={`product-${index}`}
						id={`product-${index}`}
						name={`Product ${index + 1}`}
						description={`Product ${index + 1} Description`}
						commentCount={12}
						viewCount={12}
						upvoteCount={120}
					/>
				))}
			</div>
			<ProductPagination totalPages={10} />
		</div>
	);
}
