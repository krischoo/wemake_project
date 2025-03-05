import { data, isRouteErrorResponse } from "react-router";
import { Route } from "./+types/weekly-leaderboard-page";
import { DateTime } from "luxon";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
import { Separator } from "~/common/components/ui/separator";
/* url에서 왔으므로 문자를 숫자로 변환 후 검증해야 함 */
const paramsSchema = z.object({
	year: z.coerce.number(),
	week: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	return [{ title: `${data.year}년 Wk-${data.week} | writenow` }];
};

export const loader = ({ params }: Route.LoaderArgs) => {
	const { success, data: parsedData } = paramsSchema.safeParse(params); // "내가 만든 검사 규칙으로 params를 검사해줘"

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
		weekYear: parsedData.year,
		weekNumber: parsedData.week,
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
	const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
	if (date > today) {
		throw data(
			{
				error_code: "FUTURE_DATE",
				message: "Future date",
			},
			{ status: 400 }
		);
	}

	return {
		...parsedData,
	};
};

export default function WeeklyLeaderboardPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		weekYear: loaderData.year,
		weekNumber: loaderData.week,
	}).setZone("Asia/Seoul");
	const previousWeek = urlDate.minus({ weeks: 1 });
	const nextWeek = urlDate.plus({ weeks: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("week"));
	//luxon의 기능

	return (
		<div className="space-y-10">
			<Hero
				title={`Best of week (WK-${urlDate.weekNumber
					.toString()
					.padStart(2, "0")})`}
				subtitle={`${urlDate
					.startOf("week")
					.toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
					.endOf("week")
					.toLocaleString(DateTime.DATE_SHORT)}`}
			/>
			<div className="flex justify-center items-center gap-4">
				<Button variant="secondary" asChild>
					<Link
						to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}
					>
						&larr; wk-{previousWeek.weekNumber.toString().padStart(2, "0")}(
						{previousWeek.toLocaleString(DateTime.DATE_SHORT)})
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
								to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}
							>
								{nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
							</Link>
						</Button>
					</>
				) : null}
			</div>
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
