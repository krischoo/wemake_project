import { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getProductReviews } from "../queries-products";

import { z } from "zod";

export const paramsSchema = z.object({
  productId: z.coerce.number(),
});

export const loader = async ({ params }: Route.ComponentProps) => {
  const { success, data: parsedData } =
    paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid params", { status: 400 });
  }

  const reviews = await getProductReviews(parsedData.productId);

  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { review_count }: { review_count: number } =
    useOutletContext();

  return (
    <div className="space-y-10 max-w-xl">
      <div className="flex justify-between">
        <h2>{review_count} 개의 리뷰</h2>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">Write a Review</Button>
          </DialogTrigger>
          <CreateReviewDialog />
        </Dialog>
      </div>
      <div className="space-y-20">
        {loaderData.reviews.map((review) => (
          <ReviewCard
            key={review.review_id}
            user={{
              name: review.user.name,
              username: review.user.username,
              avatarUrl: review.user.avatar,
            }}
            rating={review.rating}
            content={review.review}
            postedAt={review.created_at}
          />
        ))}
      </div>
    </div>
  );
}
