import { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
	return [
		{ title: "Product Reviews" },
		{ name: "description", content: "Product Reviews" },
	];
};

export default function ProductReviewsPage() {
	return (
		<div className="space-y-10 max-w-xl">
			<div className="flex justify-between">
				<h2>10 Reviews</h2>
				<Dialog>
					<DialogTrigger>
						<Button variant="secondary">Write a Review</Button>
					</DialogTrigger>
					<CreateReviewDialog />
				</Dialog>
			</div>
			<div className="space-y-20">
				{Array.from({ length: 10 }).map((_, index) => (
					<ReviewCard
						key={index}
						user={{
							name: "John Doe",
							username: "username",
							avatarUrl: "https://github.com/audi.png",
						}}
						rating={3}
						content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
						postedAt="10days ago"
					/>
				))}
			</div>
		</div>
	);
}
