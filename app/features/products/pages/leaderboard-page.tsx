import { Route } from "./+types/leaderboard-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { getProductsByDateRange } from "../queries-products";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const [
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
  ] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7,
    }),
  ]);
  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
  };
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | writenow" },
    { name: "description", content: "Top products leaderboard" },
  ];
};

export default function LeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      <Hero title="Leaderboards" />
      {/* Daily Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold leading-snug tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-lg font-light">
            The most popular products on writenow by day
          </p>
        </div>

        {loaderData.dailyProducts.length > 0 ? (
          loaderData.dailyProducts.map((product) => {
            return (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                description={product.tagline}
                reviewCount={product.reviews}
                viewCount={product.views}
                upvoteCount={product.upvotes}
              />
            );
          })
        ) : (
          <div className="col-span-2 flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-2xl">데이터가 없습니다.</p>
          </div>
        )}
        <Button
          variant="link"
          asChild
          className="text-xl self-center"
        >
          <Link to="/products/leaderboards/daily">
            Daily Leaderboard &rarr;
          </Link>
        </Button>
      </div>

      {/* Weekly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold leading-snug tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-lg font-light">
            The most popular products on writenow by week
          </p>
        </div>
        {loaderData.weeklyProducts.length > 0 ? (
          loaderData.weeklyProducts.map((product) => {
            return (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                description={product.tagline}
                reviewCount={product.reviews}
                viewCount={product.views}
                upvoteCount={product.upvotes}
              />
            );
          })
        ) : (
          <div className="col-span-2 flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-lg text-gray-500">데이터가 없습니다</p>
          </div>
        )}
        <Button
          variant="link"
          asChild
          className="text-xl self-center"
        >
          <Link to="/products/leaderboards/weekly">
            Weekly Leaderboard &rarr;
          </Link>
        </Button>
      </div>

      {/* Monthly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold leading-snug tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-lg font-light">
            The most popular products on writenow by month
          </p>
        </div>
        {loaderData.monthlyProducts.length > 0 ? (
          loaderData.monthlyProducts.map((product) => {
            return (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                description={product.tagline}
                reviewCount={product.reviews}
                viewCount={product.views}
                upvoteCount={product.upvotes}
              />
            );
          })
        ) : (
          <div className="col-span-2 flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-lg text-gray-500">데이터가 없습니다</p>
          </div>
        )}
        <Button
          variant="link"
          asChild
          className="text-xl self-center"
        >
          <Link to="/products/leaderboards/monthly">
            Monthly Leaderboard &rarr;
          </Link>
        </Button>
      </div>

      {/* Yearly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold leading-snug tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-lg font-light">
            The most popular products on writenow by year
          </p>
        </div>
        {loaderData.yearlyProducts.length > 0 ? (
          loaderData.yearlyProducts.map((product) => {
            return (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                description={product.tagline}
                reviewCount={product.reviews}
                viewCount={product.views}
                upvoteCount={product.upvotes}
              />
            );
          })
        ) : (
          <div className="col-span-2 flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-lg text-gray-500">데이터가 없습니다</p>
          </div>
        )}
        <Button
          variant="link"
          asChild
          className="text-xl self-center"
        >
          <Link to="/products/leaderboards/yearly">
            Yearly Leaderboard &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
