import { Route } from "./+types/categories-page";
import { CategoryCard } from "~/features/products/components/category-card";
import Hero from "~/common/components/hero";
import { getCategories } from "../queries-products";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [
  { title: "Categories | writenow" },
  { name: "description", content: "Browse products by category" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export default function CategoriesPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <div>
        <Hero
          title="Categories"
          subtitle="Browse products by category"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            title={category.name}
            description={category.description}
          />
        ))}
      </div>
    </>
  );
}
