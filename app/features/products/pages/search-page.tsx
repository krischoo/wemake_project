import { Form, useSearchParams } from "react-router";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	return [
		{ title: `Search Products | writenow` },
		{
			name: "description",
			content: "Search for products",
		},
	];
};

const paramsSchema = z.object({
	query: z.string().optional().default(""),
	page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	//사용자가 서버에 요청한 URL을 url이라는 변수에 넣는다
	const { success, data: parsedData } = paramsSchema.safeParse(
		Object.fromEntries(url.searchParams)
	);

	if (!success) {
		throw new Error("Invalid params");
	}
	/* 추후에 데이터 베이스 탐색 기능 추가 예정*/
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<div>
				<Hero title="Search Products" subtitle="Search for products" />
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
			<ProductPagination totalPages={10} />
		</>
	);
}
