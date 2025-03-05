import { NavLink, Outlet } from "react-router";
import { Route } from "./+types/product-overview-layout";
import { Button } from "~/common/components/ui/button";
import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/common/components/ui/button";

export default function ProductOverviewLayout() {
	return (
		<div className="space-y-10">
			<header className="flex justify-between">
				<div className="flex gap-10">
					<div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
					<div>
						<h1 className="text-5xl font-bold">Product Name</h1>
						<p className="text-2xl font-light text-muted-foreground">
							Product Description
						</p>
						<div className="mt-5 flex items-center gap-5">
							<div className="flex gap-1 text-yellow-500">
								{Array.from({ length: 5 }).map((_, index) => (
									<StarIcon fill="currentColor" />
								))}
							</div>
							<span className="text-muted-foreground">100 reviews</span>
						</div>
					</div>
				</div>
				<div className="flex gap-5">
					{/* 우측 */}
					<Button variant="secondary" size="lg" className="text-lg h-14 px-10">
						Visit Website
					</Button>
					<Button size="lg" className="text-lg h-14 px-10">
						<ChevronUpIcon className="size-4" />
						Upvote (100)
					</Button>
				</div>
			</header>
			<div className="flex gap-2">
				<NavLink
					className={({ isActive }) =>
						cn(
							buttonVariants({ variant: "outline" }),
							isActive && "text-primary"
						)
					}
					to={`/products/1/overview`}
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
					to={`/products/1/reviews`}
				>
					Reviews
				</NavLink>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
