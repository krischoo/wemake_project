import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/supa-client";

export const createProductReview = async (
  client: SupabaseClient<Database>,
  {
    productId,
    userId,
    review,
    rating,
  }: {
    productId: number;
    userId: string;
    review: string;
    rating: number;
  }
) => {
  const { error } = await client.from("product_reviews").insert({
    product_id: productId,
    profile_id: userId,
    review,
    rating,
  });
  if (error) {
    throw error;
  }
};
