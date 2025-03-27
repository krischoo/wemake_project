import { data, Form, useSearchParams } from "react-router";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import {
  getProductsBySearch,
  getPagesBySearch,
} from "../queries-products";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = ({
  data,
}: Route.MetaArgs) => {
  return [
    { title: `Search Products | writenow` },
    {
      name: "description",
      content: "Search for products",
    },
  ];
};

const searchSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  //사용자가 서버에 요청한 URL을 url이라는 변수에 넣는다

  const { success, data: parsedData } = searchSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw new Error("Invalid search params");
  }

  {
    /** search page의 초기 화면에 아무 정보도 표시되지 않도록 **/
  }
  //   if (parsedData.query === "") {
  //     return { products: [], totalPages: 1 };
  //   }

  const products = await getProductsBySearch(client, {
    query: parsedData.query,
    page: parsedData.page,
  });

  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query,
  });

  return { products, totalPages };
};

export default function SearchPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <div>
        <Hero
          title="Search Products"
          subtitle="Search for products"
        />
      </div>
      <Form className="flex justify-center max-w-screen-md items-center mx-auto mb-10 gap-2">
        <Input
          name="query"
          placeholder="Search for products"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
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
      <ProductPagination totalPages={loaderData.totalPages} />
    </>
  );
}
