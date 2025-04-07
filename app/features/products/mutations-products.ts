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

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    url,
    description,
    categoryId,
    icon,
    userId,
    howItWorks,
  }: {
    name: string;
    tagline: string;
    url: string;
    description: string;
    categoryId: number;
    icon: string;
    userId: string;
    howItWorks: string;
  }
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      name,
      tagline,
      url,
      description,
      how_it_works: howItWorks,
      icon,
      profile_id: userId,
      category_id: categoryId,
    })
    .select("product_id")
    .single();

  if (error) {
    throw error;
  }

  return data.product_id;
};
