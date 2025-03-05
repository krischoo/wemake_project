import { Route } from "./+types/categories-page";
import { CategoryCard } from "~/features/products/components/category-card";
import Hero from "~/common/components/hero";

export const meta: Route.MetaFunction = () => [
	{ title: "Categories | writenow" },
	{ name: "description", content: "Browse products by category" },
];

export default function CategoriesPage() {
	return (
		<>
			<div>
				<Hero title="Categories" subtitle="Browse products by category" />
			</div>
			<div className="grid grid-cols-3 gap-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<CategoryCard
						key={`categoryId-${index + 1}`}
						id={`categoryId-${index + 1}`}
						title={`Category Name ${index + 1}`}
						description={`Category description ${index + 1}`}
					/>
				))}
			</div>
		</>
	);
}
