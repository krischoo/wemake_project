import { Route } from "./+types/leaderboard-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Leaderboard | writenow" },
		{ name: "description", content: "Top products leaderboard" },
	];
};

export default function LeaderboardPage() {
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
				{Array.from({ length: 4 }).map((_, index) => (
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
				<Button variant="link" asChild className="text-xl self-center">
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
				{Array.from({ length: 4 }).map((_, index) => (
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
				<Button variant="link" asChild className="text-xl self-center">
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
				{Array.from({ length: 4 }).map((_, index) => (
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
				<Button variant="link" asChild className="text-xl self-center">
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
				{Array.from({ length: 4 }).map((_, index) => (
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
				<Button variant="link" asChild className="text-xl self-center">
					<Link to="/products/leaderboards/yearly">
						Yearly Leaderboard &rarr;
					</Link>
				</Button>
			</div>
		</div>
	);
}
