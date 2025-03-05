import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
	return [
		{ title: `Product Overview | writenow` },
		{ name: "description", content: "Product Overview" },
	];
};

export default function ProductOverviewPage({
	params: { productId },
}: Route.ComponentProps) {
	return (
		<div className="space-y-10">
			<div className="space-y-1">
				<h3 className="text-2xl font-bold">What is this product?</h3>
				<p className="text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quos.
				</p>
			</div>
			<div className="space-y-1">
				<h3 className="text-2xl font-bold">How does it work?</h3>
				<p className="text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quos.
				</p>
			</div>
		</div>
	);
}
