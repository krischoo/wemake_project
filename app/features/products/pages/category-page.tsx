import { data, type MetaFunction } from "react-router";
import { Route } from "./+types/category-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "../queries-products";
import { z } from "zod";

import { Database, makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({
  data: loaderData,
}: Route.MetaArgs) => {
  return [
    { title: `${loaderData.category.name} | writenow` },
    {
      name: "description",
      content: `Browse ${loaderData.category.name} products`,
    },
  ];
};

export const paramsSchema = z.object({
  category: z.coerce.number(),
});

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { success, data: parsedData } =
    paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid params", { status: 400 });
  }

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);

  const [category, products, totalPages] = await Promise.all([
    getCategory(client, parsedData.category),
    getProductsByCategory(client, {
      categoryId: parsedData.category,
      page,
    }),
    getCategoryPages(client, parsedData.category),
  ]);

  return { category, products, totalPages };
};

export default function CategoryPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
      />

      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map(
          (
            product: Database["public"]["Tables"]["products"]["Row"]
          ) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              name={product.name}
              description={product.description}
              reviewCount={product.reviews}
              viewCount={product.views}
              upvoteCount={product.upvotes}
            />
          )
        )}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
