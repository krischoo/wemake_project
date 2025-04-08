import { Link, NavLink, Outlet } from "react-router";
import { Route } from "./+types/product-overview-layout";
import { Button } from "~/common/components/ui/button";
import { StarIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/common/components/ui/button";
import { getProductById } from "../queries-products";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({
  data,
}: Route.MetaArgs) => {
  return [
    { title: `${data.product.name} | writenow` },
    { name: "description", content: data.product.tagline },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const product = await getProductById(
    client,
    Number(params.productId)
  );
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <header className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary/50">
            <img
              src={loaderData.product.icon}
              alt={loaderData.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">
              {loaderData.product.name}
            </h1>
            <p className="text-2xl font-light text-muted-foreground">
              {loaderData.product.tagline}
            </p>
            <div className="mt-5 flex items-center gap-5">
              <div className="flex gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    fill={
                      index <
                      Math.floor(loaderData.product.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {loaderData.product.reviews} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          {/* 우측 */}
          <Button
            variant="secondary"
            size="lg"
            className="text-lg h-14 px-10"
            asChild
          >
            <Link
              to={`/products/${loaderData.product.product_id}/visit`}
            >
              Visit Website
            </Link>
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote ({loaderData.product.upvotes})
          </Button>
        </div>
      </header>
      <div className="flex gap-2">
        <NavLink
          end
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "text-primary"
            )
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "text-primary"
            )
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            product_id: loaderData.product.product_id,
            description: loaderData.product.description,
            how_it_works: loaderData.product.how_it_works,
            review_count: loaderData.product.reviews,
          }}
        />
      </div>
    </div>
  );
}
