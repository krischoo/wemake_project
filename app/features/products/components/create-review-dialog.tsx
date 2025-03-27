import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/common/components/ui/dialog";
import { Form, useActionData } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { action } from "../pages/product-reviews-page";

export default function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const actionData = useActionData<typeof action>();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-3xl">
          What do you think about this product?
        </DialogTitle>
        <DialogDescription>
          Please write a review for this product.
        </DialogDescription>
      </DialogHeader>
      <Form method="post" className="space-y-8">
        <div>
          <Label className="flex flex-col gap-1">
            Rating
            <small className="text-muted-foreground">
              Please select a rating for this product.
            </small>
          </Label>
          <div className="flex items-center mt-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative pr-2"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <StarIcon
                  className="size-5 text-yellow-500"
                  fill={
                    hoveredStar >= star || rating >= star
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
        </div>
        {actionData?.fieldErrors?.rating && (
          <p className="text-red-500">
            {actionData.fieldErrors.rating.join(", ")}
          </p>
        )}
        <InputPair
          name="review"
          textarea
          required
          label="Review"
          placeholder="Write a review for this product."
          description="Maximum 500 characters"
        />
        {actionData?.fieldErrors?.review && (
          <p className="text-red-500">
            {actionData.fieldErrors.review.join(", ")}
          </p>
        )}
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
