import { ProductCard } from "~/features/products/components/product-card";
import { Route } from "./+types/profile-products-page";
import { getUserProducts } from "../queries-profiles";
import { useOutletContext } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "프로필 상품" },
    { name: "description", content: "프로필 상품 페이지" },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const products = await getUserProducts(client, params.username);
  return { products };
};

export default function ProfileProductsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.products.map((product) => (
        <ProductCard
          key={product.product_id}
          id={product.product_id}
          name={product.name}
          description={product.tagline}
          reviewCount={product.reviews}
          viewCount={product.views}
          upvoteCount={product.upvotes}
        />
      ))}
    </div>
  );
}
