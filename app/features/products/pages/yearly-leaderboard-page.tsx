import { data, isRouteErrorResponse, Link } from "react-router";
import { DateTime } from "luxon";
import { z } from "zod";
import { Route } from "./+types/yearly-leaderboard-page";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import ProductPagination from "~/common/components/product-pagination";
import Hero from "~/common/components/hero";
import {
  getProductPagesByDateRange,
  getProductsByDateRange,
} from "../queries-products";
import { PAGE_SIZE } from "../constants-products";
import { makeSSRClient } from "~/supa-client";

/* url에서 왔으므로 문자를 숫자로 변환 후 검증해야 함 */
const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({
  data,
}: Route.MetaArgs) => {
  return [
    // 여기서 data는 loader 함수의 return 값
    {
      title: `${data.year}년 | writenow`,
    },
  ];
};

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } =
    paramsSchema.safeParse(params); // "내가 만든 검사 규칙으로 params를 검사해줘"

  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid params",
      },
      { status: 400 }
    );
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data(
      {
        error_code: "INVALID_DATE",
        message: "Invalid date",
      },
      { status: 400 }
    );
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
  if (date > today) {
    throw data(
      {
        error_code: "FUTURE_DATE",
        message: "Future date",
      },
      { status: 400 }
    );
  }
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") ?? 1),
  });

  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });

  return {
    ...parsedData,
    products,
    totalPages,
  };
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  }).setZone("Asia/Seoul");
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  //luxon의 기능

  return (
    <div className="space-y-10">
      <Hero title={`${urlDate.year}년`} />
      <div className="flex justify-center items-center gap-4">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/yearly/${previousYear.year}`}
          >
            &larr;
            {previousYear.toLocaleString({
              year: "numeric",
            })}
          </Link>
        </Button>

        {!isToday ? (
          <>
            <Separator
              orientation="vertical"
              className="h-6 mx-8 font-extrabold"
            />
            <Button variant="secondary" asChild>
              <Link
                to={`/products/leaderboards/yearly/${nextYear.year}`}
              >
                {nextYear.toLocaleString({
                  year: "numeric",
                })}
                &rarr;
              </Link>
            </Button>
          </>
        ) : null}
      </div>
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
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
