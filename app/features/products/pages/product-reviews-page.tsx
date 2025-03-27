import { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getProductReviews } from "../queries-products";

import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { createProductReview } from "../mutations-products";
import { useEffect, useState } from "react";

export const paramsSchema = z.object({
  productId: z.coerce.number(),
});

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { success, data: parsedData } =
    paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid params", { status: 400 });
  }

  const reviews = await getProductReviews(
    client,
    parsedData.productId
  );

  return { reviews };
};

const formSchema = z.object({
  review: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
});

export const action = async ({
  params,
  request,
}: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    data: parsedData,
    error,
  } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  await createProductReview(client, {
    productId: Number(params.productId),
    userId,
    review: parsedData.review,
    rating: parsedData.rating,
  });
  return { ok: true };
};

export default function ProductReviewsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { review_count }: { review_count: number } =
    useOutletContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (actionData?.ok) {
      setIsDialogOpen(false);
    }
  }, [actionData]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="space-y-10 max-w-xl">
        {/* 리뷰 목록 헤더 */}
        <div className="flex justify-between">
          <h2>{review_count} 개의 리뷰</h2>
          <DialogTrigger>
            <Button variant="secondary">Write a Review</Button>
          </DialogTrigger>
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              user={{
                name: review.user?.name ?? "",
                username: review.user?.username ?? "",
                avatarUrl: review.user?.avatar ?? "",
              }}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
